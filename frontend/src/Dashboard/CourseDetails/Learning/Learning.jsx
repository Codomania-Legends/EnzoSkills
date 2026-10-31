import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useCourse } from '../../../Utility/Course';
import { useNavigate, useSearchParams } from 'react-router';
import {
    FiBookOpen,
    FiCheckCircle,
    FiClock,
    FiAward,
    FiArrowLeft,
    FiArrowRight,
    FiEdit3,
    FiCompass,
    FiCheck,
    FiCopy,
    FiSearch,
    FiX,
    FiHelpCircle,
    FiCheckSquare,
    FiZap,
    FiChevronRight,
    FiChevronDown
} from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { sileo } from 'sileo';
import { saveCourseProgress } from '../../../Utility/CourseProgressHelper';

// ─── Code Block Component with Syntax Highlighting and Copy Button ────────────
function CodeBlock({ language, value }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!value) return;
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative my-4 rounded-2xl overflow-hidden border border-slate-200/80 bg-[#1e1e2e] shadow-lg text-left">
            <div className="flex items-center justify-between px-4 py-2 bg-[#181825] border-b border-white/10 text-xs text-gray-300 select-none">
                <span className="font-mono uppercase tracking-wider text-[11px] text-[#9d95ff] font-semibold">
                    {language || "code"}
                </span>
                <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-gray-200 transition-all text-xs cursor-pointer focus:outline-none"
                >
                    {copied ? (
                        <>
                            <FiCheck className="text-emerald-400 text-sm" />
                            <span className="text-emerald-400 font-medium">Copied!</span>
                        </>
                    ) : (
                        <>
                            <FiCopy className="text-sm" />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            <div className="overflow-x-auto p-4 font-mono text-xs leading-relaxed custom-scrollbar bg-[#1e1e2e]">
                <SyntaxHighlighter
                    language={language || "text"}
                    style={vscDarkPlus}
                    customStyle={{
                        margin: 0,
                        padding: 0,
                        background: "transparent",
                        fontSize: "13px",
                        lineHeight: "1.6"
                    }}
                    wrapLongLines={true}
                >
                    {value}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}

function Learning() {
    const { currentCourse } = useCourse();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Filters & Navigation state
    const [selectedWeek, setSelectedWeek] = useState("all");
    const [selectedDayNumber, setSelectedDayNumber] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all"); // 'all', 'completed', 'pending'
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const searchContainerRef = useRef(null);
    const searchInputRef = useRef(null);

    // Auto-focus input when search expands
    useEffect(() => {
        if (isSearchExpanded && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchExpanded]);

    // Collapse search when clicking outside if search query is empty
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchContainerRef.current &&
                !searchContainerRef.current.contains(event.target) &&
                !searchQuery.trim()
            ) {
                setIsSearchExpanded(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [searchQuery]);

    const handleOpenSearch = () => {
        setIsSearchExpanded(true);
    };

    const handleCloseSearch = (e) => {
        e.stopPropagation();
        setSearchQuery("");
        setIsSearchExpanded(false);
    };

    const courseId = currentCourse?.course_id || currentCourse?._id || currentCourse?.id || 1;

    // Track completed days in LocalStorage keyed per course
    const [completedDays, setCompletedDays] = useState(() => {
        try {
            const stored = localStorage.getItem(`completed_days_${courseId}`);
            return stored ? JSON.parse(stored) : [1];
        } catch {
            return [1];
        }
    });

    // Sync completed days when courseId changes
    useEffect(() => {
        try {
            const stored = localStorage.getItem(`completed_days_${courseId}`);
            if (stored) {
                setCompletedDays(JSON.parse(stored));
            }
        } catch (e) {
            console.error("Failed to load completed days from localStorage", e);
        }
    }, [courseId]);

    // Toggle completion status for a day
    const toggleDayCompleted = (dayNum) => {
        setCompletedDays((prev) => {
            const isCompleted = prev.includes(dayNum);
            const updated = isCompleted ? prev.filter((d) => d !== dayNum) : [...prev, dayNum];
            try {
                localStorage.setItem(`completed_days_${courseId}`, JSON.stringify(updated));
            } catch (e) {
                console.error("Failed to save completed days", e);
            }
            if (!isCompleted) {
                sileo.success(`Day ${dayNum} marked as completed! 🎉`);
            } else {
                sileo.info(`Day ${dayNum} marked as in progress.`);
            }
            return updated;
        });
    };

    // ─── Build Consolidated List of Learning Days ─────────────────────────────
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
    const _availableWeeks = useMemo(() => {
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

    // Completed count
    const completedCount = useMemo(() => {
        return allLearningDays.filter((d) => completedDays.includes(d.day)).length;
    }, [allLearningDays, completedDays]);

    // Overall course progress
    const completionPercentage = useMemo(() => {
        if (!allLearningDays.length) return 0;
        return Math.round((completedCount / allLearningDays.length) * 100);
    }, [allLearningDays, completedCount]);

    // Next pending day to learn
    const nextPendingDay = useMemo(() => {
        return allLearningDays.find((d) => !completedDays.includes(d.day)) || null;
    }, [allLearningDays, completedDays]);

    // Sync completion percentage to LocalStorage & broadcast so Dashboard stays 100% in sync
    useEffect(() => {
        if (courseId) {
            saveCourseProgress(courseId, completionPercentage, completedDays);
        }
    }, [courseId, completionPercentage, completedDays]);

    // Filtered by active week, search query, and completion status
    const displayedDays = useMemo(() => {
        return allLearningDays.filter((d) => {
            // Week filter
            if (selectedWeek !== "all" && d.weekStart !== selectedWeek) {
                return false;
            }

            // Status filter
            const isDone = completedDays.includes(d.day);
            if (statusFilter === "completed" && !isDone) return false;
            if (statusFilter === "pending" && isDone) return false;

            // Search query filter
            if (searchQuery.trim()) {
                const query = searchQuery.toLowerCase();
                const titleMatch = d.title.toLowerCase().includes(query);
                const topicsMatch = d.topics?.toLowerCase().includes(query);
                const achieveMatch = d.achievement?.toLowerCase().includes(query);
                const contentMatch = d.material?.some((m) =>
                    m.heading?.toLowerCase().includes(query) || m.learning_para?.toLowerCase().includes(query)
                );
                return titleMatch || topicsMatch || achieveMatch || contentMatch;
            }

            return true;
        });
    }, [allLearningDays, selectedWeek, statusFilter, searchQuery, completedDays]);

    // Active day object
    const activeDayItem = useMemo(() => {
        const found = allLearningDays.find((d) => d.day === selectedDayNumber);
        return found || displayedDays[0] || allLearningDays[0] || null;
    }, [allLearningDays, selectedDayNumber, displayedDays]);

    // Estimated read time for active day
    const estimatedReadTime = useMemo(() => {
        if (!activeDayItem?.material || activeDayItem.material.length === 0) return "5 min read";
        const totalWords = activeDayItem.material.reduce((acc, curr) => {
            return acc + (curr.learning_para ? curr.learning_para.split(/\s+/).length : 0);
        }, 0);
        const minutes = Math.max(3, Math.ceil(totalWords / 130));
        return `~${minutes} min read`;
    }, [activeDayItem]);

    // Previous and Next day navigation calculation
    const currentIndex = useMemo(() => {
        return allLearningDays.findIndex((d) => d.day === activeDayItem?.day);
    }, [allLearningDays, activeDayItem]);

    const prevDay = currentIndex > 0 ? allLearningDays[currentIndex - 1] : null;
    const nextDay = currentIndex < allLearningDays.length - 1 ? allLearningDays[currentIndex + 1] : null;

    const handlePrevDay = () => {
        if (prevDay) {
            setSelectedDayNumber(prevDay.day);
            if (prevDay.weekStart && selectedWeek !== "all" && selectedWeek !== prevDay.weekStart) {
                setSelectedWeek(prevDay.weekStart);
            }
        }
    };

    const handleNextDay = () => {
        if (nextDay) {
            setSelectedDayNumber(nextDay.day);
            if (nextDay.weekStart && selectedWeek !== "all" && selectedWeek !== nextDay.weekStart) {
                setSelectedWeek(nextDay.weekStart);
            }
        }
    };

    const handleCompleteAndNext = () => {
        if (activeDayItem && !completedDays.includes(activeDayItem.day)) {
            toggleDayCompleted(activeDayItem.day);
        }
        if (nextDay) {
            handleNextDay();
        }
    };

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

    // ─── Header Dropdown State & Click-Outside Handler ──────────────────────────
    const [isDayDropdownOpen, setIsDayDropdownOpen] = useState(false);
    const dayDropdownRef = useRef(null);
    const [dropdownActiveWeek, setDropdownActiveWeek] = useState("Week 1");

    // All available weeks
    const allWeeks = useMemo(() => {
        const list = [];
        allLearningDays.forEach((d) => {
            if (d.weekStart && !list.includes(d.weekStart)) {
                list.push(d.weekStart);
            }
        });
        return list;
    }, [allLearningDays]);

    // Keep dropdownActiveWeek synced with activeDayItem
    useEffect(() => {
        if (activeDayItem?.weekStart) {
            setDropdownActiveWeek(activeDayItem.weekStart);
        }
    }, [activeDayItem]);

    // Days in dropdown active week
    const daysInDropdownWeek = useMemo(() => {
        return allLearningDays.filter((d) => d.weekStart === dropdownActiveWeek);
    }, [allLearningDays, dropdownActiveWeek]);

    // Close header dropdown on outside click or Escape
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dayDropdownRef.current && !dayDropdownRef.current.contains(e.target)) {
                setIsDayDropdownOpen(false);
            }
        };
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setIsDayDropdownOpen(false);
            }
        };
        if (isDayDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isDayDropdownOpen]);

    // ─── Sidebar Week Accordion Groups ──────────────────────────────────────────
    const weekGroups = useMemo(() => {
        const groups = {};
        displayedDays.forEach((item) => {
            const wKey = item.weekStart || "Week 1";
            if (!groups[wKey]) {
                groups[wKey] = {
                    weekStart: wKey,
                    weekTitle: item.weekTitle || "Core Curriculum",
                    days: []
                };
            }
            groups[wKey].days.push(item);
        });
        return Object.values(groups);
    }, [displayedDays]);

    const [expandedWeeks, setExpandedWeeks] = useState({ "Week 1": true });

    // Auto-expand the active day's week
    useEffect(() => {
        if (activeDayItem?.weekStart) {
            setExpandedWeeks(prev => ({
                ...prev,
                [activeDayItem.weekStart]: true
            }));
        }
    }, [activeDayItem]);

    const toggleWeekExpanded = (wKey) => {
        setExpandedWeeks(prev => ({
            ...prev,
            [wKey]: !prev[wKey]
        }));
    };

    if (!currentCourse) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
                <div className="h-12 w-12 rounded-full border-4 border-[#7F77FF]/30 border-t-[#7F77FF] animate-spin"></div>
                <div className="text-xl font-bold text-[#7F77FF]">Loading course curriculum... ⏳</div>
            </div>
        );
    }

    const isActiveDayCompleted = activeDayItem ? completedDays.includes(activeDayItem.day) : false;

    return (
        <div className="w-full h-full flex flex-col box-border px-3 sm:px-6 md:px-8 py-4 overflow-y-auto custom-scrollbar">
            {/* ─── Top Header with Heading & Filter/Search Controls on Right ─── */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-16 mt-4">
                <div className="flex items-center gap-3.5 flex-shrink-0">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2.5 rounded-2xl transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-95 flex items-center justify-center flex-shrink-0 small-box-shadow white"
                        title="Go Back"
                    >
                        <FiArrowLeft className="h-4 w-4" />
                    </button>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold font-[Plus_Jakarta_Sans] text-gray-900 tracking-tight flex items-center gap-2.5">
                            <span>Daily Learning Curriculum</span>
                            {searchQuery && (
                                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center gap-1 font-sans">
                                    &ldquo;{searchQuery}&rdquo;
                                </span>
                            )}
                        </h1>
                    </div>
                </div>

                {/* Right side: Expandable Search + Status Filter Boxes & Reset Action */}
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-start lg:justify-end">
                    {/* Expandable Search Box positioned right before the filters */}
                    <div
                        ref={searchContainerRef}
                        className={`relative transition-all duration-300 ease-in-out flex items-center ${
                            isSearchExpanded || searchQuery
                                ? 'w-56 sm:w-64 md:w-72'
                                : 'w-11'
                        }`}
                    >
                        {!isSearchExpanded && !searchQuery ? (
                            <div
                                onClick={handleOpenSearch}
                                className="w-11 h-11 rounded-xl small-box-shadow white flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-95 text-gray-700 hover:text-[#7F77FF]"
                                title="Search lessons"
                            >
                                <FiSearch className="text-base" />
                            </div>
                        ) : (
                            <div className="relative w-full flex items-center">
                                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-base z-10 pointer-events-none" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search lessons..."
                                    className="w-full h-11 pl-10 pr-9 text-sm rounded-xl text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#7F77FF]/30 transition-all outline-none small-box-shadow white"
                                />
                                <button
                                    type="button"
                                    onClick={handleCloseSearch}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer z-10 flex items-center justify-center"
                                    title="Clear & close search"
                                >
                                    <FiX className="text-sm" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* All */}
                    <div
                        onClick={() => setStatusFilter("all")}
                        className={`h-11 px-4 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 text-xs sm:text-sm font-bold small-box-shadow hover:scale-[1.02] active:scale-95 ${
                            statusFilter === "all"
                                ? 'blue text-white'
                                : 'white text-gray-700'
                        }`}
                    >
                        <span>All</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                            statusFilter === "all" ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                            {allLearningDays.length}
                        </span>
                    </div>

                    {/* Done */}
                    <div
                        onClick={() => setStatusFilter("completed")}
                        className={`h-11 px-4 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 text-xs sm:text-sm font-bold small-box-shadow hover:scale-[1.02] active:scale-95 ${
                            statusFilter === "completed"
                                ? 'blue text-white'
                                : 'white text-gray-700'
                        }`}
                    >
                        <FiCheck className="text-xs stroke-[3]" />
                        <span>Done</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                            statusFilter === "completed" ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                            {completedCount}
                        </span>
                    </div>

                    {/* To Do */}
                    <div
                        onClick={() => setStatusFilter("pending")}
                        className={`h-11 px-4 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 text-xs sm:text-sm font-bold small-box-shadow hover:scale-[1.02] active:scale-95 ${
                            statusFilter === "pending"
                                ? 'blue text-white'
                                : 'white text-gray-700'
                        }`}
                    >
                        <FiClock className="text-xs" />
                        <span>To Do</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                            statusFilter === "pending" ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                            {allLearningDays.length - completedCount}
                        </span>
                    </div>

                    {/* Reset button if filter is active */}
                    {(selectedWeek !== "all" || searchQuery || statusFilter !== "all") && (
                        <div
                            onClick={() => {
                                setSelectedWeek("all");
                                setSearchQuery("");
                                setStatusFilter("all");
                                setIsSearchExpanded(false);
                            }}
                            className="h-11 px-3.5 rounded-xl text-xs font-bold text-red-500 hover:text-red-600 small-box-shadow white transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap hover:scale-[1.02] active:scale-95"
                            title="Reset all active filters"
                        >
                            <FiX className="text-sm" />
                            <span>Reset</span>
                        </div>
                    )}
                </div>
            </div>

            {/* ─── Main Two-Column Learning Grid ───────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
                {/* ─── Left Sidebar: Curriculum Syllabus (35%) ─────────────────── */}
                <div className="lg:col-span-5 xl:col-span-4 rounded-3xl bg-white text-gray-900 small-box-shadow white  p-4 sm:p-5 flex flex-col min-h-[580px] ">
                    {/* ── Pinned Syllabus Card Header ── */}
                    <div className="pb-3.5 mb-2 border-b border-gray-300 flex-shrink-0">
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                            <div className="flex items-center gap-2.5">
                                <div className="h-9 w-9 rounded-xl bg-[#7F77FF]/10 text-[#534DB4] flex items-center justify-center flex-shrink-0">
                                    <FiBookOpen className="text-base" />
                                </div>
                                <div>
                                    <h2 className="font-extrabold text-sm sm:text-base font-[Plus_Jakarta_Sans] text-gray-900 leading-tight">
                                        Curriculum Syllabus
                                    </h2>
                                    <p className="text-[11px] text-gray-500 font-medium">
                                        {displayedDays.length} of {allLearningDays.length} lessons shown
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-bold flex-shrink-0">
                                <FiCheckCircle className="text-xs text-emerald-600" />
                                <span>{completedCount}/{allLearningDays.length}</span>
                            </div>
                        </div>

                        {/* Progress Bar & Status */}
                        <div className="w-full">
                            <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500 mb-1">
                                <span>Course Completion</span>
                                <span className="font-bold text-[#534DB4]">{completionPercentage}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-[#7F77FF] to-[#534DB4] rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${completionPercentage}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* ── Scrollable Lesson List Grouped by Week ── */}
                    <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar min-h-0">
                        {weekGroups.map((group) => {
                            const isWeekOpen = Boolean(searchQuery.trim() || expandedWeeks[group.weekStart]);
                            const completedInWeek = group.days.filter((d) => completedDays.includes(d.day)).length;

                            return (
                                <div
                                    key={group.weekStart}
                                    className="rounded-2xl border border-gray-100/90 overflow-hidden bg-slate-50/50 transition-all duration-200"
                                >
                                    {/* Week Accordion Header */}
                                    <div
                                        onClick={() => toggleWeekExpanded(group.weekStart)}
                                        className="px-3.5 py-2.5 flex items-center justify-between cursor-pointer hover:bg-slate-100/80 transition-colors select-none"
                                    >
                                        <div className="flex items-center gap-2 min-w-0">
                                            <span className="text-xs font-extrabold text-gray-900 font-[Plus_Jakarta_Sans]">
                                                {group.weekStart}
                                            </span>
                                            <span className="text-gray-300">&bull;</span>
                                            <span className="text-[11px] text-gray-500 truncate font-medium">
                                                {group.weekTitle}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-gray-600 border border-gray-200">
                                                {completedInWeek}/{group.days.length}
                                            </span>
                                            <FiChevronDown className={`text-xs text-gray-400 transition-transform duration-200 ${isWeekOpen ? 'rotate-180 text-[#7F77FF]' : ''}`} />
                                        </div>
                                    </div>

                                    {/* Days List within this Week */}
                                    {isWeekOpen && (
                                        <div className="p-2 pt-1 space-y-2 bg-white/60 border-t border-gray-100/60">
                                            {group.days.map((item) => {
                                                const isSelected = activeDayItem?.day === item.day;
                                                const isDone = completedDays.includes(item.day);

                                                return (
                                                    <div
                                                        key={item.day}
                                                        onClick={() => setSelectedDayNumber(item.day)}
                                                        className={`group cursor-pointer p-2.5 sm:p-3 rounded-xl transition-all duration-200 border relative flex items-center gap-3 ${
                                                            isSelected
                                                                ? 'bg-indigo-50/80 text-gray-900 border-[#7F77FF] shadow-xs ring-1 ring-[#7F77FF]/30'
                                                                : 'bg-white text-gray-700 hover:bg-slate-50/80 hover:border-indigo-100/80 border-gray-100/90 small-box-shadow white'
                                                        }`}
                                                    >
                                                        {/* Left accent line indicator when active */}
                                                        {isSelected && (
                                                            <div className="absolute left-0 top-2.5 bottom-2.5 w-1 bg-[#7F77FF] rounded-r-full" />
                                                        )}

                                                        {/* Day Badge */}
                                                        <div
                                                            className={`h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 flex items-center justify-center rounded-xl font-extrabold text-xs sm:text-sm transition-all duration-200 ${
                                                                isDone
                                                                    ? 'bg-emerald-500 text-white shadow-xs'
                                                                    : isSelected
                                                                    ? 'bg-[#7F77FF] text-white shadow-xs'
                                                                    : 'bg-slate-100 text-slate-700 group-hover:bg-[#7F77FF]/10 group-hover:text-[#534DB4]'
                                                            }`}
                                                        >
                                                            {isDone ? (
                                                                <FiCheck className="text-base stroke-[3]" />
                                                            ) : (
                                                                <span className="font-mono text-xs">{item.day}</span>
                                                            )}
                                                        </div>

                                                        {/* Content Info */}
                                                        <div className="overflow-hidden flex-1 min-w-0">
                                                            {/* Top Tag Row */}
                                                            <div className="flex items-center justify-between gap-1 mb-0.5">
                                                                <span
                                                                    className={`text-[9px] font-extrabold uppercase tracking-wider ${
                                                                        isSelected ? 'text-[#534DB4]' : 'text-gray-400'
                                                                    }`}
                                                                >
                                                                    Day {item.day}
                                                                </span>

                                                                {isDone ? (
                                                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1 flex-shrink-0">
                                                                        Done
                                                                    </span>
                                                                ) : isSelected ? (
                                                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#7F77FF]/15 text-[#534DB4] flex items-center gap-1 flex-shrink-0">
                                                                        Active
                                                                    </span>
                                                                ) : item.hasContent ? (
                                                                    <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 flex-shrink-0">
                                                                        Ready
                                                                    </span>
                                                                ) : null}
                                                            </div>

                                                            {/* Lesson Title */}
                                                            <h3
                                                                className={`font-bold text-xs sm:text-sm line-clamp-2 leading-snug transition-colors ${
                                                                    isSelected
                                                                        ? 'text-gray-900 font-extrabold'
                                                                        : 'text-gray-800 group-hover:text-[#534DB4]'
                                                                }`}
                                                                title={item.title}
                                                            >
                                                                {item.title}
                                                            </h3>

                                                            {/* Achievement / Key Topic */}
                                                            {item.achievement && (
                                                                <p
                                                                    className="text-[10px] line-clamp-1 text-gray-500 mt-0.5 flex items-center gap-1"
                                                                    title={item.achievement}
                                                                >
                                                                    <span className="text-xs">🎯</span>
                                                                    <span className="truncate">{item.achievement}</span>
                                                                </p>
                                                            )}
                                                        </div>

                                                        {/* Right chevron indicator */}
                                                        <div
                                                            className={`flex-shrink-0 pl-1 transition-transform duration-200 ${
                                                                isSelected
                                                                    ? 'text-[#7F77FF] translate-x-0.5'
                                                                    : 'text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5'
                                                            }`}
                                                        >
                                                            <FiChevronRight className="text-sm" />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {/* Empty Search/Filter State */}
                        {displayedDays.length === 0 && (
                            <div className="py-12 px-4 text-center bg-slate-50/60 rounded-2xl border border-dashed border-gray-200 text-gray-500 text-sm flex flex-col items-center justify-center gap-2.5 h-full">
                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                    <FiCompass className="text-xl" />
                                </div>
                                <div className="font-semibold text-gray-700">No lessons match your filter</div>
                                <p className="text-xs text-gray-400 max-w-xs">
                                    Try adjusting your search terms or filter selection.
                                </p>
                                <button
                                    onClick={() => {
                                        setSelectedWeek("all");
                                        setSearchQuery("");
                                        setStatusFilter("all");
                                        setIsSearchExpanded(false);
                                    }}
                                    className="mt-1 px-3 py-1.5 rounded-xl bg-white text-xs font-bold text-[#7F77FF] border border-gray-200 small-box-shadow hover:scale-105 active:scale-95 transition-all cursor-pointer"
                                >
                                    Reset all filters
                                </button>
                            </div>
                        )}
                    </div>

                    {/* ── Pinned Card Footer ── */}
                    {nextPendingDay && (
                        <div className="pt-3 mt-2 border-t border-gray-100 flex items-center justify-between gap-2 flex-shrink-0 text-xs">
                            <div className="text-gray-500 truncate">
                                <span className="font-medium text-gray-400">Next to learn: </span>
                                <span className="font-bold text-gray-800">Day {nextPendingDay.day}</span>
                            </div>
                            <button
                                onClick={() => setSelectedDayNumber(nextPendingDay.day)}
                                className="flex items-center gap-1 font-bold text-[#534DB4] hover:text-[#7F77FF] hover:underline flex-shrink-0 cursor-pointer transition-colors"
                            >
                                <span>Go to Day {nextPendingDay.day}</span>
                                <FiArrowRight className="text-xs" />
                            </button>
                        </div>
                    )}
                    {!nextPendingDay && allLearningDays.length > 0 && (
                        <div className="pt-3 mt-2 border-t border-gray-100 flex items-center justify-center gap-1.5 flex-shrink-0 text-xs text-emerald-600 font-bold">
                            <FiAward className="text-sm" />
                            <span>Course 100% Completed! Outstanding! 🌟</span>
                        </div>
                    )}
                </div>

                {/* ─── Right Reading Studio: Active Day Material (65%) ─────────── */}
                <div className="lg:col-span-7 xl:col-span-8 p-6 sm:p-8 md:p-10 rounded-3xl bg-white text-gray-900 medium-box-shadow white relative">
                    {activeDayItem ? (
                        <div className="fade-in" key={activeDayItem.day}>
                            {/* ── Header Metadata & Tags ── */}
                            <div className="mb-6 border-b border-gray-100 pb-6">
                                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                                    <div className="flex flex-wrap items-center gap-2 relative" ref={dayDropdownRef}>
                                        {/* Interactive Day & Week Selector Dropdown Button */}
                                        <button
                                            type="button"
                                            onClick={() => setIsDayDropdownOpen(!isDayDropdownOpen)}
                                            className="group inline-flex items-center gap-2 p-1 pl-1.5 pr-3 rounded-2xl bg-indigo-50/70 hover:bg-indigo-100/80 border border-indigo-200/70 transition-all cursor-pointer shadow-xs hover:shadow-sm select-none"
                                            title="Click to view all days for this week and switch topics"
                                        >
                                            <span className="text-xs font-extrabold px-2.5 py-1 rounded-xl bg-[#7F77FF] text-white shadow-xs group-hover:scale-105 transition-transform flex items-center gap-1">
                                                <span>Day {activeDayItem.day}</span>
                                            </span>
                                            <span className="text-xs font-bold text-gray-800 group-hover:text-[#534DB4] transition-colors flex items-center gap-1.5">
                                                <span>{activeDayItem.weekStart} &mdash; {activeDayItem.weekTitle}</span>
                                                <FiChevronDown className={`text-xs text-gray-500 group-hover:text-[#534DB4] transition-transform duration-200 ${isDayDropdownOpen ? 'rotate-180 text-[#7F77FF]' : ''}`} />
                                            </span>
                                        </button>

                                        <span className="text-xs font-medium px-2.5 py-1 rounded-xl bg-gray-100 text-gray-600 flex items-center gap-1">
                                            <FiClock className="text-gray-500" /> {estimatedReadTime}
                                        </span>

                                        {/* Floating Dropdown - appears right here! */}
                                        {isDayDropdownOpen && (
                                            <div className="absolute top-full left-0 mt-2 w-80 sm:w-96 max-w-[92vw] bg-white rounded-2xl medium-box-shadow white border border-gray-100 p-3.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                                                {/* Dropdown Header */}
                                                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-gray-100">
                                                    <div>
                                                        <h4 className="text-xs font-extrabold text-gray-900 font-[Plus_Jakarta_Sans] leading-tight">
                                                            {dropdownActiveWeek} Daily Schedule
                                                        </h4>
                                                        <p className="text-[11px] text-gray-500">
                                                            Click any day to jump to its topic
                                                        </p>
                                                    </div>
                                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                                                        {daysInDropdownWeek.length} Days
                                                    </span>
                                                </div>

                                                {/* Week Switcher Tabs if multiple weeks exist */}
                                                {allWeeks.length > 1 && (
                                                    <div className="flex items-center gap-1 mb-2.5 overflow-x-auto pb-1 custom-scrollbar">
                                                        {allWeeks.map((w) => (
                                                            <button
                                                                key={w}
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setDropdownActiveWeek(w);
                                                                }}
                                                                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                                                                    dropdownActiveWeek === w
                                                                        ? 'bg-[#7F77FF] text-white shadow-xs'
                                                                        : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
                                                                }`}
                                                            >
                                                                {w}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Days List for the selected week: Day 1, Day 2, Day 3, Day 4, Day 5 */}
                                                <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
                                                    {daysInDropdownWeek.map((d) => {
                                                        const isCurrent = activeDayItem.day === d.day;
                                                        const isDone = completedDays.includes(d.day);

                                                        return (
                                                            <div
                                                                key={d.day}
                                                                onClick={() => {
                                                                    setSelectedDayNumber(d.day);
                                                                    setIsDayDropdownOpen(false);
                                                                }}
                                                                className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 border ${
                                                                    isCurrent
                                                                        ? 'bg-indigo-50/90 border-[#7F77FF] text-gray-900 shadow-xs ring-1 ring-[#7F77FF]/20'
                                                                        : 'bg-white hover:bg-slate-50 border-gray-100 text-gray-700'
                                                                }`}
                                                            >
                                                                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                                                    <div
                                                                        className={`h-8 w-8 rounded-lg flex items-center justify-center font-extrabold text-xs flex-shrink-0 ${
                                                                            isDone
                                                                                ? 'bg-emerald-500 text-white'
                                                                                : isCurrent
                                                                                ? 'bg-[#7F77FF] text-white'
                                                                                : 'bg-slate-100 text-slate-700'
                                                                        }`}
                                                                    >
                                                                        {isDone ? <FiCheck className="text-xs stroke-[3]" /> : d.day}
                                                                    </div>
                                                                    <div className="min-w-0 flex-1">
                                                                        <p className={`text-xs font-bold truncate ${isCurrent ? 'text-gray-900 font-extrabold' : 'text-gray-800'}`}>
                                                                            Day {d.day}: {d.title}
                                                                        </p>
                                                                        <p className="text-[10px] text-gray-400 truncate">
                                                                            {d.topics || d.achievement}
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                <div className="flex-shrink-0 flex items-center gap-1.5">
                                                                    {isDone && (
                                                                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                                                                            Done
                                                                        </span>
                                                                    )}
                                                                    {isCurrent && (
                                                                        <span className="text-[10px] font-bold text-[#534DB4] bg-indigo-100/70 px-2 py-0.5 rounded-md">
                                                                            Active
                                                                        </span>
                                                                    )}
                                                                    <FiChevronRight className={`text-xs ${isCurrent ? 'text-[#7F77FF]' : 'text-gray-300'}`} />
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Ribbon: Completed Toggle */}
                                    <button
                                        onClick={() => toggleDayCompleted(activeDayItem.day)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-95 ${
                                            isActiveDayCompleted
                                                ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                                                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
                                        }`}
                                    >
                                        <FiCheckCircle className={`text-sm ${isActiveDayCompleted ? 'text-white' : 'text-gray-400'}`} />
                                        <span>{isActiveDayCompleted ? 'Completed ✓' : 'Mark as Done'}</span>
                                    </button>
                                </div>

                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 font-[Plus_Jakarta_Sans] text-[#112D55] leading-tight tracking-tight">
                                    {activeDayItem.title}
                                </h2>

                                {activeDayItem.achievement && (
                                    <div className="flex items-center gap-2.5 bg-gradient-to-r from-amber-50/90 to-orange-50/60 border border-amber-200/80 p-3.5 rounded-2xl text-amber-900 text-xs sm:text-sm font-semibold mt-3">
                                        <FiAward className="text-amber-600 text-xl flex-shrink-0" />
                                        <span>Target Milestone: {activeDayItem.achievement}</span>
                                    </div>
                                )}

                                {/* Quick Tools Toolbar */}
                                <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-gray-100 text-xs text-gray-600">
                                    <button
                                        onClick={() => navigate('/dashboard/courses/assessment/')}
                                        className="flex items-center gap-1.5 text-indigo-600 font-bold hover:text-indigo-800 transition-colors cursor-pointer"
                                    >
                                        <FiCheckSquare /> Take Topic Quiz
                                    </button>
                                    <span className="text-gray-300">&bull;</span>
                                    <button
                                        onClick={() => navigate('/dashboard/courses/doubts/')}
                                        className="flex items-center gap-1.5 text-purple-600 font-bold hover:text-purple-800 transition-colors cursor-pointer"
                                    >
                                        <FiHelpCircle /> Ask a Doubt
                                    </button>
                                    <span className="text-gray-300">&bull;</span>
                                    <button
                                        onClick={() => navigate('/dashboard/courses/roadmap/')}
                                        className="flex items-center gap-1.5 text-gray-600 font-bold hover:text-gray-900 transition-colors cursor-pointer"
                                    >
                                        <FiCompass /> View in Roadmap
                                    </button>
                                </div>
                            </div>

                            {/* ── Content Sections ── */}
                            {activeDayItem.hasContent && activeDayItem.material.length > 0 ? (
                                <div className="flex flex-col gap-6">
                                    {activeDayItem.material.map((mat, i) => (
                                        <div
                                            key={i}
                                            className="p-6 md:p-8 rounded-3xl bg-slate-50/70 hover:bg-slate-50 transition-all border border-slate-200/60 shadow-sm"
                                        >
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="h-7 w-7 rounded-xl bg-[#7F77FF]/15 text-[#534DB4] text-xs font-extrabold flex items-center justify-center flex-shrink-0">
                                                    {i + 1}
                                                </span>
                                                <h3 className="text-xl md:text-2xl font-bold text-[#112D55] tracking-tight">
                                                    {mat.heading}
                                                </h3>
                                            </div>

                                            <div className="prose prose-slate max-w-none text-gray-700 leading-relaxed text-sm md:text-base font-medium pl-0 sm:pl-10">
                                                <ReactMarkdown
                                                    remarkPlugins={[remarkGfm]}
                                                    components={{
                                                        code({ inline, className, children, ...props }) {
                                                            const match = /language-(\w+)/.exec(className || '');
                                                            return !inline && match ? (
                                                                <CodeBlock
                                                                    language={match[1]}
                                                                    value={String(children).replace(/\n$/, '')}
                                                                />
                                                            ) : (
                                                                <code
                                                                    className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded text-xs font-mono font-semibold"
                                                                    {...props}
                                                                >
                                                                    {children}
                                                                </code>
                                                            );
                                                        }
                                                    }}
                                                >
                                                    {mat.learning_para}
                                                </ReactMarkdown>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                /* ── Milestone Outline Card (When reading notes aren't compiled yet) ── */
                                <div className="flex flex-col gap-6">
                                    <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-50/70 via-purple-50/30 to-white border border-indigo-100 flex flex-col gap-4 shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-12 rounded-2xl bg-[#7F77FF]/15 text-[#534DB4] flex items-center justify-center text-2xl flex-shrink-0">
                                                <FiBookOpen />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-[#112D55]">
                                                    Curriculum Milestone Blueprint
                                                </h4>
                                                <p className="text-xs text-gray-500">
                                                    Mapped directly to your active course roadmap syllabus.
                                                </p>
                                            </div>
                                        </div>

                                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                                            Today&apos;s curriculum focuses on <strong>{activeDayItem.title}</strong> as part of <strong>{activeDayItem.weekTitle}</strong>.
                                            {activeDayItem.achievement
                                                ? ` Upon mastering this milestone, you will have ${activeDayItem.achievement}.`
                                                : " Review key foundational topics and practice the assessment to reinforce your understanding."}
                                        </p>

                                        {activeDayItem.topics && (
                                            <div className="bg-white/80 p-4 rounded-2xl border border-indigo-100/60">
                                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                                                    Core Competencies Today:
                                                </span>
                                                <span className="text-sm font-semibold text-gray-800">
                                                    {activeDayItem.topics}
                                                </span>
                                            </div>
                                        )}

                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-indigo-100/80">
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <FiZap className="text-amber-500" />
                                                <span>Prepare for this topic using the interactive Studio.</span>
                                            </div>
                                            <button
                                                onClick={() => navigate("/dashboard/admin/material")}
                                                className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[#7F77FF] hover:bg-[#6C63FE] shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95"
                                            >
                                                <FiEdit3 /> Open in Material Studio
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ── Bottom LMS Navigation Bar ── */}
                            <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                                {prevDay ? (
                                    <button
                                        onClick={handlePrevDay}
                                        className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-gray-700 border border-gray-200 small-box-shadow white transition-all text-xs font-bold flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95"
                                    >
                                        <FiArrowLeft /> Previous: Day {prevDay.day}
                                    </button>
                                ) : (
                                    <div className="hidden sm:block" />
                                )}

                                <button
                                    onClick={handleCompleteAndNext}
                                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#7F77FF] hover:bg-[#6C63FE] text-white shadow-lg shadow-[#7F77FF]/20 transition-all text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95"
                                >
                                    <FiCheckCircle className="text-base" />
                                    <span>{nextDay ? 'Complete & Next Day →' : 'Complete Course Milestone! 🎉'}</span>
                                </button>

                                {nextDay ? (
                                    <button
                                        onClick={handleNextDay}
                                        className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-gray-700 border border-gray-200 small-box-shadow white transition-all text-xs font-bold flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95"
                                    >
                                        Next: Day {nextDay.day} <FiArrowRight />
                                    </button>
                                ) : (
                                    <div className="hidden sm:block" />
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="p-16 text-center text-gray-400 flex flex-col items-center justify-center gap-3">
                            <FiBookOpen className="text-3xl text-gray-300" />
                            <span className="text-sm">Select a day from the curriculum syllabus to start reading.</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Learning;
