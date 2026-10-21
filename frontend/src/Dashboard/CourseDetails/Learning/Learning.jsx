import { useState, useMemo, useEffect } from 'react';
import { useCourse } from '../../../Utility/Course';
import { useNavigate, useSearchParams } from 'react-router';
import {
    FiBookOpen,
    FiCheckCircle,
    FiClock,
    FiAward,
    FiCalendar,
    FiArrowLeft,
    FiEdit3,
    FiCompass
} from 'react-icons/fi';

// Initial dummy data as fallback if a course has neither roadmap nor daywise_material
const dummyMaterials = [
    {
        day: 1,
        weekStart: "Week 1",
        weekTitle: "Core Foundations",
        title: "Introduction to the Core Concepts",
        topics: "Foundations, Architecture, Best Practices",
        achievement: "Mastered fundamental concepts and basic project workflow",
        hasContent: true,
        material: [
            {
                heading: "Welcome to Day 1! 🚀",
                learning_para: "Today we will lay down the foundational knowledge required for this course. Understanding the core architecture is crucial before we dive into writing complex logic. Take your time to absorb these concepts."
            },
            {
                heading: "Understanding the Architecture",
                learning_para: "We use a component-based architecture which allows us to build encapsulated elements that manage their own state, then compose them to make complex UIs. This approach makes our codebase scalable and maintainable."
            }
        ]
    },
    {
        day: 2,
        weekStart: "Week 1",
        weekTitle: "Core Foundations",
        title: "Deep Dive into State Management",
        topics: "Hooks, Context API, Reducers",
        achievement: "Designed predictable state models across nested component trees",
        hasContent: true,
        material: [
            {
                heading: "Managing Application State",
                learning_para: "State is the heart of any dynamic application. Today, we'll explore how to efficiently manage data that changes over time and how to trigger UI updates seamlessly when that data changes."
            },
            {
                heading: "Advanced Patterns",
                learning_para: "Once you master basic state, we will introduce advanced patterns like Context and Reducers to prevent prop-drilling and keep our component tree clean and performant."
            }
        ]
    },
    {
        day: 3,
        weekStart: "Week 2",
        weekTitle: "Full-Stack Integrations",
        title: "Building Real-World Features",
        topics: "API Integration, Routing, Authentication",
        achievement: "Constructed secure authenticated client-server data flows",
        hasContent: true,
        material: [
            {
                heading: "Connecting to the Backend",
                learning_para: "Modern applications don't exist in a vacuum. You will learn how to securely connect your frontend to external APIs, handle loading states, and gracefully manage errors."
            }
        ]
    }
];

function Learning() {
    const { currentCourse } = useCourse();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [selectedWeek, setSelectedWeek] = useState("all");
    const [selectedDayNumber, setSelectedDayNumber] = useState(1);

    // Build the consolidated list of learning days directly from the course's roadmap!
    const allLearningDays = useMemo(() => {
        if (!currentCourse) return [];

        const roadmap = Array.isArray(currentCourse.roadmap) ? currentCourse.roadmap : [];
        const materials = Array.isArray(currentCourse.daywise_material) ? currentCourse.daywise_material : [];

        // 1. Primary Strategy: Synthesize from Course Roadmap
        if (roadmap.length > 0) {
            return roadmap.map((level, idx) => {
                const dayNum = Number(level.levelNumber) || (idx + 1);
                const matchedMaterial = materials.find((m) => Number(m.day) === dayNum);

                const hasSavedContent = Boolean(
                    matchedMaterial &&
                    Array.isArray(matchedMaterial.material) &&
                    matchedMaterial.material.length > 0
                );

                return {
                    day: dayNum,
                    weekStart: level.weekStart || `Week ${Math.ceil(dayNum / 5)}`,
                    weekTitle: level.weekTitle || "Core Curriculum",
                    title: matchedMaterial?.title || level.topic || `Day ${dayNum} Lesson`,
                    topics: matchedMaterial?.topics || level.achievement || level.topic,
                    achievement: level.achievement || "",
                    material: matchedMaterial?.material || [],
                    hasContent: hasSavedContent
                };
            });
        }

        // 2. Secondary Strategy: From standalone daywise_material array
        if (materials.length > 0) {
            return materials.map((m, idx) => {
                const dayNum = Number(m.day) || (idx + 1);
                return {
                    day: dayNum,
                    weekStart: `Week ${Math.ceil(dayNum / 5)}`,
                    weekTitle: "Core Syllabus",
                    title: m.title || `Day ${dayNum}`,
                    topics: m.topics || "",
                    achievement: "",
                    material: m.material || [],
                    hasContent: Boolean(Array.isArray(m.material) && m.material.length > 0)
                };
            });
        }

        // 3. Fallback dummy materials
        return dummyMaterials;
    }, [currentCourse]);

    // Available Weeks list from the learning days
    const availableWeeks = useMemo(() => {
        const weeks = [];
        const seen = new Set();
        allLearningDays.forEach((item) => {
            const wLabel = item.weekStart;
            if (wLabel && !seen.has(wLabel)) {
                seen.add(wLabel);
                weeks.push({
                    weekStart: wLabel,
                    weekTitle: item.weekTitle
                });
            }
        });
        return weeks;
    }, [allLearningDays]);

    // Filtered by active week
    const displayedDays = useMemo(() => {
        if (selectedWeek === "all") return allLearningDays;
        return allLearningDays.filter((d) => d.weekStart === selectedWeek);
    }, [allLearningDays, selectedWeek]);

    // Active day object
    const activeDayItem = useMemo(() => {
        const found = allLearningDays.find((d) => d.day === selectedDayNumber);
        return found || displayedDays[0] || allLearningDays[0] || null;
    }, [allLearningDays, selectedDayNumber, displayedDays]);

    // Sync day number from URL search param if present (e.g. ?day=3)
    useEffect(() => {
        const dayParam = searchParams.get("day");
        if (dayParam) {
            const parsed = Number(dayParam);
            if (!isNaN(parsed) && parsed > 0) {
                setSelectedDayNumber(parsed);
                const matchingDay = allLearningDays.find((d) => d.day === parsed);
                if (matchingDay && matchingDay.weekStart) {
                    setSelectedWeek(matchingDay.weekStart);
                }
            }
        } else if (allLearningDays.length > 0 && !allLearningDays.some((d) => d.day === selectedDayNumber)) {
            setSelectedDayNumber(allLearningDays[0].day);
        }
    }, [searchParams, allLearningDays, selectedDayNumber]);

    if (!currentCourse) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
                <div className="h-12 w-12 rounded-full border-4 border-[#7F77FF]/30 border-t-[#7F77FF] animate-spin"></div>
                <div className="text-xl font-bold text-[#7F77FF]">Loading course curriculum... ⏳</div>
            </div>
        );
    }

    return (
        <div className="container h-full overflow-y-auto mx-auto px-4 mt-5 flex flex-col items-center pb-10">
            {/* Top Bar */}
            <div className='flex flex-col md:flex-row justify-between w-[95%] mb-5 items-start md:items-center gap-4'>
                <div className="slide_right">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 rounded-xl bg-white text-gray-700 hover:text-black small-box-shadow transition-all cursor-pointer"
                            title="Go Back"
                        >
                            <FiArrowLeft className="h-4 w-4" />
                        </button>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#7F77FF]/15 text-[#534DB4]">
                                    Roadmap Curriculum
                                </span>
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                                    {currentCourse.course_name}
                                </span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-extrabold font-[Plus_Jakarta_Sans] text-gray-900 tracking-tight">
                                Daily Learning Material
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Quick Admin Navigation Button */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate("/dashboard/admin/material")}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                        title="Open Material Studio"
                    >
                        <FiEdit3 /> Manage Material in Studio
                    </button>
                </div>
            </div>

            {/* Week Selector Filter Pills (from Course Roadmap) */}
            {availableWeeks.length > 0 && (
                <div className="w-[95%] mb-6 flex flex-wrap items-center gap-2 bg-white/70 backdrop-blur-sm p-3 rounded-2xl medium-box-shadow white border border-gray-100">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider mr-2">
                        <FiCalendar className="text-[#7F77FF]" />
                        <span>Filter Week:</span>
                    </div>

                    <button
                        onClick={() => setSelectedWeek("all")}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            selectedWeek === "all"
                                ? 'bg-[#7F77FF] text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        All Weeks ({allLearningDays.length} Days)
                    </button>

                    {availableWeeks.map((wk, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setSelectedWeek(wk.weekStart);
                                const firstDay = allLearningDays.find((d) => d.weekStart === wk.weekStart);
                                if (firstDay) setSelectedDayNumber(firstDay.day);
                            }}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                                selectedWeek === wk.weekStart
                                    ? 'bg-[#7F77FF] text-white shadow-md'
                                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                            <span>{wk.weekStart}</span>
                            <span className="text-[10px] opacity-75 font-normal hidden sm:inline">
                                ({wk.weekTitle})
                            </span>
                        </button>
                    ))}
                </div>
            )}

            {/* Main Learning Grid */}
            <div className="flex flex-col lg:flex-row gap-8 w-[95%]">
                {/* Left Sidebar: Days List derived from Roadmap */}
                <div className="lg:w-1/3 flex flex-col gap-3 max-h-[75vh] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300">
                    {displayedDays.map((item) => {
                        const isSelected = activeDayItem?.day === item.day;

                        return (
                            <div
                                key={item.day}
                                onClick={() => setSelectedDayNumber(item.day)}
                                className={`cursor-pointer p-4 rounded-2xl transition-all transform hover:-translate-y-0.5 border ${
                                    isSelected
                                        ? 'bg-gradient-to-r from-[#112D55] to-[#1e3a66] text-white shadow-lg border-transparent'
                                        : 'bg-white text-gray-700 hover:bg-slate-50 border-gray-100 small-box-shadow white'
                                }`}
                            >
                                <div className="flex items-center gap-3.5">
                                    <div
                                        className={`h-11 w-11 flex-shrink-0 flex items-center justify-center rounded-xl font-extrabold text-base transition-all ${
                                            isSelected
                                                ? 'bg-[#7F77FF] text-white shadow-inner'
                                                : item.hasContent
                                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                : 'bg-indigo-50 text-[#534DB4]'
                                        }`}
                                    >
                                        {item.day}
                                    </div>

                                    <div className="overflow-hidden flex-1">
                                        <div className="flex items-center justify-between gap-1 mb-0.5">
                                            <span
                                                className={`text-[11px] font-bold uppercase tracking-wider ${
                                                    isSelected ? 'text-indigo-200' : 'text-indigo-600'
                                                }`}
                                            >
                                                {item.weekStart} &bull; Day {item.day}
                                            </span>

                                            {item.hasContent ? (
                                                <span
                                                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                                                        isSelected
                                                            ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/40'
                                                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                    }`}
                                                >
                                                    <FiCheckCircle className="text-[10px]" /> Ready
                                                </span>
                                            ) : (
                                                <span
                                                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                                                        isSelected
                                                            ? 'bg-white/10 text-white/70'
                                                            : 'bg-gray-100 text-gray-500'
                                                    }`}
                                                >
                                                    <FiClock className="text-[10px]" /> Outline
                                                </span>
                                            )}
                                        </div>

                                        <h3
                                            className={`font-bold text-sm whitespace-nowrap overflow-hidden text-ellipsis ${
                                                isSelected ? 'text-white' : 'text-gray-900'
                                            }`}
                                        >
                                            {item.title}
                                        </h3>

                                        {item.achievement && (
                                            <p
                                                className={`text-[11px] whitespace-nowrap overflow-hidden text-ellipsis mt-0.5 ${
                                                    isSelected ? 'text-white/75' : 'text-gray-500'
                                                }`}
                                            >
                                                🎯 {item.achievement}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {displayedDays.length === 0 && (
                        <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-gray-300 text-gray-500 text-sm">
                            No lessons found for this week.
                        </div>
                    )}
                </div>

                {/* Right Content Area: Active Day Lesson Material */}
                <div className="lg:w-2/3 p-6 md:p-8 rounded-3xl bg-white text-black medium-box-shadow white border border-white/60">
                    {activeDayItem ? (
                        <div className="fade-in" key={activeDayItem.day}>
                            {/* Header Section */}
                            <div className="mb-8 border-b border-gray-100 pb-6">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#7F77FF] text-white">
                                        Day {activeDayItem.day}
                                    </span>
                                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                                        {activeDayItem.weekStart} &mdash; {activeDayItem.weekTitle}
                                    </span>
                                    {activeDayItem.hasContent ? (
                                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                                            <FiCheckCircle /> Verified Reading Content
                                        </span>
                                    ) : (
                                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                                            <FiCompass /> Roadmap Milestone Outline
                                        </span>
                                    )}
                                </div>

                                <h2 className="text-3xl md:text-4xl font-extrabold mb-3 font-[Plus_Jakarta_Sans] text-[#112D55] leading-tight">
                                    {activeDayItem.title}
                                </h2>

                                {activeDayItem.achievement && (
                                    <div className="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 p-3 rounded-2xl text-amber-900 text-sm font-semibold mt-3">
                                        <FiAward className="text-amber-600 text-lg flex-shrink-0" />
                                        <span>Target Milestone: {activeDayItem.achievement}</span>
                                    </div>
                                )}
                            </div>

                            {/* Material Sections if available */}
                            {activeDayItem.hasContent && activeDayItem.material.length > 0 ? (
                                <div className="flex flex-col gap-6">
                                    {activeDayItem.material.map((mat, i) => (
                                        <div
                                            key={i}
                                            className="p-6 md:p-8 rounded-3xl bg-slate-50/90 hover:bg-slate-50 transition-all border border-slate-200/60 shadow-sm"
                                        >
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="h-6 w-6 rounded-lg bg-[#7F77FF]/15 text-[#534DB4] text-xs font-bold flex items-center justify-center">
                                                    {i + 1}
                                                </span>
                                                <h3 className="text-xl md:text-2xl font-bold text-[#112D55]">
                                                    {mat.heading}
                                                </h3>
                                            </div>
                                            <p className="text-base md:text-lg leading-relaxed text-gray-700 whitespace-pre-line font-medium pl-8">
                                                {mat.learning_para}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                /* When Day is in Roadmap but Reading Material hasn't been generated yet */
                                <div className="flex flex-col gap-6">
                                    <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-50/60 to-purple-50/40 border border-indigo-100 flex flex-col gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-12 rounded-2xl bg-[#7F77FF]/15 text-[#534DB4] flex items-center justify-center text-2xl flex-shrink-0">
                                                <FiBookOpen />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-[#112D55]">
                                                    Curriculum Lesson Outline
                                                </h4>
                                                <p className="text-xs text-gray-500">
                                                    This topic is actively mapped to your course roadmap.
                                                </p>
                                            </div>
                                        </div>

                                        <p className="text-gray-700 text-base leading-relaxed">
                                            Today&apos;s curriculum focuses on <strong>{activeDayItem.title}</strong> as part of <strong>{activeDayItem.weekTitle}</strong>.
                                            {activeDayItem.achievement
                                                ? ` Upon completing this lesson, you will have ${activeDayItem.achievement}.`
                                                : " Detailed study notes and code samples are being compiled."}
                                        </p>

                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-indigo-100/80">
                                            <div className="text-xs text-gray-500">
                                                Want to generate or add custom reading notes for this day?
                                            </div>
                                            <button
                                                onClick={() => navigate("/dashboard/admin/material")}
                                                className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[#7F77FF] hover:bg-[#6C63FE] shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                                            >
                                                <FiEdit3 /> Open in Material Admin Studio
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="p-12 text-center text-gray-400">
                            Select a day from the left roadmap syllabus to start reading.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Learning;