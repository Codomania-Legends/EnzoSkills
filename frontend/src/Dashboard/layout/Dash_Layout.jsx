import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router';
import Cookies from 'js-cookie';
import axios from 'axios';
import { sileo } from 'sileo';
import Dash_Navbar from './Dash_Navbar';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import DashLoad from '../../Utility/DashLoad/DashLoad';
import { UserProvider } from '../../Utility/UserDetails';

function Dash_Layout() {
    const userId = Cookies.get("user_id");
    const [dailyQuote, setDailyQuote] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;

        async function fetchDailyQuote() {
            const response = await axios.get("http://localhost:3000/user/dailyquotes");
            return response.data;
        }

        sileo.promise(() => fetchDailyQuote(), {
            loading: "Loading quote...",
            success: "Quote loaded successfully!",
            error: "Failed to load quote!",
        }).then((quoteData) => {
            if (quoteData.success) {
                setDailyQuote(quoteData.quote);
                setLoading(false);
            }
        });
    }, [userId]);

    if (!userId) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className='h-screen w-full'>
            <UserProvider>
                {loading && <DashLoad />}
                {!loading && (
                    <>
                        <Dash_Navbar />
                        <div className="md:h-[90%] h-full w-full flex justify-center items-center">
                            <Sidebar />
                            <div className='h-full w-[90%] flex justify-center items-center pl-[4%] box-border bg-transparent md:overflow-visible overflow-scroll'>
                                <Outlet context={{ dailyQuote }} />
                            </div>
                            <MobileSidebar />
                        </div>
                    </>
                )}
            </UserProvider>
        </div>
    );
}

export default Dash_Layout;