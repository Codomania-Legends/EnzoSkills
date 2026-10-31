/**
 * Utility functions to manage and calculate real-time course progress across EnzoSkills.
 * Bridges LocalStorage curriculum progress with Dashboard overviews.
 */

/**
 * Returns the array of possible identifier strings/numbers for a given course.
 */
export function getCourseIdentifiers(course) {
    if (!course) return [];
    if (typeof course === 'string' || typeof course === 'number') {
        return [String(course), course];
    }
    const ids = [];
    if (course.course_id !== undefined && course.course_id !== null) {
        ids.push(String(course.course_id), course.course_id);
    }
    if (course._id !== undefined && course._id !== null) {
        ids.push(String(course._id));
    }
    if (course.id !== undefined && course.id !== null) {
        ids.push(String(course.id), course.id);
    }
    return Array.from(new Set(ids));
}

/**
 * Retrieves the count of completed curriculum days from LocalStorage for a course.
 */
export function getCompletedDaysCount(course) {
    if (!course) return 0;
    const ids = getCourseIdentifiers(course);

    for (const id of ids) {
        try {
            const raw = localStorage.getItem(`completed_days_${id}`);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) {
                    return parsed.length;
                }
            }
        } catch {
            // Ignore JSON parsing errors
        }
    }

    // Fallback: check fallback key 'completed_days_1' if course has id 1 or name matches default
    try {
        const rawDefault = localStorage.getItem('completed_days_1');
        if (rawDefault && (ids.includes('1') || ids.includes(1) || ids.length === 0)) {
            const parsed = JSON.parse(rawDefault);
            if (Array.isArray(parsed)) return parsed.length;
        }
    } catch {}

    return 0;
}

/**
 * Calculates or retrieves the exact progress percentage for a course.
 * Priority:
 * 1. Saved `course_progress_<id>` in LocalStorage
 * 2. Dynamically computed from `completed_days_<id>` / total syllabus days
 * 3. Course / User explicit progress properties (if > 0)
 * 4. Fallback default
 */
export function getCourseProgress(course, fallbackTotalDays = 20) {
    if (!course) return 0;
    const ids = getCourseIdentifiers(course);

    // 1. Direct saved progress in localStorage
    for (const id of ids) {
        try {
            const saved = localStorage.getItem(`course_progress_${id}`);
            if (saved !== null && saved !== undefined && saved !== "") {
                const parsed = Number(saved);
                if (!isNaN(parsed) && parsed >= 0) {
                    return parsed;
                }
            }
        } catch {}
    }

    // 2. Compute dynamically from completed_days in localStorage
    for (const id of ids) {
        try {
            const rawDays = localStorage.getItem(`completed_days_${id}`);
            if (rawDays) {
                const days = JSON.parse(rawDays);
                if (Array.isArray(days) && days.length > 0) {
                    const totalDays = (Array.isArray(course.roadmap) && course.roadmap.length > 0)
                        ? course.roadmap.length
                        : (Array.isArray(course.daywise_material) && course.daywise_material.length > 0)
                        ? course.daywise_material.length
                        : fallbackTotalDays;

                    return Math.min(100, Math.round((days.length / totalDays) * 100));
                }
            }
        } catch {}
    }

    // 3. Check fallback key 'completed_days_1'
    if (ids.includes('1') || ids.includes(1) || ids.length === 0) {
        try {
            const rawDays = localStorage.getItem('completed_days_1');
            if (rawDays) {
                const days = JSON.parse(rawDays);
                if (Array.isArray(days) && days.length > 0) {
                    const totalDays = (Array.isArray(course.roadmap) && course.roadmap.length > 0)
                        ? course.roadmap.length
                        : (Array.isArray(course.daywise_material) && course.daywise_material.length > 0)
                        ? course.daywise_material.length
                        : fallbackTotalDays;
                    return Math.min(100, Math.round((days.length / totalDays) * 100));
                }
            }
        } catch {}
    }

    // 4. Fallback to course progress properties if > 0
    if (typeof course.progress_percentage === 'number' && course.progress_percentage > 0) {
        return course.progress_percentage;
    }
    if (typeof course.progress === 'number' && course.progress > 0) {
        return course.progress;
    }

    return 0;
}

/**
 * Persists course progress to LocalStorage and notifies other dashboard components.
 */
export function saveCourseProgress(courseId, percentage, completedDays = null) {
    if (!courseId && courseId !== 0) return;

    try {
        localStorage.setItem(`course_progress_${courseId}`, String(percentage));
        if (completedDays && Array.isArray(completedDays)) {
            localStorage.setItem(`completed_days_${courseId}`, JSON.stringify(completedDays));
        }

        // Broadcast to other components in the same window
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('course_progress_updated', {
                detail: { courseId, progress: percentage }
            }));
        }
    } catch (e) {
        console.error("Failed to persist course progress to localStorage", e);
    }
}

/**
 * Computes average progress across all active courses.
 */
export function getOverallAverageProgress(coursesList = []) {
    if (!Array.isArray(coursesList) || coursesList.length === 0) return 0;

    let total = 0;
    coursesList.forEach((course) => {
        total += getCourseProgress(course);
    });

    return Math.round(total / coursesList.length);
}

