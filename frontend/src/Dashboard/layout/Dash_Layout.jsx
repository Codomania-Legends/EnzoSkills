import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router';
import Cookies from 'js-cookie';
import axios from 'axios';
import { sileo } from 'sileo';
import Dash_Navbar from './Dash_Navbar';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
// You can remove DashLoad from here if you want an instant shell!
import { UserProvider } from '../../Utility/UserDetails';

function Dash_Layout() {
    const currentUserId = Cookies.get("user_id");
    const [dailyQuote, setDailyQuote] = useState("Loading your daily inspiration..."); // Fallback text instead of a full loading screen

    useEffect(() => {
        if (!currentUserId) return;

        async function fetchDailyQuote() {
            const serverResponse = await axios.get("http://localhost:3000/user/dailyquotes");
            return serverResponse.data;
        }

        sileo.promise(() => fetchDailyQuote(), {
            loading: "Loading quote...",
            success: "Quote loaded successfully!",
            error: "Failed to load quote!",
        })
            .then((quoteResponseData) => {
                if (quoteResponseData.success) {
                    setDailyQuote(quoteResponseData.quote);
                } else {
                    setDailyQuote("Keep pushing forward!"); // Safe fallback if success is false
                }
            })
            .catch((error) => {
                console.error("Quote fetch failed", error);
                setDailyQuote("Ready to learn today?"); // Safe fallback on network error
            });

    }, [currentUserId]);

    // Instantly redirect if not logged in
    if (!currentUserId) {
        return <Navigate to="/login" replace />;
    }

    // Render the layout INSTANTLY, passing the quote down as it updates!
    return (
        <div className='h-screen w-full'>
            <UserProvider>
                <Dash_Navbar />
                <div className="md:h-[90%] h-full w-full flex justify-center items-center">
                    <Sidebar />
                    <div className='h-full w-[90%] flex justify-center items-center pl-[4%] box-border bg-transparent md:overflow-visible overflow-scroll'>
                        {/* The quote will update in the child Greet component automatically once the promise resolves */}
                        <Outlet context={{ dailyQuote }} />
                    </div>
                    <MobileSidebar />
                </div>
            </UserProvider>
        </div>
    );
}

export default Dash_Layout;