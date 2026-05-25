import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import TitleAnimation from '../TitleAnimation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function History() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useGSAP(() => {
        const tl = gsap.timeline();
        TitleAnimation(tl, "history-page-title");

        gsap.from(".history-item", {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.5
        });
    }, [logs]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const userId = Cookies.get("user_id");
                if (!userId) {
                    setLoading(false);
                    return;
                }
                const res = await axios.get(`http://localhost:3000/history/get/${userId}`);
                if (res.data && res.data.logs) {
                    setLogs(res.data.logs);
                }
            } catch (err) {
                console.error("Failed to fetch history:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    // Format date beautifully
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="w-full h-full p-6 flex flex-col box-border overflow-y-auto custom-scrollbar">
            <div className="flex items-center gap-4 mb-6 shrink-0">
                <img src="/Dashboard/Courses/Back.svg" alt="Back" className="h-5 w-5 cursor-pointer hover:scale-110 transition-transform" onClick={() => window.history.back()} />
                <h1 className="text-3xl font-bold text-gray-900 history-page-title tracking-tight">Activity History</h1>
            </div>

            <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 relative">
                {/* Timeline vertical line */}
                {logs.length > 0 && (
                    <div className="absolute left-6 top-4 bottom-4 w-[2px] bg-indigo-200 -z-10 rounded-full hidden md:block"></div>
                )}

                {loading ? (
                    <div className="flex justify-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : logs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 white rounded-3xl small-box-shadow">
                        <img src="/Sidebar/history.svg" className="w-20 h-20 opacity-30 mb-4" alt="No History" onError={(e) => e.target.src = "/Sidebar/records.svg"} />
                        <h2 className="text-2xl font-bold text-gray-600">No History Yet</h2>
                        <p className="text-gray-400 mt-2">Your actions and progress will be logged here.</p>
                    </div>
                ) : (
                    logs.map((log, index) => (
                        <div key={index} className="history-item flex flex-col md:flex-row gap-4 md:gap-8 items-start w-full group">
                            
                            {/* Desktop Timeline Node */}
                            <div className="hidden md:flex flex-col items-center pt-2">
                                <div className="w-4 h-4 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] group-hover:scale-150 transition-transform duration-300"></div>
                            </div>

                            {/* Log Card */}
                            <div className="w-full white p-6 rounded-3xl small-box-shadow flex flex-col gap-2 hover:shadow-lg transition-shadow duration-300 border border-gray-50">
                                <div className="flex justify-between items-start w-full max-md:flex-col max-md:gap-2">
                                    <h3 className="text-xl font-bold text-gray-800">{log.action_title}</h3>
                                    <span className="text-sm font-semibold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full whitespace-nowrap">
                                        {formatDate(log.timestamp)}
                                    </span>
                                </div>
                                <p className="text-gray-600 leading-relaxed text-md">
                                    {log.action_description}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default History;
