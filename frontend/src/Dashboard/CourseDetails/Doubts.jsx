import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { sileo } from 'sileo';
import { useUser } from '../../Utility/UserDetails';

function Doubts() {
  const containerRef = useRef(null);
  const { id: courseId } = useParams();
  const { userDetails } = useUser();

  const [activeTab, setActiveTab] = useState('community'); // 'community' or 'ai'
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(false);

  // New Doubt Form States
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');
  const [submittingDoubt, setSubmittingDoubt] = useState(false);

  // Inline Reply State
  const [replyText, setReplyText] = useState({}); // { [doubtId]: 'reply text' }

  // Action / Dropdown / Edit States
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [hiddenDoubtIds, setHiddenDoubtIds] = useState([]);
  const [editingDoubtId, setEditingDoubtId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editText, setEditText] = useState('');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [showHiddenOnly, setShowHiddenOnly] = useState(false);

  // AI Solver States
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const currentUserId = Cookies.get("user_id") || userDetails?.user_id;

  // Fetch course doubts
  const fetchDoubts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/doubts/course/${courseId}`);
      if (res.data.success) {
        setDoubts(res.data.doubts);
      }
    } catch (err) {
      console.error(err);
      sileo.error("Failed to load doubts forum.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchDoubts();
      // Load hidden doubt IDs
      const stored = localStorage.getItem(`hidden_doubts_${courseId}`);
      if (stored) {
        try {
          setHiddenDoubtIds(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse hidden doubts", e);
        }
      }
    }
  }, [courseId]);

  // Click outside to close active dropdown menu
  useEffect(() => {
    const closeMenu = () => {
      setActiveMenuId(null);
    };
    window.addEventListener('click', closeMenu);
    return () => {
      window.removeEventListener('click', closeMenu);
    };
  }, []);

  // Post Doubt
  const handlePostDoubt = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newText.trim()) {
      sileo.error("Doubt title and description are required.");
      return;
    }

    const userId = Cookies.get("user_id");
    if (!userId) {
      sileo.error("Please login to post doubts.");
      return;
    }

    setSubmittingDoubt(true);
    try {
      const payload = {
        course_id: courseId,
        user_id: userId,
        user_name: userDetails?.user_name || Cookies.get("username") || "Student",
        profile_img: userDetails?.image || "/About-us/members/Anshul.png",
        doubt_title: newTitle,
        doubt_text: newText
      };

      const res = await axios.post("http://localhost:3000/doubts/create", payload);
      if (res.data.success) {
        sileo.success("Doubt posted to the community! 📣");
        setDoubts((prev) => [res.data.doubt, ...prev]);
        setNewTitle('');
        setNewText('');
        setIsPostModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      sileo.error("Failed to post doubt.");
    } finally {
      setSubmittingDoubt(false);
    }
  };

  // Reply to Doubt
  const handlePostReply = async (doubtId) => {
    const text = replyText[doubtId];
    if (!text || !text.trim()) {
      sileo.error("Reply text cannot be empty.");
      return;
    }

    const userId = Cookies.get("user_id");
    if (!userId) {
      sileo.error("Please login to reply.");
      return;
    }

    try {
      const payload = {
        doubt_id: doubtId,
        user_id: userId,
        user_name: userDetails?.user_name || Cookies.get("username") || "Student",
        profile_img: userDetails?.image || "/About-us/members/Anshul.png",
        reply_text: text
      };

      const res = await axios.post("http://localhost:3000/doubts/reply", payload);
      if (res.data.success) {
        sileo.success("Reply added successfully!");
        setDoubts((prev) =>
          prev.map((d) => (d._id === doubtId ? res.data.doubt : d))
        );
        setReplyText((prev) => ({ ...prev, [doubtId]: '' }));
      }
    } catch (err) {
      console.error(err);
      sileo.error("Failed to submit reply.");
    }
  };

  // Delete/Remove Doubt
  const handleDeleteDoubt = async (doubtId) => {
    try {
      const res = await axios.delete(`http://localhost:3000/doubts/delete/${doubtId}`);
      if (res.data.success) {
        sileo.success("Doubt removed successfully. 🗑️");
        setDoubts((prev) => prev.filter((d) => d._id !== doubtId));
      }
    } catch (err) {
      console.error(err);
      sileo.error("Failed to delete doubt.");
    }
  };

  // Update/Edit Doubt
  const handleUpdateDoubt = async (doubtId) => {
    if (!editTitle.trim() || !editText.trim()) {
      sileo.error("Doubt title and description are required.");
      return;
    }
    try {
      const res = await axios.patch("http://localhost:3000/doubts/edit", {
        doubt_id: doubtId,
        doubt_title: editTitle,
        doubt_text: editText
      });
      if (res.data.success) {
        sileo.success("Doubt updated successfully! ✏️");
        setDoubts((prev) =>
          prev.map((d) => (d._id === doubtId ? res.data.doubt : d))
        );
        setEditingDoubtId(null);
      }
    } catch (err) {
      console.error(err);
      sileo.error("Failed to update doubt.");
    }
  };

  // Hide Doubt locally
  const handleHideDoubt = (doubtId) => {
    const updated = [...hiddenDoubtIds, doubtId];
    setHiddenDoubtIds(updated);
    localStorage.setItem(`hidden_doubts_${courseId}`, JSON.stringify(updated));
    sileo.success("Doubt hidden from your feed. 👁️");
  };

  // Unhide Doubt locally
  const handleUnhideDoubt = (doubtId) => {
    const updated = hiddenDoubtIds.filter((id) => id !== doubtId);
    setHiddenDoubtIds(updated);
    localStorage.setItem(`hidden_doubts_${courseId}`, JSON.stringify(updated));
    sileo.success("Doubt restored to active feed. 👁️");
    if (updated.length === 0) {
      setShowHiddenOnly(false);
    }
  };

  // Stream AI Doubt solver
  const handleAiSolve = async (e) => {
    e.preventDefault();
    if (!aiQuery.trim()) {
      sileo.error("Please describe your doubt for the AI.");
      return;
    }

    setAiLoading(true);
    setAiResponse('');
    try {
      const response = await fetch("http://localhost:3000/doubts/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doubt: aiQuery })
      });

      if (!response.ok) {
        throw new Error("AI solver server error");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
      let streamedResponse = "";

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        const chunk = decoder.decode(value, { stream: !done });
        streamedResponse += chunk;
        setAiResponse(streamedResponse);
      }
    } catch (err) {
      console.error(err);
      sileo.error("AI Doubt Solver failed to respond.");
    } finally {
      setAiLoading(false);
    }
  };

  // Filter visible doubts based on showHiddenOnly state
  const visibleDoubts = doubts.filter((d) =>
    showHiddenOnly ? hiddenDoubtIds.includes(d._id) : !hiddenDoubtIds.includes(d._id)
  );

  return (
    <div ref={containerRef} className="h-full w-full py-4 box-border pb-16 bg-transparent relative overflow-y-auto pr-2 custom-scrollbar">
      <div className="flex flex-col md:flex-row justify-between items-center w-full mb-8 gap-4">
        <div className="flex items-center gap-4 project-title">
          <img src="/Dashboard/Courses/Back.svg" alt="Back" className="h-4 w-4 cursor-pointer" onClick={() => window.history.back()} />
          <h1 className="text-2xl font-bold text-gray-900 font-[Plus Jakarta Sans]">Doubt Solving Center</h1>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-white/45 backdrop-blur-md rounded-2xl p-1.5 shadow-sm border border-white/30">
          <button
            onClick={() => setActiveTab('community')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'community'
                ? 'bg-[#8132ff] text-white shadow-md'
                : 'text-gray-700 hover:bg-white/50'
              }`}
          >
            Community Forum 👥
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'ai'
                ? 'bg-[#8132ff] text-white shadow-md'
                : 'text-gray-700 hover:bg-white/50'
              }`}
          >
            Ask AI Solver 🤖
          </button>
        </div>
      </div>

      {/* Have a Doubt Button & Show Hidden Doubts Controls */}
      {activeTab === 'community' && (
        <div className="max-w-7xl flex justify-end items-center gap-4 mb-8 slide-up w-full px-4 md:px-0 mx-auto">
          {hiddenDoubtIds.length > 0 && (
            <button
              onClick={() => setShowHiddenOnly(!showHiddenOnly)}
              className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md small-box-shadow ${
                showHiddenOnly 
                  ? 'bg-amber-500 text-white hover:scale-[1.02] active:scale-[0.98] yellow' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 white'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showHiddenOnly ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                )}
              </svg>
              {showHiddenOnly ? "Show Active Doubts" : `Show Hidden Doubts (${hiddenDoubtIds.length})`}
            </button>
          )}

          <button
            onClick={() => setIsPostModalOpen(true)}
            className="px-6 py-3.5 bg-[#8132ff] text-white rounded-2xl text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition-all small-box-shadow purple flex items-center gap-2 cursor-pointer shadow-md"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            Have a Doubt? Ask!
          </button>
        </div>
      )}

      {/* COMMUNITY FORUM TAB */}
      {activeTab === 'community' && (
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-6 text-left">
          {/* Doubt Feed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto pr-2 custom-scrollbar max-h-[75vh] pb-10">
            {loading ? (
              <div className="col-span-full flex justify-center py-12">
                <div className="animate-spin rounded-full h-9 w-9 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : visibleDoubts.length === 0 ? (
              <div className="col-span-full text-center py-12 small-box-shadow white rounded-3xl p-8 ">
                <p className="text-gray-500 font-medium">No doubts posted yet. Be the first to start the discussion!</p>
              </div>
            ) : (
              visibleDoubts.map((doubt) => (
                <div
                  key={doubt._id}
                  className="white small-box-shadow rounded-[2rem] p-6 flex flex-col gap-4 text-left slide-up relative transition-transform duration-300 hover:scale-[1.005]"
                >
                  {/* Doubt Header */}
                  <div className="flex justify-between items-start relative">
                    <div className="flex items-center gap-3">
                      <img
                        src={doubt.profile_img || ""}
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover border border-purple-150 shadow-sm shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-gray-800">{doubt.user_name}</h4>
                          {doubt.user_id === currentUserId && (
                            <span className="bg-purple-100 text-purple-700 text-[9px] font-bold px-2 py-0.5 rounded-md">
                              You
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>
                            {new Date(doubt.createdAt).toLocaleDateString()} at{" "}
                            {new Date(doubt.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 3-Dot Options Icon */}
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(activeMenuId === doubt._id ? null : doubt._id);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
                      >
                        <svg className="w-5 h-5 text-gray-500 hover:text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                      </button>

                      {/* Dropdown Menu */}
                      {activeMenuId === doubt._id && (
                        <div 
                          onClick={(e) => e.stopPropagation()}
                          className="absolute right-0 mt-1 w-36 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-20 transition-all duration-200"
                        >
                          {doubt.user_id === currentUserId && (
                            <>
                              <button
                                onClick={() => {
                                  setEditingDoubtId(doubt._id);
                                  setEditTitle(doubt.doubt_title);
                                  setEditText(doubt.doubt_text);
                                  setActiveMenuId(null);
                                }}
                                className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-755 hover:bg-purple-50 hover:text-purple-700 transition-colors flex items-center gap-2"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm("Are you sure you want to delete this doubt?")) {
                                    handleDeleteDoubt(doubt._id);
                                  }
                                  setActiveMenuId(null);
                                }}
                                className="w-full text-left px-4 py-2 text-xs font-semibold text-red-655 hover:bg-red-50  hover:text-[#ff0000] transition-colors flex items-center gap-2"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Remove
                              </button>
                              <hr className="border-gray-100 my-1" />
                            </>
                          )}
                          {hiddenDoubtIds.includes(doubt._id) ? (
                            <button
                              onClick={() => {
                                handleUnhideDoubt(doubt._id);
                                setActiveMenuId(null);
                              }}
                              className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-755 hover:bg-gray-200 hover:text-[#1c63e6] transition-colors flex items-center gap-2"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              Unhide
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                handleHideDoubt(doubt._id);
                                setActiveMenuId(null);
                              }}
                              className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-755 hover:bg-gray-200 hover:text-[#1c63e6]  transition-colors flex items-center gap-2"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                              </svg>
                              Hide
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Doubt Content */}
                  <div>
                    {editingDoubtId === doubt._id ? (
                      <div className="flex flex-col gap-3 w-full bg-[#f8f9fd] p-4 rounded-2xl border border-purple-100 mt-2">
                        <div className="flex flex-col gap-1 text-left">
                          <label className="text-[10px] font-bold text-gray-500 ml-1">Edit Title</label>
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="border border-gray-300 shadow-[inset_4px_4px_8px_#b8b9be] rounded-xl h-10 px-4 bg-[#f0f2f5] text-sm focus:outline-purple-500 w-full font-semibold text-gray-800"
                          />
                        </div>
                        <div className="flex flex-col gap-1 text-left">
                          <label className="text-[10px] font-bold text-gray-500 ml-1">Edit Details</label>
                          <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="border border-gray-300 shadow-[inset_4px_4px_8px_#b8b9be] rounded-xl p-3 h-28 bg-[#f0f2f5] text-sm resize-none focus:outline-purple-500 w-full leading-relaxed"
                          />
                        </div>
                        <div className="flex gap-2 justify-end mt-2">
                          <button
                            onClick={() => setEditingDoubtId(null)}
                            className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleUpdateDoubt(doubt._id)}
                            className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 transition-colors shadow-sm"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 className="font-bold text-base text-purple-700 mb-1.5">{doubt.doubt_title}</h3>
                        <p className="text-sm text-gray-650 leading-relaxed whitespace-pre-wrap">{doubt.doubt_text}</p>
                      </>
                    )}
                  </div>

                  <hr className="border-gray-100" />

                  {/* Replies Section */}
                  <div className="flex flex-col gap-4 mt-2 pl-4 border-l-2 border-purple-100">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#8132ff] tracking-wide flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                        Replies ({doubt.replies?.length || 0})
                      </h4>
                    </div>
                    {doubt.replies && doubt.replies.length > 0 ? (
                      <div className="flex flex-col gap-3">
                        {doubt.replies.map((reply) => {
                          const isReplyAuthor = reply.user_id === doubt.user_id;
                          const isCurrentUserReply = reply.user_id === currentUserId;
                          return (
                            <div key={reply._id} className="flex gap-3 bg-[#f8f9fc]/85 border border-gray-100/75 p-3.5 rounded-2xl transition-all hover:bg-gray-50/50">
                              <img
                                src={reply.profile_img || "/About-us/members/Anshul.png"}
                                alt="User"
                                className="w-8 h-8 rounded-full object-cover border border-purple-100 shadow-sm shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center gap-2">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="font-bold text-xs text-gray-800">{reply.user_name}</span>
                                    {isReplyAuthor && (
                                      <span className="bg-amber-100 text-amber-700 text-[8px] font-bold px-1.5 py-0.5 rounded-md">
                                        Author
                                      </span>
                                    )}
                                    {isCurrentUserReply && (
                                      <span className="bg-purple-100 text-purple-700 text-[8px] font-bold px-1.5 py-0.5 rounded-md">
                                        You
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[9px] text-gray-400 whitespace-nowrap">
                                    {new Date(reply.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-600 mt-1 leading-relaxed whitespace-pre-wrap">{reply.reply_text}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 italic pl-1">No replies yet. Be the first to answer!</p>
                    )}
                  </div>

                  {/* Reply Input Form */}
                  <div className="flex gap-3 items-center mt-3 pt-3 border-t border-gray-100">
                    <img
                      src={userDetails?.image || "/About-us/members/Anshul.png"}
                      alt="Current User"
                      className="w-8 h-8 rounded-full object-cover border border-purple-100 shadow-sm hidden sm:block"
                    />
                    <input
                      type="text"
                      placeholder="Write a reply or answer..."
                      value={replyText[doubt._id] || ''}
                      onChange={(e) =>
                        setReplyText((prev) => ({ ...prev, [doubt._id]: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handlePostReply(doubt._id);
                        }
                      }}
                      className="flex-1 border shadow-[inset_4px_4px_8px_#b8b9be] border-gray-300 rounded-xl h-10 px-4 text-xs bg-[#f0f2f5] focus:outline-purple-500"
                    />
                    <button
                      onClick={() => handlePostReply(doubt._id)}
                      className="px-4 py-2 small-box-shadow purple text-white rounded-xl text-xs font-bold hover:bg-purple-700 transition-colors h-10 shadow-sm flex items-center gap-1 shrink-0"
                    >
                      <span>Reply</span>
                      <svg className="w-3 h-3 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* AI SOLVER TAB */}
      {activeTab === 'ai' && (
        <div className="max-w-3xl mx-auto flex flex-col gap-6 slide-up text-left">
          <div className="white small-box-shadow rounded-[2rem] p-6  flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              <div>
                <h2 className="text-lg font-bold text-[#8132ff]">Cloura</h2>
                <p className="text-xs text-gray-500">Instant explanations and examples powered by local AI.</p>
              </div>
            </div>

            <form onSubmit={handleAiSolve} className="flex flex-col gap-4">
              <textarea
                placeholder="Ask any programming doubt (e.g. Explain how async/await works in JavaScript with a code example)"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                className="border border-gray-400 bg-[#f0f2f5] shadow-[inset_4px_4px_8px_#b8b9be] rounded-xl p-4 h-32  text-sm resize-none focus:outline-purple-500"
              />
              <button
                type="submit"
                disabled={aiLoading}
                className="w-fit self-end px-8 py-3 small-box-shadow purple rounded-xl  text-white font-bold text-sm hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {aiLoading ? "Thinking..." : "Solve Instantly"}
              </button>
            </form>
          </div>

          {/* AI Response Output Block */}
          {(aiResponse || aiLoading) && (
            <div className="bg-[#1e1e24] text-gray-100 rounded-[2rem] p-6 shadow-lg border border-neutral-800 flex flex-col gap-4 min-h-[150px] relative font-mono">
              <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
                <span className="text-xs text-purple-400 font-bold uppercase tracking-wider">AI Explanation Stream</span>
                {aiLoading && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400">Tutor typing...</span>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                    </span>
                  </div>
                )}
              </div>
              <div className="text-sm leading-relaxed whitespace-pre-wrap overflow-x-auto pr-2 custom-scrollbar max-h-[50vh]">
                {aiResponse || "Analyzing doubt context..."}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Ask Doubt Modal */}
      {isPostModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsPostModalOpen(false)}>
          <div
            className="small-box-shadow white rounded-[2rem] w-full max-w-lg p-6 flex flex-col gap-4 text-left  relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPostModalOpen(false)}
              className="absolute top-6 right-6 p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-lg font-bold text-[#8132ff]">Ask a Doubt</h2>
            <form onSubmit={handlePostDoubt} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1 text-left">
                <label className="text-xs font-bold text-gray-600 ml-1">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Flexbox layout wrapping issue"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="border border-gray-300 shadow-[inset_4px_4px_8px_#b8b9be] rounded-xl h-11 pl-4 bg-[#f0f2f5] text-sm focus:outline-purple-500 font-semibold"
                />
              </div>

              <div className="flex flex-col gap-1 text-left">
                <label className="text-xs font-bold text-gray-600 ml-1">Details</label>
                <textarea
                  placeholder="Describe your error or query in detail..."
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="border shadow-[inset_4px_4px_8px_#b8b9be] border-gray-300 rounded-xl p-3 h-36 bg-[#f0f2f5] text-sm resize-none focus:outline-purple-500 leading-relaxed"
                />
              </div>

              <div className="flex gap-2 justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setIsPostModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingDoubt}
                  className="px-5 py-2.5 rounded-xl small-box-shadow purple text-white font-bold text-xs hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {submittingDoubt ? "Posting..." : "Post Doubt"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Doubts;