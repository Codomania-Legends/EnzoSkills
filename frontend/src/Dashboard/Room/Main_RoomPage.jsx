import React, { useEffect, useState, useRef } from 'react';
import { io } from "socket.io-client";
import Cookies from 'js-cookie';
import { useParams, useNavigate } from 'react-router';
import "./Main_RoomPage.css";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Initialize socket connection outside the component lifecycle 🔌
const chatSocketClient = io("http://localhost:4000");

function MainRoomPage() {
    // Safely capture the parameters regardless of how they are named in your App Router! 🧭
    const routeParameters = useParams();
    const activeRoomId = routeParameters.roomId || routeParameters.roomID || routeParameters.id || window.location.pathname.split("/")[3];
    const navigate = useNavigate();
    const container = useRef(null);

    useGSAP(() => {
        gsap.fromTo(container.current, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.5, ease: 'power2.out'});
    }, { scope: container });

    // Highly descriptive state variables 🏷️
    const [currentMessageInput, setCurrentMessageInput] = useState("");
    const [chatMessageHistory, setChatMessageHistory] = useState([]);
    const [activeRoomMembers, setActiveRoomMembers] = useState([]);

    const localClientUsername = Cookies.get("username") || "User";
    const messageContainerReference = useRef(null);

    // Auto-scroll effect: Triggers whenever chatMessageHistory updates ⬇️
    useEffect(() => {
        if (messageContainerReference.current) {
            messageContainerReference.current.scrollTop = messageContainerReference.current.scrollHeight;
        }
    }, [chatMessageHistory]);

    useEffect(() => {
        if (!chatSocketClient.connected) {
            chatSocketClient.connect();
        }

        // Now activeRoomId is guaranteed to have a value! 🎯
        if (activeRoomId) {
            chatSocketClient.emit("join_room", { roomID: activeRoomId, username: localClientUsername });
        }

        chatSocketClient.on("recieve-msg", (incomingData) => {
            setChatMessageHistory((previousHistory) => [
                ...previousHistory,
                { message: incomingData.message, user: incomingData.user }
            ]);
        });

        chatSocketClient.on("update_members", (updatedMemberList) => {
            setActiveRoomMembers(updatedMemberList);
        });

        return () => {
            chatSocketClient.off("recieve-msg");
            chatSocketClient.off("update_members");
        };
    }, [activeRoomId, localClientUsername]);

    const handleSendMessage = () => {
        if (currentMessageInput.trim() !== "") {
            const compiledMessageData = {
                roomID: activeRoomId,
                message: currentMessageInput,
                user: localClientUsername
            };

            chatSocketClient.emit("send_message", compiledMessageData);

            // Optimistic UI update ⚡
            setChatMessageHistory((previousHistory) => [...previousHistory, compiledMessageData]);
            setCurrentMessageInput("");
        }
    };

    const fetchUserAvatarImage = (targetUsername) => {
        const hardcodedTeamMembers = ['Anshul', 'Vidhi', 'Anjali', 'Mohini'];
        const matchedMember = hardcodedTeamMembers.find(member =>
            targetUsername.toLowerCase().includes(member.toLowerCase())
        );

        if (matchedMember) {
            return `/About-us/members/${matchedMember}.png`;
        }
        return `https://ui-avatars.com/api/?name=${targetUsername}&background=534DB4&color=fff&bold=true`;
    };

    return (
        <div ref={container}>
            <h1>
                <i
                    className="fa-solid fa-arrow-left cursor-pointer hover:scale-110 transition-transform"
                    id='arrows'
                    onClick={() => navigate(-1)}
                ></i>
                <b className='room'>{activeRoomId}</b>
            </h1>

            <div className="text-container">
                <div
                    id='usermsg'
                    ref={messageContainerReference}
                    className="flex flex-col gap-4 p-6 overflow-y-auto w-full h-[60vh] custom-scrollbar scroll-smooth"
                >
                    <div className="flex justify-center w-full my-4">
                        <span className="bg-gray-200 text-gray-500 px-4 py-1 rounded-full text-xs font-bold">
                            Welcome to the Room! Say hi 👋
                        </span>
                    </div>

                    {chatMessageHistory.map((chatItem, index) => {
                        const isMessageFromLocalClient = chatItem.user === localClientUsername;
                        return (
                            <div key={index} className={`flex w-full ${isMessageFromLocalClient ? 'justify-end' : 'justify-start'} mb-2`}>
                                <div className={`flex gap-3 max-w-[80%] ${isMessageFromLocalClient ? 'flex-row-reverse' : 'flex-row'} items-end`}>
                                    <img
                                        src={fetchUserAvatarImage(chatItem.user)}
                                        alt={chatItem.user}
                                        className="w-10 h-10 rounded-full object-cover small-box-shadow mb-1 shrink-0 bg-white"
                                    />
                                    <div className={`flex flex-col ${isMessageFromLocalClient ? 'items-end' : 'items-start'}`}>
                                        <small className="text-gray-500 mb-1 ml-1 mr-1 font-bold">{chatItem.user}</small>
                                        <div className={`p-4 rounded-[1.5rem] small-box-shadow ${isMessageFromLocalClient ? 'bg-[#534DB4] text-white rounded-br-sm' : 'white text-black rounded-bl-sm'}`}>
                                            <p className="text-[15px] leading-relaxed">{chatItem.message}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="membersSection small-box-shadow blue overflow-y-auto custom-scrollbar">
                    <h2><b>Members ({activeRoomMembers.length})</b></h2>
                    <div className="flex flex-col gap-4 mt-4 px-2">
                        {activeRoomMembers.map((memberData, index) => (
                            <div key={index} className="flex items-center gap-4 bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-colors cursor-pointer">
                                <img
                                    src={fetchUserAvatarImage(memberData.username)}
                                    alt={memberData.username}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white/30 bg-white"
                                />
                                <div>
                                    <h4 className="text-white font-bold text-md leading-tight">
                                        {memberData.username} {memberData.username === localClientUsername ? "(You)" : ""}
                                    </h4>
                                    <p className="text-green-300 font-semibold text-xs mt-1 tracking-wide flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Online
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="inputSection big-box-shadow white flex items-center justify-between px-6 py-2">
                <i className="fa-solid fa-link text-[#3a2eff] cursor-pointer hover:scale-110 transition-transform"></i>
                <input
                    className="flex-grow mx-4 text-black bg-transparent outline-none border-none text-lg px-4"
                    type="text"
                    placeholder='What are You studying Nowadays?'
                    value={currentMessageInput}
                    onChange={(event) => setCurrentMessageInput(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            handleSendMessage();
                        }
                    }}
                />
                <button
                    onClick={handleSendMessage}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-[#534DB4] hover:bg-[#3a358c] transition-colors shadow-md shrink-0"
                >
                    <img src="/Room/Vector.png" className="w-5 h-5 invert brightness-0" alt="Send" />
                </button>
            </div>
        </div>
    );
}

export default MainRoomPage;