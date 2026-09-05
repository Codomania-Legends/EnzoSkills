import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { sileo } from 'sileo';

export const userContext = createContext()

export function UserProvider({ children }) {
    const [username, setUsername] = useState("USER")
    const [userDetails, setUserDetails] = useState({})

    async function getUserDetails() {
        const id = Cookies.get("user_id")
        if (!id) return;
        
        try {
            const data = await axios.get(`http://localhost:3000/user/getuser/${id}`)
            if (data.data && data.data.user) {
                const user = data.data.user;
                setUserDetails(user);
                setUsername(user.user_name || "USER");
                
                checkDailyStreak(user);
            }
        } catch (err) {
            console.error("Failed to fetch user details", err);
        }
    }

    async function updateStreak(newStreak) {
        const id = Cookies.get("user_id");
        if (!id) return;

        try {
            await axios.patch("http://localhost:3000/user/gamification", {
                user_id: id,
                streak: newStreak
            });

            setUserDetails(prev => ({ ...prev, streak: newStreak }));
        } catch (err) {
            console.error("Failed to update streak:", err);
        }
    }

    async function checkDailyStreak(user) {
        const lastLogin = localStorage.getItem("last_login_date");
        const today = new Date().toDateString();

        if (!lastLogin) {
            localStorage.setItem("last_login_date", today);
            if (!user.streak || user.streak === 0) {
                updateStreak(1);
            }
            return;
        }

        if (lastLogin === today) {
            return;
        }

        const lastDate = new Date(lastLogin);
        const currentDate = new Date(today);
        const diffTime = Math.abs(currentDate - lastDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        localStorage.setItem("last_login_date", today);

        if (diffDays === 1) {
            // Logged in on consecutive day: Increment Streak
            const nextStreak = (user.streak || 0) + 1;
            updateStreak(nextStreak);
        } else if (diffDays > 1) {
            // Missed one or more days: Reset Streak to 1
            updateStreak(1);
        }
    }

    useEffect(() => {
        sileo.promise(getUserDetails, {
            success: "Details fetched successfully",
            error: "Failed to fetch details",
            loading: "Fetching details...",
            duration: 10
        })
    }, [])

    const streak = userDetails?.streak || 0;

    return (
        <userContext.Provider value={{
            username,
            setUsername,
            userDetails,
            setUserDetails,
            streak,
            updateStreak,
            getUserDetails
        }}>
            {children}
        </userContext.Provider>
    )
}

export const useUser = () => {
    const contextValue = useContext(userContext);

    if (!contextValue) {
        throw new Error("useUser must be used within a UserProvider! 🚨");
    }

    return contextValue;
};