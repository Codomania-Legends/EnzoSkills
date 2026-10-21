import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useCourse } from '../../Utility/Course';
import axios from 'axios';
import { sileo } from 'sileo';
import {
  FiBookOpen,
  FiPlus,
  FiTrash2,
  FiRefreshCw,
  FiDatabase,
  FiArrowLeft,
  FiLayers,
  FiCalendar,
  FiEdit3,
  FiEye,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiAward
} from 'react-icons/fi';

function MaterialAdmin() {
  const navigate = useNavigate();
  const { courseDetails = [], refreshCourses, updateCourseInState } = useCourse();

  // Selected course
  const [selectedCourseId, setSelectedCourseId] = useState("");

  // Roadmap selection state
  const [selectedWeek, setSelectedWeek] = useState(""); // "" for all weeks, or "Week 1", etc.
  const [selectedRoadmapLevel, setSelectedRoadmapLevel] = useState(""); // levelNumber or "custom"

  // Material fields
  const [dayNumber, setDayNumber] = useState(1);
  const [lessonTitle, setLessonTitle] = useState("");
  const [topicsSummary, setTopicsSummary] = useState("");

  // Material sections state: array of { heading: string, learning_para: string }
  const [sections, setSections] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("editor"); // "editor" or "preview"

  // Match selected course
  const currentCourse = useMemo(() => {
    return courseDetails.find(
      (c) => String(c.course_id || c.id || c._id) === String(selectedCourseId)
    );
  }, [courseDetails, selectedCourseId]);

  // Extract roadmap items from current course
  const roadmapItems = useMemo(() => {
    if (!currentCourse?.roadmap || !Array.isArray(currentCourse.roadmap)) return [];
    return currentCourse.roadmap;
  }, [currentCourse]);

  // Extract distinct weeks from roadmap
  const availableWeeks = useMemo(() => {
    if (!roadmapItems.length) return [];
    const weeks = [];
    const seen = new Set();
    roadmapItems.forEach((item) => {
      const wLabel = item.weekStart || `Week ${item.levelNumber}`;
      if (!seen.has(wLabel)) {
        seen.add(wLabel);
        weeks.push({
          weekStart: wLabel,
          weekTitle: item.weekTitle || item.topic
        });
      }
    });
    return weeks;
  }, [roadmapItems]);

  // Filter roadmap items by selected week
  const filteredRoadmapItems = useMemo(() => {
    if (!selectedWeek) return roadmapItems;
    return roadmapItems.filter((rm) => rm.weekStart === selectedWeek);
  }, [roadmapItems, selectedWeek]);

  // Check if current day has existing material in database
  const existingMaterialForCurrentDay = useMemo(() => {
    if (!currentCourse?.daywise_material || !Array.isArray(currentCourse.daywise_material)) {
      return null;
    }
    return currentCourse.daywise_material.find((m) => Number(m.day) === Number(dayNumber)) || null;
  }, [currentCourse, dayNumber]);

  // Helper to load material for a specific day or level
  const loadDayMaterial = (dayNum, levelItem = null) => {
    const existing = currentCourse?.daywise_material?.find(
      (m) => Number(m.day) === Number(dayNum)
    );

    if (existing && Array.isArray(existing.material) && existing.material.length > 0) {
      setSections(existing.material);
      if (existing.title) setLessonTitle(existing.title);
      if (existing.topics) setTopicsSummary(existing.topics);
      sileo.success({
        title: `Existing Material Loaded! 📖`,
        description: `Day ${dayNum} material with ${existing.material.length} sections loaded from database.`
      });
    } else {
      setSections([]);
      if (levelItem) {
        setLessonTitle(levelItem.topic || "");
        setTopicsSummary(levelItem.achievement || levelItem.topic || "");
      }
    }
  };

  // When course changes, initialize roadmap selection
  const handleCourseSelect = (e) => {
    const cId = e.target.value;
    setSelectedCourseId(cId);
    setSelectedWeek("");

    const course = courseDetails.find(
      (c) => String(c.course_id || c.id || c._id) === String(cId)
    );

    if (course?.roadmap && course.roadmap.length > 0) {
      // Pick the first roadmap item
      const firstLevel = course.roadmap[0];
      setSelectedRoadmapLevel(String(firstLevel.levelNumber));
      setDayNumber(Number(firstLevel.levelNumber) || 1);
      setLessonTitle(firstLevel.topic || "");
      setTopicsSummary(firstLevel.achievement || firstLevel.topic || "");

      // Check if day 1 already has material
      const existing = course.daywise_material?.find(
        (m) => Number(m.day) === Number(firstLevel.levelNumber)
      );
      if (existing && Array.isArray(existing.material) && existing.material.length > 0) {
        setSections(existing.material);
      } else {
        setSections([]);
      }
    } else if (course?.daywise_material?.length) {
      const existingDays = course.daywise_material.map((m) => Number(m.day) || 0);
      const nextDay = Math.max(...existingDays, 0) + 1;
      setDayNumber(nextDay);
      setSelectedRoadmapLevel("custom");
      setSections([]);
    } else {
      setDayNumber(1);
      setSelectedRoadmapLevel("custom");
      setSections([]);
    }
  };

  // When a week is selected
  const handleWeekSelect = (e) => {
    const wk = e.target.value;
    setSelectedWeek(wk);

    // If changing week, pick the first day in that week
    const matchingDays = wk ? roadmapItems.filter((rm) => rm.weekStart === wk) : roadmapItems;
    if (matchingDays.length > 0) {
      const first = matchingDays[0];
      handleRoadmapLevelSelect(first.levelNumber);
    }
  };

  // When a day / level from roadmap is selected
  const handleRoadmapLevelSelect = (levelNumStr) => {
    if (levelNumStr === "custom") {
      setSelectedRoadmapLevel("custom");
      return;
    }

    setSelectedRoadmapLevel(String(levelNumStr));
    const targetLevel = roadmapItems.find(
      (rm) => Number(rm.levelNumber) === Number(levelNumStr)
    );

    if (targetLevel) {
      const dayNum = Number(targetLevel.levelNumber);
      setDayNumber(dayNum);
      setLessonTitle(targetLevel.topic || "");
      setTopicsSummary(targetLevel.achievement || targetLevel.topic || "");

      // If week isn't set or doesn't match, sync it
      if (targetLevel.weekStart && targetLevel.weekStart !== selectedWeek) {
        setSelectedWeek(targetLevel.weekStart);
      }

      // Check and load existing material if already in database
      const existing = currentCourse?.daywise_material?.find(
        (m) => Number(m.day) === dayNum
      );

      if (existing && Array.isArray(existing.material) && existing.material.length > 0) {
        setSections(existing.material);
        if (existing.title) setLessonTitle(existing.title);
        if (existing.topics) setTopicsSummary(existing.topics);
        sileo.success({
          title: `Loaded Saved Material for Day ${dayNum} 📖`,
          description: `Loaded ${existing.material.length} sections from database.`
        });
      } else {
        setSections([]);
        sileo.info({
          title: `Roadmap Day ${dayNum} Selected`,
          description: `Topic: "${targetLevel.topic}". Click "Generate Daywise Material" to create content.`
        });
      }
    }
  };

  // Quick fill template if user wants rapid testing without waiting for AI
  const handleLoadSample = () => {
    if (!currentCourse) {
      sileo.error({ title: "Select Course First", description: "Please pick a course before loading a sample." });
      return;
    }
    const title = lessonTitle || "Asynchronous Programming & Promises";
    const topics = topicsSummary || "Async/Await, Promises, Microtasks, Error Handling";

    setLessonTitle(title);
    setTopicsSummary(topics);
    setSections([
      {
        heading: `Introduction to ${title} 🚀`,
        learning_para: `In modern development, mastering ${title} is fundamental. Today we explore core concepts, practical syntax, and architectural principles required for production applications.`
      },
      {
        heading: `Architecture & Execution Mechanics 🏗️`,
        learning_para: `Understanding the runtime behavior, memory lifecycle, and state flow gives you full confidence when handling complex logic. We analyze best practices and how components communicate efficiently.`
      },
      {
        heading: `Production Patterns & Error Resilience 💡`,
        learning_para: `When deploying real-world systems, always safeguard against edge cases and asynchronous failures. Use centralized handlers, optimistic UI updates, and validate inputs at every step.`
      }
    ]);

    sileo.success({ title: "Sample Loaded", description: "Template sections populated! Feel free to edit or publish." });
  };

  // =========================================================================
  // 🧠 AI DAYWISE MATERIAL GENERATION
  // =========================================================================
  const handleGenerateMaterial = async () => {
    if (!currentCourse) {
      sileo.error({ title: "Course Required", description: "Please select a target course." });
      return;
    }
    if (!lessonTitle.trim()) {
      sileo.error({ title: "Lesson Title Required", description: "Please enter a lesson title for this day." });
      return;
    }

    setIsGenerating(true);
    try {
      const res = await axios.post("http://localhost:3000/courses/material/generate", {
        course_name: currentCourse.course_name,
        day: dayNumber,
        title: lessonTitle.trim(),
        topics: topicsSummary.trim() || lessonTitle.trim()
      });

      console.log("Material Generation Response:", res.data);

      const data = res.data;
      if (data && Array.isArray(data.material) && data.material.length > 0) {
        setSections(data.material);
        if (data.title) setLessonTitle(data.title);
        if (data.topics) setTopicsSummary(data.topics);

        sileo.success({
          title: "Daywise Material Generated! 🎉",
          description: `Created ${data.material.length} sections for Day ${dayNumber}: "${data.title || lessonTitle}".`
        });
      } else {
        throw new Error("Invalid response format from generator.");
      }
    } catch (err) {
      console.error("AI Material Generation Error:", err);
      sileo.error({
        title: "Generation Failed",
        description: err.response?.data?.message || err.message || "Failed to generate material."
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // =========================================================================
  // 📝 SECTION MANAGEMENT (ADD, EDIT, REMOVE)
  // =========================================================================
  const handleAddSection = () => {
    setSections((prev) => [
      ...prev,
      {
        heading: `Section ${prev.length + 1}: Concept Title`,
        learning_para: "Write or paste the educational reading material here..."
      }
    ]);
  };

  const handleUpdateHeading = (index, value) => {
    setSections((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], heading: value };
      return copy;
    });
  };

  const handleUpdatePara = (index, value) => {
    setSections((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], learning_para: value };
      return copy;
    });
  };

  const handleRemoveSection = (index) => {
    setSections((prev) => prev.filter((_, i) => i !== index));
    sileo.success({ title: "Section Removed", description: "Material section deleted." });
  };

  // =========================================================================
  // 💾 PUBLISH TO DATABASE (PATCH /courses/material)
  // =========================================================================
  const handlePublishMaterial = async () => {
    if (!currentCourse) {
      sileo.error({ title: "Course Missing", description: "Please select a course." });
      return;
    }
    if (!lessonTitle.trim()) {
      sileo.error({ title: "Title Missing", description: "Please provide a lesson title." });
      return;
    }
    if (!sections.length) {
      sileo.error({ title: "Empty Material", description: "Please generate or add at least one learning section." });
      return;
    }

    const payload = {
      course_id: currentCourse.course_id || currentCourse._id || currentCourse.id,
      daywise_material: [
        {
          day: Number(dayNumber),
          title: lessonTitle.trim(),
          topics: topicsSummary.trim() || lessonTitle.trim(),
          material: sections
        }
      ]
    };

    console.log("------------------------------------------");
    console.log("🚀 [ADMIN] Publishing Daywise Material to Database:", payload);
    console.log("------------------------------------------");

    setIsSaving(true);
    try {
      const res = await axios.patch("http://localhost:3000/courses/material", payload);
      console.log("Save Response:", res.data);

      const updatedCourse = res.data?.course;

      // Update in context immediately
      if (updateCourseInState && updatedCourse) {
        updateCourseInState(updatedCourse);
      }
      if (refreshCourses) {
        await refreshCourses();
      }

      sileo.success({
        title: "Material Published to Database! 🚀",
        description: `Day ${dayNumber} content saved for "${currentCourse.course_name}".`
      });

    } catch (err) {
      console.error("Publish Material Error:", err);
      sileo.error({
        title: "Publish Failed",
        description: err.response?.data?.error || err.response?.data?.message || err.message || "Failed to save material"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-full w-full overflow-y-auto px-4 md:px-8 py-6 flex flex-col items-center [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300">
      {/* Header Bar */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard/courses")}
            className="p-2 rounded-xl bg-white/80 hover:bg-white text-gray-700 small-box-shadow transition-all cursor-pointer"
            title="Back to Courses"
          >
            <FiArrowLeft className="text-lg" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#7F77FF]/15 text-[#534DB4]">
                Admin Console
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                Roadmap-Linked Daywise Studio
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#112D55] tracking-tight">
              Daywise Material Generator
            </h1>
          </div>
        </div>

        {sections.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab(activeTab === "editor" ? "preview" : "editor")}
              className="px-4 py-2 rounded-xl text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <FiEye /> {activeTab === "editor" ? "Student Preview" : "Editor View"}
            </button>
            <button
              onClick={handlePublishMaterial}
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-60 shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              {isSaving ? <FiRefreshCw className="animate-spin text-base" /> : <FiDatabase className="text-base" />}
              <span>{isSaving ? "Saving..." : "Add to Database"}</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Configuration Card */}
      <div className="w-full max-w-6xl bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-8 medium-box-shadow white flex flex-col gap-6 mb-8 border border-white/60">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2 text-[#112D55] font-bold text-lg">
            <FiLayers className="text-[#7F77FF]" />
            <span>Select Course & Roadmap Level</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLoadSample}
              className="text-xs font-bold text-[#7F77FF] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Fill Quick Template 🧪</span>
            </button>
          </div>
        </div>

        {/* 1. Course Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
              <FiBookOpen className="text-[#7F77FF]" /> 1. Target Course
            </label>
            <select
              value={selectedCourseId}
              onChange={handleCourseSelect}
              className="w-full bg-[#f8fafc] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 outline-none focus:border-[#7F77FF] focus:ring-2 focus:ring-[#7F77FF]/20 transition-all cursor-pointer"
            >
              <option value="" disabled>Choose target course...</option>
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

          {/* 2. Week from Roadmap Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
              <FiCalendar className="text-[#7F77FF]" /> 2. Week from Roadmap
            </label>
            <select
              disabled={!currentCourse || availableWeeks.length === 0}
              value={selectedWeek}
              onChange={handleWeekSelect}
              className="w-full bg-[#f8fafc] disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 outline-none focus:border-[#7F77FF] focus:ring-2 focus:ring-[#7F77FF]/20 transition-all cursor-pointer"
            >
              <option value="">All Weeks ({availableWeeks.length} available)</option>
              {availableWeeks.map((wk, idx) => (
                <option key={idx} value={wk.weekStart}>
                  {wk.weekStart} &mdash; {wk.weekTitle}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Day / Level from Roadmap Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
              <FiMapPin className="text-[#7F77FF]" /> 3. Day / Topic from Roadmap
            </label>
            <select
              disabled={!currentCourse}
              value={selectedRoadmapLevel}
              onChange={(e) => handleRoadmapLevelSelect(e.target.value)}
              className="w-full bg-[#f8fafc] disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 outline-none focus:border-[#7F77FF] focus:ring-2 focus:ring-[#7F77FF]/20 transition-all cursor-pointer"
            >
              {filteredRoadmapItems.length > 0 ? (
                <>
                  {filteredRoadmapItems.map((rm) => {
                    const isUploaded = currentCourse?.daywise_material?.some(
                      (m) => Number(m.day) === Number(rm.levelNumber)
                    );
                    return (
                      <option key={rm.levelNumber} value={rm.levelNumber}>
                        Day {rm.levelNumber}: {rm.topic} {isUploaded ? '✅ (Saved)' : '⚪ (Pending)'}
                      </option>
                    );
                  })}
                  <option value="custom">&bull; Custom / Manual Day Input &bull;</option>
                </>
              ) : (
                <option value="custom">No Roadmap Items (Manual Input)</option>
              )}
            </select>
          </div>
        </div>

        {/* Roadmap Quick Matrix Pills */}
        {roadmapItems.length > 0 && (
          <div className="flex flex-col gap-2 bg-[#f8fafc] p-4 rounded-2xl border border-gray-200">
            <div className="flex items-center justify-between text-xs font-bold text-gray-600 uppercase tracking-wider">
              <span>Roadmap Day Navigator (Click any day to load):</span>
              <span className="text-[#7F77FF]">
                {currentCourse?.daywise_material?.length || 0} / {roadmapItems.length} Days Generated
              </span>
            </div>
            <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pt-1 pb-1">
              {roadmapItems.map((rm) => {
                const dayNum = Number(rm.levelNumber);
                const isSelected = Number(dayNumber) === dayNum;
                const isUploaded = currentCourse?.daywise_material?.some(
                  (m) => Number(m.day) === dayNum
                );

                return (
                  <button
                    key={dayNum}
                    type="button"
                    onClick={() => handleRoadmapLevelSelect(dayNum)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#7F77FF] text-white shadow-md scale-105'
                        : isUploaded
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <span>Day {dayNum}</span>
                    {isUploaded ? <FiCheckCircle className="text-emerald-500" /> : <span className="text-gray-400 text-[10px]">⚪</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Status Alert for currently selected day */}
        {existingMaterialForCurrentDay ? (
          <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
            <div className="flex items-center gap-2">
              <FiCheckCircle className="text-lg text-emerald-600 flex-shrink-0" />
              <span>
                <strong>Day {dayNumber} is already in the database!</strong> Loaded{' '}
                <strong className="underline">{existingMaterialForCurrentDay.material?.length || 0} sections</strong>.
                You can edit sections below and click &quot;Add to Database&quot; to update it.
              </span>
            </div>
            <span className="text-xs bg-emerald-200/80 px-2.5 py-1 rounded-full font-bold">
              Database Synced
            </span>
          </div>
        ) : currentCourse ? (
          <div className="flex items-center justify-between p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-sm">
            <div className="flex items-center gap-2">
              <FiClock className="text-lg text-amber-600 flex-shrink-0" />
              <span>
                <strong>Day {dayNumber}</strong> is currently pending. Click{' '}
                <strong className="underline">&quot;Generate Daywise Material&quot;</strong> below to use AI, or load a sample template.
              </span>
            </div>
            <span className="text-xs bg-amber-200/80 px-2.5 py-1 rounded-full font-bold">
              Not Generated Yet
            </span>
          </div>
        ) : null}

        {/* Detailed Input Fields (Synced with Roadmap Selection) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 border-t border-gray-100 pt-5">
          {/* Day Number */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
              <FiCalendar className="text-[#7F77FF]" /> Day Number
            </label>
            <input
              type="number"
              min={1}
              value={dayNumber}
              onChange={(e) => {
                const val = Math.max(1, Number(e.target.value));
                setDayNumber(val);
                loadDayMaterial(val);
              }}
              className="w-full bg-[#f8fafc] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 outline-none focus:border-[#7F77FF] focus:ring-2 focus:ring-[#7F77FF]/20 transition-all"
            />
          </div>

          {/* Lesson Title */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
              <FiEdit3 className="text-[#7F77FF]" /> Lesson Title (from Roadmap)
            </label>
            <input
              type="text"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              placeholder="e.g. Cryptography & Distributed Ledgers"
              className="w-full bg-[#f8fafc] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 outline-none focus:border-[#7F77FF] focus:ring-2 focus:ring-[#7F77FF]/20 transition-all"
            />
          </div>

          {/* Topics / Focus Summary */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
              <FiAward className="text-[#7F77FF]" /> Key Topics / Achievement
            </label>
            <input
              type="text"
              value={topicsSummary}
              onChange={(e) => setTopicsSummary(e.target.value)}
              placeholder="e.g. Understood Hash Functions and Consensus"
              className="w-full bg-[#f8fafc] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-800 outline-none focus:border-[#7F77FF] focus:ring-2 focus:ring-[#7F77FF]/20 transition-all"
            />
          </div>
        </div>

        {/* Action Button Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-3 gap-4 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            {currentCourse ? (
              <span>
                Targeting <strong className="text-gray-900">{currentCourse.course_name}</strong> &bull; Total Roadmap Levels:{" "}
                <strong className="text-indigo-600">{roadmapItems.length}</strong> &bull; Uploaded:{" "}
                <strong className="text-emerald-600">{currentCourse.daywise_material?.length || 0} Days</strong>
              </span>
            ) : (
              <span>Select a course above to inspect and craft daywise material.</span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleGenerateMaterial}
              disabled={isGenerating || !selectedCourseId || !lessonTitle.trim()}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-white bg-[#7F77FF] hover:bg-[#6C63FE] disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              {isGenerating ? (
                <>
                  <FiRefreshCw className="animate-spin text-lg" />
                  <span>Generating Material with AI...</span>
                </>
              ) : (
                <>
                  <FiBookOpen className="text-lg" />
                  <span>Generate Daywise Material</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Loading Shimmer State */}
      {isGenerating && (
        <div className="w-full max-w-6xl bg-white/90 rounded-3xl p-10 medium-box-shadow white flex flex-col items-center justify-center gap-4 text-center border border-indigo-100 mb-8 animate-pulse">
          <div className="h-16 w-16 rounded-full bg-[#7F77FF]/15 flex items-center justify-center text-[#7F77FF] text-3xl">
            <FiRefreshCw className="animate-spin" />
          </div>
          <h3 className="text-xl font-bold text-[#112D55]">Generating Day {dayNumber} Lesson Material...</h3>
          <p className="text-sm text-gray-600 max-w-md">
            The AI educator is crafting comprehensive headings and structured explanations for{" "}
            <strong className="text-[#112D55]">{lessonTitle}</strong>.
          </p>
        </div>
      )}

      {/* Material Sections Workspace */}
      {!isGenerating && sections.length > 0 && (
        <div className="w-full max-w-6xl flex flex-col gap-6 mb-12">
          {/* Summary Banner */}
          <div className="bg-gradient-to-r from-[#112D55] to-[#1e3a66] text-white rounded-3xl p-6 shadow-xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#7F77FF] text-white text-xs px-3 py-1 rounded-full font-bold">
                  Day {dayNumber} Lesson
                </span>
                {selectedWeek && (
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    {selectedWeek}
                  </span>
                )}
                <span className="text-xs text-white/75">{currentCourse?.course_name}</span>
              </div>
              <h2 className="text-2xl font-bold">{lessonTitle}</h2>
              <p className="text-sm text-white/80 mt-1">
                {topicsSummary ? `Key Topics / Milestone: ${topicsSummary}` : "Review and fine-tune each section before publishing."}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleAddSection}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-white/15 hover:bg-white/25 border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <FiPlus className="text-sm" /> Add Section
              </button>
              <button
                onClick={handlePublishMaterial}
                disabled={isSaving}
                className="px-6 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-60 shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                {isSaving ? <FiRefreshCw className="animate-spin text-lg" /> : <FiDatabase className="text-lg" />}
                <span>{isSaving ? "Saving..." : "Add to Database"}</span>
              </button>
            </div>
          </div>

          {/* Editor Mode vs Student Preview Mode */}
          {activeTab === "editor" ? (
            <div className="flex flex-col gap-5">
              {sections.map((section, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 small-box-shadow white border border-gray-100 flex flex-col gap-4 transition-all hover:border-indigo-100"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="h-6 w-6 rounded-lg bg-[#7F77FF]/15 text-[#534DB4] text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Section Heading
                      </span>
                    </div>

                    <button
                      onClick={() => handleRemoveSection(idx)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
                      title="Remove Section"
                    >
                      <FiTrash2 className="text-base" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={section.heading}
                    onChange={(e) => handleUpdateHeading(idx, e.target.value)}
                    placeholder="Enter section heading..."
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-base font-bold text-gray-800 outline-none focus:border-[#7F77FF]"
                  />

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Learning Paragraph & Content
                    </label>
                    <textarea
                      rows={4}
                      value={section.learning_para}
                      onChange={(e) => handleUpdatePara(idx, e.target.value)}
                      placeholder="Write detailed educational text for this topic..."
                      className="w-full border border-gray-300 rounded-xl p-3.5 text-sm text-gray-700 outline-none focus:border-[#7F77FF] resize-y"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Student Learning View Preview */
            <div className="bg-white rounded-3xl p-8 medium-box-shadow white flex flex-col gap-6">
              <div className="border-b pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#7F77FF] text-white">
                    Day {dayNumber}
                  </span>
                  {selectedWeek && (
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700">
                      {selectedWeek}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-extrabold text-[#112D55] mt-2">{lessonTitle}</h2>
                <p className="text-xs text-gray-500 font-semibold mt-1">Topic / Milestone: {topicsSummary}</p>
              </div>

              <div className="flex flex-col gap-6">
                {sections.map((section, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold text-[#112D55] flex items-center gap-2">
                      <FiCheckCircle className="text-[#7F77FF]" />
                      <span>{section.heading}</span>
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed pl-6">
                      {section.learning_para}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-indigo-100 mt-2">
            <div className="text-sm text-gray-600">
              Ready to publish? Click <strong className="text-emerald-700">Add to Database</strong> to save Day {dayNumber} content to &quot;{currentCourse?.course_name}&quot;.
            </div>
            <button
              onClick={handlePublishMaterial}
              disabled={isSaving}
              className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-60 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              {isSaving ? <FiRefreshCw className="animate-spin text-lg" /> : <FiDatabase className="text-lg" />}
              <span>{isSaving ? "Saving to Course..." : "Add to Database"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isGenerating && sections.length === 0 && (
        <div className="w-full max-w-4xl bg-white/70 backdrop-blur-sm rounded-3xl p-10 medium-box-shadow white flex flex-col items-center justify-center gap-4 text-center border border-white/60 mb-8">
          <div className="h-16 w-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-[#7F77FF] text-3xl">
            <FiBookOpen />
          </div>
          <h3 className="text-lg font-bold text-gray-800">
            {currentCourse ? `No Material Loaded for Day ${dayNumber}` : "Select a Course to Begin"}
          </h3>
          <p className="text-sm text-gray-500 max-w-md">
            {currentCourse ? (
              <>
                Day {dayNumber} &bull; <strong>{lessonTitle || "Roadmap Topic"}</strong> has not been generated yet. Click <strong>Generate Daywise Material</strong> or <strong>Fill Quick Template</strong> to create content.
              </>
            ) : (
              "Choose a target course and select any week or day from its roadmap."
            )}
          </p>
        </div>
      )}
    </div>
  );
}

export default MaterialAdmin;
