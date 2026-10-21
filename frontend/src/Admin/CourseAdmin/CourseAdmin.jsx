import React, { useMemo, useState } from "react";
import { useCourse } from "../../Utility/Course";
import { useNavigate } from "react-router";
import axios from "axios";
import { sileo } from "sileo";
import {
    FiDatabase,
    FiRefreshCw,
    FiPlus,
    FiTrash2,
    FiEdit3,
    FiCheck,
    FiHelpCircle,
    FiClock,
    FiBookOpen,
    FiCheckCircle,
    FiLayers,
    FiX,
    FiArrowLeft,
    FiAward,
    FiType
} from "react-icons/fi";

function CourseAdmin() {
    const navigate = useNavigate();
    const { courseDetails = [] } = useCourse();

    // Form configuration state (Topic-wise assessment)
    const [details, setDetails] = useState({
        selectedCourseId: "",
        selectedTopic: "",
        numberOfQuestions: 10,
        assessmentType: "Topic Assessment",
        duration: "15"
    });

    const [isCustomTopic, setIsCustomTopic] = useState(false);
    const [customTopicInput, setCustomTopicInput] = useState("");

    // Assessment generation and submission states
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editForm, setEditForm] = useState({ question: "", options: ["", "", "", ""], answer: "" });

    // Match currently selected course (support both numeric ID and string nanoid/_id)
    const currentCourse = courseDetails.find(
        (course) =>
            String(course.course_id || course.id || course._id) === String(details.selectedCourseId)
    );

    // Extract clean topic titles from course materials, roadmap, and skills
    const availableTopics = useMemo(() => {
        if (!currentCourse) return [];
        const topicSet = new Set();

        // 1. From materials
        if (Array.isArray(currentCourse.daywise_material)) {
            currentCourse.daywise_material.forEach((mat) => {
                if (mat.title?.trim()) topicSet.add(mat.title.trim());
                if (mat.topics?.trim()) topicSet.add(mat.topics.trim());
            });
        }

        // 2. From roadmap
        if (Array.isArray(currentCourse.roadmap)) {
            currentCourse.roadmap.forEach((rm) => {
                if (rm.topic?.trim()) topicSet.add(rm.topic.trim());
            });
        }

        // 3. From skills
        if (Array.isArray(currentCourse.skills)) {
            currentCourse.skills.forEach((skill) => {
                if (typeof skill === "string" && skill.trim()) topicSet.add(skill.trim());
            });
        }

        return Array.from(topicSet);
    }, [currentCourse]);

    const activeTopicName = isCustomTopic ? customTopicInput.trim() : details.selectedTopic;

    // Reset topic when course changes
    const handleCourseChange = (e) => {
        setDetails((prev) => ({
            ...prev,
            selectedCourseId: e.target.value,
            selectedTopic: ""
        }));
        setIsCustomTopic(false);
        setCustomTopicInput("");
    };

    const handleTopicChange = (e) => {
        if (e.target.value === "__custom__") {
            setIsCustomTopic(true);
            setDetails((prev) => ({ ...prev, selectedTopic: "" }));
        } else {
            setIsCustomTopic(false);
            setDetails((prev) => ({ ...prev, selectedTopic: e.target.value }));
        }
    };

    // =========================================================================
    // 🧠 1. GENERATE TOPIC ASSESSMENT VIA AI SERVICE
    // =========================================================================
    const handleGenerateAssessment = async () => {
        if (!currentCourse) {
            sileo.error({ title: "Course Required", description: "Please select a course first." });
            return;
        }
        if (!activeTopicName) {
            sileo.error({ title: "Topic Required", description: "Please select or enter an assessment topic." });
            return;
        }

        setIsLoading(true);
        setEditingIndex(null);

        try {
            const res = await axios.post("http://localhost:3000/assessments/generate", {
                course_name: currentCourse.course_name,
                assessment_name: activeTopicName,
                numberOfQuestions: details.numberOfQuestions
            });

            console.log("AI Generation Response:", res);

            // Resilient parser to support object { questions: [...] }, direct array, or string JSON
            let parsedQuestions = [];
            if (res.data?.questions && Array.isArray(res.data.questions)) {
                parsedQuestions = res.data.questions;
            } else if (Array.isArray(res.data)) {
                parsedQuestions = res.data;
            } else if (typeof res.data === "string") {
                try {
                    const parsed = JSON.parse(res.data);
                    parsedQuestions = parsed.questions || parsed;
                } catch (parseError) {
                    console.error("JSON parse error:", parseError);
                }
            }

            if (parsedQuestions && parsedQuestions.length > 0) {
                const formattedQuestions = parsedQuestions.map((q, idx) => ({
                    id: q.id || `question_${idx + 1}`,
                    question: q.question || "Untitled Question",
                    options: Array.isArray(q.options) ? q.options : [],
                    answer: q.answer || (q.options ? q.options[0] : "")
                }));

                setQuestions(formattedQuestions);
                sileo.success({
                    title: "Assessment Ready! 🎉",
                    description: `Generated ${formattedQuestions.length} topic questions for "${activeTopicName}".`
                });
            } else {
                throw new Error("Unable to parse question list from AI response.");
            }
        } catch (error) {
            console.error("Error generating assessment:", error);
            const errMsg = error.response?.data?.message || error.message || "Failed to generate assessment";
            sileo.error({
                title: "Generation Failed",
                description: errMsg
            });
        } finally {
            setIsLoading(false);
        }
    };

    // =========================================================================
    // 💾 2. ADD TO DATABASE HANDLER (TOPIC-WISE)
    // =========================================================================
    const handleAddToDatabase = async () => {
        if (!questions.length) {
            sileo.error({ title: "No Questions", description: "Please generate an assessment before adding to database." });
            return;
        }
        if (!activeTopicName) {
            sileo.error({ title: "Topic Missing", description: "Assessment topic name is required." });
            return;
        }

        const assessmentPayload = {
            course_id: currentCourse?.course_id || details.selectedCourseId,
            course_name: currentCourse?.course_name,
            assessment_name: activeTopicName,
            assessment_type: "Topic Assessment",
            assessment_duration: `${details.duration || 15} mins`,
            assessment_total_marks: questions.length.toString(),
            assessment_pass_marks: Math.ceil(questions.length * 0.7).toString(),
            assessment_questions: questions,
            week: "Topic",
            day: "Topic"
        };

        console.log("------------------------------------------");
        console.log("🚀 [ADMIN] Publishing Topic Assessment to Database:", assessmentPayload);
        console.log("------------------------------------------");

        setIsSaving(true);
        try {
            const res = await axios.post("http://localhost:3000/assessments/create", assessmentPayload);
            console.log("Database Save Response:", res.data);
            sileo.success({
                title: "Assessment Published! 🚀",
                description: `"${activeTopicName}" topic assessment is now live in the database!`
            });
        } catch (err) {
            console.error("Database save error:", err);
            sileo.error({
                title: "Publish Error",
                description: err.response?.data?.message || err.message || "Failed to save assessment to database."
            });
        } finally {
            setIsSaving(false);
        }
    };

    // =========================================================================
    // 🛠️ 3. QUESTION EDITING & MANAGEMENT ACTIONS
    // =========================================================================
    const startEditing = (index) => {
        setEditingIndex(index);
        setEditForm({
            question: questions[index].question,
            options: [...questions[index].options],
            answer: questions[index].answer
        });
    };

    const cancelEditing = () => {
        setEditingIndex(null);
    };

    const saveEditing = (index) => {
        const updated = [...questions];
        updated[index] = {
            ...updated[index],
            question: editForm.question,
            options: editForm.options,
            answer: editForm.answer
        };
        setQuestions(updated);
        setEditingIndex(null);
        sileo.success({ title: "Updated", description: `Question #${index + 1} updated.` });
    };

    const handleDeleteQuestion = (index) => {
        const filtered = questions.filter((_, i) => i !== index);
        setQuestions(filtered);
        if (editingIndex === index) setEditingIndex(null);
        sileo.success({ title: "Question Removed", description: "Question removed from assessment." });
    };

    const handleAddManualQuestion = () => {
        const newQ = {
            id: `question_${questions.length + 1}`,
            question: "New question prompt here?",
            options: ["Option A", "Option B", "Option C", "Option D"],
            answer: "Option A"
        };
        setQuestions((prev) => [...prev, newQ]);
        startEditing(questions.length);
        sileo.success({ title: "Question Added", description: "Edit the new question below." });
    };

    const handleClearQuestions = () => {
        if (window.confirm("Are you sure you want to clear all generated questions?")) {
            setQuestions([]);
            setEditingIndex(null);
        }
    };

    return (
        <div className="h-full w-full overflow-y-auto px-4 md:px-8 py-6 flex flex-col items-center [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300">
            {/* Top Navigation & Header */}
            <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate("/dashboard/courses")}
                            className="p-2 rounded-xl bg-white/80 hover:bg-white text-gray-700 small-box-shadow transition-all"
                            title="Back to Courses"
                        >
                            <FiArrowLeft className="text-lg" />
                        </button>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#7F77FF]/15 text-[#534DB4]">
                                    Admin Console
                                </span>
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    Topic Assessment Mode
                                </span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-extrabold text-[#112D55] tracking-tight">
                                Topic Assessment Studio
                            </h1>
                        </div>
                    </div>
                </div>

                {questions.length > 0 && (
                    <div className="flex items-center gap-3 flex-wrap">
                        <button
                            onClick={handleClearQuestions}
                            className="px-4 py-2 rounded-xl text-sm font-semibold text-rose-600 bg-white hover:bg-rose-50 border border-rose-200 transition-all flex items-center gap-2 cursor-pointer"
                        >
                            <FiTrash2 /> Clear All
                        </button>
                        <button
                            onClick={handleAddToDatabase}
                            disabled={isSaving}
                            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-60 shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                        >
                            {isSaving ? <FiRefreshCw className="animate-spin text-base" /> : <FiDatabase className="text-base" />}
                            <span>{isSaving ? "Publishing..." : "Add to Database"}</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Generator Controls Card (Topic-Wise) */}
            <div className="w-full max-w-6xl bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-8 medium-box-shadow white flex flex-col gap-6 mb-8 border border-white/60">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-2 text-[#112D55] font-bold text-lg">
                        <FiLayers className="text-[#7F77FF]" />
                        <span>Configure Topic-Wise Assessment</span>
                    </div>
                    {currentCourse && (
                        <div className="text-xs font-medium text-gray-500 hidden sm:block">
                            Selected Course: <span className="font-semibold text-gray-800">{currentCourse.course_name}</span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {/* Course Selector */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
                            <FiBookOpen className="text-[#7F77FF]" /> 1. Select Course
                        </label>
                        <select
                            value={details.selectedCourseId}
                            onChange={handleCourseChange}
                            className="w-full bg-[#f8fafc] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 outline-none focus:border-[#7F77FF] focus:ring-2 focus:ring-[#7F77FF]/20 transition-all cursor-pointer"
                        >
                            <option value="" disabled>Choose course...</option>
                            {courseDetails.map((course) => (
                                <option
                                    key={course._id || course.course_id || course.id}
                                    value={course.course_id || course.id || course._id}
                                >
                                    {course.course_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Topic Selector / Custom Entry */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
                                <FiHelpCircle className="text-[#7F77FF]" /> 2. Assessment Topic
                            </label>
                            {details.selectedCourseId && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsCustomTopic(!isCustomTopic);
                                        if (isCustomTopic) setCustomTopicInput("");
                                    }}
                                    className="text-[11px] font-bold text-[#7F77FF] hover:underline cursor-pointer"
                                >
                                    {isCustomTopic ? "Select from list" : "+ Type custom"}
                                </button>
                            )}
                        </div>

                        {isCustomTopic ? (
                            <div className="relative">
                                <input
                                    type="text"
                                    value={customTopicInput}
                                    onChange={(e) => setCustomTopicInput(e.target.value)}
                                    placeholder="Enter topic (e.g. React Hooks, Node Streams)"
                                    className="w-full bg-[#f8fafc] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 outline-none focus:border-[#7F77FF] focus:ring-2 focus:ring-[#7F77FF]/20 transition-all"
                                />
                                <span className="absolute right-3 top-3 text-xs text-gray-400">
                                    <FiType />
                                </span>
                            </div>
                        ) : (
                            <select
                                value={details.selectedTopic}
                                onChange={handleTopicChange}
                                disabled={!details.selectedCourseId}
                                className="w-full bg-[#f8fafc] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 outline-none focus:border-[#7F77FF] focus:ring-2 focus:ring-[#7F77FF]/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <option value="" disabled>
                                    {details.selectedCourseId ? "Choose topic..." : "Select course first"}
                                </option>
                                {availableTopics.map((topic, index) => (
                                    <option key={index} value={topic}>
                                        {topic}
                                    </option>
                                ))}
                                <option value="__custom__">+ Enter Custom Topic...</option>
                            </select>
                        )}
                    </div>

                    {/* Question Count Selector */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
                            <FiLayers className="text-[#7F77FF]" /> 3. Question Count
                        </label>
                        <select
                            value={details.numberOfQuestions}
                            onChange={(e) => setDetails({ ...details, numberOfQuestions: Number(e.target.value) })}
                            className="w-full bg-[#f8fafc] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 outline-none focus:border-[#7F77FF] focus:ring-2 focus:ring-[#7F77FF]/20 transition-all cursor-pointer"
                        >
                            <option value={5}>5 Questions (Quick Test)</option>
                            <option value={10}>10 Questions (Standard)</option>
                            <option value={15}>15 Questions (Thorough)</option>
                            <option value={20}>20 Questions (Comprehensive)</option>
                        </select>
                    </div>

                    {/* Duration / Time Limit */}
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
                            <FiClock className="text-[#7F77FF]" /> 4. Duration (Minutes)
                        </label>
                        <select
                            value={details.duration}
                            onChange={(e) => setDetails({ ...details, duration: e.target.value })}
                            className="w-full bg-[#f8fafc] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 outline-none focus:border-[#7F77FF] focus:ring-2 focus:ring-[#7F77FF]/20 transition-all cursor-pointer"
                        >
                            <option value="10">10 Minutes</option>
                            <option value="15">15 Minutes</option>
                            <option value="20">20 Minutes</option>
                            <option value="30">30 Minutes</option>
                        </select>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center pt-2 gap-4">
                    <div className="text-xs text-gray-500">
                        {currentCourse && activeTopicName ? (
                            <span className="text-emerald-700 font-medium">
                                Topic assessment target: <strong className="text-emerald-900">{currentCourse.course_name}</strong> &rarr; <strong className="text-emerald-900">{activeTopicName}</strong>
                            </span>
                        ) : (
                            <span>Select course and pick or enter a topic to trigger AI generation.</span>
                        )}
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                            onClick={handleGenerateAssessment}
                            disabled={isLoading || !details.selectedCourseId || !activeTopicName}
                            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-white bg-[#7F77FF] hover:bg-[#6C63FE] disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                        >
                            {isLoading ? (
                                <>
                                    <FiRefreshCw className="animate-spin text-lg" />
                                    <span>Generating Questions...</span>
                                </>
                            ) : (
                                <>
                                    <FiRefreshCw className="text-lg" />
                                    <span>Generate Topic Assessment</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* AI Generation Loading State */}
            {isLoading && (
                <div className="w-full max-w-6xl bg-white/90 rounded-3xl p-10 medium-box-shadow white flex flex-col items-center justify-center gap-4 text-center border border-indigo-100 mb-8 animate-pulse">
                    <div className="h-16 w-16 rounded-full bg-[#7F77FF]/15 flex items-center justify-center text-[#7F77FF] text-2xl">
                        <FiRefreshCw className="animate-spin text-3xl" />
                    </div>
                    <h3 className="text-xl font-bold text-[#112D55]">Generating Topic Assessment...</h3>
                    <p className="text-sm text-gray-600 max-w-md">
                        AI is currently generating multiple-choice questions focused on{" "}
                        <strong className="text-[#112D55]">{activeTopicName}</strong>. Please hold on.
                    </p>
                </div>
            )}

            {/* Questions Preview Section */}
            {!isLoading && questions.length > 0 && (
                <div className="w-full max-w-6xl flex flex-col gap-6 mb-12">
                    {/* Overview & Quick Info Strip */}
                    <div className="bg-gradient-to-r from-[#112D55] to-[#1e3a66] text-white rounded-3xl p-6 shadow-xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-semibold">
                                    Topic Assessment Preview
                                </span>
                                <span className="text-xs text-white/75">
                                    {currentCourse?.course_name}
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold">{activeTopicName}</h2>
                            <p className="text-sm text-white/80 mt-1">
                                Review the questions below. You can edit any question or option before adding to the database.
                            </p>
                        </div>

                        {/* Summary Badges & DB Button */}
                        <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2.5 rounded-2xl backdrop-blur-sm border border-white/10">
                                <FiLayers className="text-[#7F77FF]" />
                                <div className="text-left">
                                    <div className="text-[10px] uppercase font-bold text-white/60">Total Questions</div>
                                    <div className="text-sm font-bold text-white">{questions.length} Items</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 bg-white/10 px-4 py-2.5 rounded-2xl backdrop-blur-sm border border-white/10">
                                <FiAward className="text-amber-400" />
                                <div className="text-left">
                                    <div className="text-[10px] uppercase font-bold text-white/60">Pass Mark (70%)</div>
                                    <div className="text-sm font-bold text-white">
                                        {Math.ceil(questions.length * 0.7)} / {questions.length}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleAddToDatabase}
                                disabled={isSaving}
                                className="px-6 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-60 shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                            >
                                {isSaving ? <FiRefreshCw className="animate-spin text-lg" /> : <FiDatabase className="text-lg" />}
                                <span>{isSaving ? "Saving..." : "Add to Database"}</span>
                            </button>
                        </div>
                    </div>

                    {/* Question Action Bar */}
                    <div className="flex justify-between items-center px-1">
                        <div className="text-sm font-bold text-gray-700">
                            Assessment Questions ({questions.length})
                        </div>
                        <button
                            onClick={handleAddManualQuestion}
                            className="px-4 py-2 rounded-xl text-xs font-bold text-[#534DB4] bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                            <FiPlus className="text-sm" /> Add Custom Question
                        </button>
                    </div>

                    {/* Question Cards */}
                    <div className="flex flex-col gap-4">
                        {questions.map((q, index) => {
                            const isEditing = editingIndex === index;
                            const optionLetters = ["A", "B", "C", "D"];

                            return (
                                <div
                                    key={q.id || index}
                                    className="bg-white rounded-2xl p-6 small-box-shadow white border border-gray-100 transition-all hover:border-indigo-100"
                                >
                                    {isEditing ? (
                                        /* Question Edit Mode */
                                        <div className="flex flex-col gap-4">
                                            <div className="flex justify-between items-center border-b pb-2">
                                                <span className="font-bold text-sm text-[#7F77FF]">
                                                    Editing Question #{index + 1}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => saveEditing(index)}
                                                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 cursor-pointer"
                                                    >
                                                        <FiCheck /> Done
                                                    </button>
                                                    <button
                                                        onClick={cancelEditing}
                                                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center gap-1 cursor-pointer"
                                                    >
                                                        <FiX /> Cancel
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Question Prompt Input */}
                                            <div className="flex flex-col gap-1">
                                                <label className="text-xs font-bold text-gray-600">Question Text</label>
                                                <input
                                                    type="text"
                                                    value={editForm.question}
                                                    onChange={(e) => setEditForm({ ...editForm, question: e.target.value })}
                                                    className="w-full border border-gray-300 rounded-xl p-2.5 text-sm font-semibold text-gray-800 outline-none focus:border-[#7F77FF]"
                                                />
                                            </div>

                                            {/* Options Inputs */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {editForm.options.map((opt, optIdx) => (
                                                    <div key={optIdx} className="flex flex-col gap-1">
                                                        <label className="text-xs font-semibold text-gray-500">
                                                            Option {optionLetters[optIdx]}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={opt}
                                                            onChange={(e) => {
                                                                const newOpts = [...editForm.options];
                                                                newOpts[optIdx] = e.target.value;
                                                                const newAns = editForm.answer === opt ? e.target.value : editForm.answer;
                                                                setEditForm({ ...editForm, options: newOpts, answer: newAns });
                                                            }}
                                                            className="border border-gray-300 rounded-xl p-2 text-sm text-gray-800 outline-none focus:border-[#7F77FF]"
                                                        />
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Correct Answer Selection */}
                                            <div className="flex flex-col gap-1">
                                                <label className="text-xs font-bold text-gray-600">Correct Answer</label>
                                                <select
                                                    value={editForm.answer}
                                                    onChange={(e) => setEditForm({ ...editForm, answer: e.target.value })}
                                                    className="border border-gray-300 rounded-xl p-2 text-sm text-gray-800 outline-none focus:border-emerald-500"
                                                >
                                                    {editForm.options.map((opt, optIdx) => (
                                                        <option key={optIdx} value={opt}>
                                                            Option {optionLetters[optIdx]}: {opt}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Question View Mode */
                                        <div className="flex flex-col gap-4">
                                            <div className="flex justify-between items-start gap-4">
                                                <div className="flex items-start gap-3">
                                                    <span className="flex-shrink-0 h-7 w-7 rounded-lg bg-[#7F77FF]/15 text-[#534DB4] font-extrabold text-xs flex items-center justify-center">
                                                        {index + 1}
                                                    </span>
                                                    <h4 className="text-base font-bold text-gray-900 leading-snug">
                                                        {q.question}
                                                    </h4>
                                                </div>

                                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                                    <button
                                                        onClick={() => startEditing(index)}
                                                        className="p-1.5 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all cursor-pointer"
                                                        title="Edit Question"
                                                    >
                                                        <FiEdit3 className="text-base" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteQuestion(index)}
                                                        className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                                                        title="Delete Question"
                                                    >
                                                        <FiTrash2 className="text-base" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Options Grid */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
                                                {q.options?.map((option, optIdx) => {
                                                    const isCorrect = option === q.answer;
                                                    return (
                                                        <div
                                                            key={optIdx}
                                                            className={`flex items-center justify-between p-3.5 rounded-xl border text-sm transition-all ${
                                                                isCorrect
                                                                    ? "border-emerald-500 bg-emerald-50/80 text-emerald-950 font-medium shadow-sm"
                                                                    : "border-gray-200 bg-gray-50/50 text-gray-700"
                                                            }`}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <span
                                                                    className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                                                        isCorrect
                                                                            ? "bg-emerald-600 text-white"
                                                                            : "bg-gray-200 text-gray-700"
                                                                    }`}
                                                                >
                                                                    {optionLetters[optIdx]}
                                                                </span>
                                                                <span>{option}</span>
                                                            </div>

                                                            {isCorrect && (
                                                                <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                                                                    <FiCheckCircle className="text-sm" /> Correct
                                                                </span>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-indigo-100 mt-2">
                        <div className="text-sm text-gray-600">
                            Ready to publish? Click <strong className="text-emerald-700">Add to Database</strong> to store this topic assessment in MongoDB.
                        </div>
                        <button
                            onClick={handleAddToDatabase}
                            disabled={isSaving}
                            className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-60 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                        >
                            {isSaving ? <FiRefreshCw className="animate-spin text-lg" /> : <FiDatabase className="text-lg" />}
                            <span>{isSaving ? "Saving to Database..." : "Add to Database"}</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Empty State when no questions generated yet */}
            {!isLoading && questions.length === 0 && (
                <div className="w-full max-w-4xl bg-white/70 backdrop-blur-sm rounded-3xl p-10 medium-box-shadow white flex flex-col items-center justify-center gap-4 text-center border border-white/60 mb-8">
                    <div className="h-16 w-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-[#7F77FF] text-3xl">
                        <FiHelpCircle />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">No Topic Questions Generated Yet</h3>
                    <p className="text-sm text-gray-500 max-w-md">
                        Select a course and topic above, then click <strong>Generate Topic Assessment</strong>.
                        Once the AI creates the questions, you can review, edit, and add them directly to the database.
                    </p>
                </div>
            )}
        </div>
    );
}

export default CourseAdmin;