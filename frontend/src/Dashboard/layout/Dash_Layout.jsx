import React, { useState, useEffect } from 'react'; // 📦
import { Outlet, Navigate } from 'react-router'; // 🛣️
import Cookies from 'js-cookie'; // 🍪
import axios from 'axios'; // 📡
import { sileo } from 'sileo'; // 🔔
import Dash_Navbar from './Dash_Navbar'; // 🧭
import Sidebar from './Sidebar'; // 🗂️
import MobileSidebar from './MobileSidebar'; // 📱

function Dash_Layout() { // 🏗️
    const userId = Cookies.get("user_id"); // 🆔
    const [dailyQuote, setDailyQuote] = useState(""); // 💬

    useEffect(() => { // ⚙️
        // Only fetch the quote if the user is actually logged in! 🛡️
        if (!userId) return; 

        async function fetchDailyQuote() { // 🌐
            const response = await axios.get("http://localhost:3000/user/dailyquotes"); // 🔗
            return response.data; // 📄
        }

        sileo.promise(() => fetchDailyQuote(), { // ⏳
            loading: "Loading quote...", // 🔄
            success: "Quote loaded successfully!", // 🎉
            error: "Failed to load quote!", // ⚠️
        }).then((quoteData) => { // 📥
            if (quoteData.success) { // ✅
                setDailyQuote(quoteData.quote); // 📝
            }
        });
    }, [userId]); // 🔄

    if (!userId) { // 🚫
        return <Navigate to="/login" replace />; // ⬅️
    }
    
    return ( // 🖥️
        <div className='h-screen w-full'>
            <Dash_Navbar />
            <div className="md:h-[90%] h-full w-full flex justify-center items-center">
                <Sidebar />
                <div className='h-full w-[90%] flex justify-center items-center pl-[4%] box-border bg-transparent md:overflow-visible overflow-scroll'>
                    {/* Pass the dailyQuote down to all child routes via context! 🎯 */}
                    <Outlet context={{ dailyQuote }} /> 
                </div>
                <MobileSidebar />
            </div>
        </div>
    );
}

export default Dash_Layout; // 🚪