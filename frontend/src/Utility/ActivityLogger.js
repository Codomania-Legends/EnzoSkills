import axios from "axios";
import Cookies from "js-cookie";

/**
 * Universal Activity Tracker for EnzoSkills.
 * Logs one of the 7 core user actions to the backend database
 * and notifies ActivityGraph to immediately refresh and animate.
 * 
 * Action types:
 * 1. COURSE_ENROLL   -> When enrolling in any course
 * 2. LESSON_LEARN     -> When completing a lesson / day
 * 3. ASSESSMENT_GIVEN -> When giving an assessment
 * 4. AI_LEARN         -> When asking or learning with AI
 * 5. LIBRARY_CLICK    -> When clicking books/videos in Library
 * 6. ROOM_CREATE      -> When creating a study room
 * 7. PROJECT_CREATE   -> When creating a project
 */
export async function trackUserAction(actionType, actionTitle, actionDescription = "") {
    const userId = Cookies.get("user_id");
    
    // Broadcast live event immediately so graph reacts with 0ms delay
    if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("user_activity_updated", {
            detail: { actionType, actionTitle }
        }));
        window.dispatchEvent(new CustomEvent("course_progress_updated", {}));
    }

    if (!userId) return;

    try {
        await axios.post("http://localhost:3000/user/activity/log", {
            user_id: userId,
            action_type: actionType,
            action_title: actionTitle,
            action_description: actionDescription || actionTitle
        });
    } catch (err) {
        console.warn("Offline or failed to sync action to database:", err.message);
    }
}

