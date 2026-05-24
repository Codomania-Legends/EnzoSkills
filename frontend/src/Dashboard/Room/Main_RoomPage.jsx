import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import Cookies from 'js-cookie';
import "./Main_RoomPage.css"

// Initialize socket outside or inside useEffect to prevent recreation
const socket = io("http://localhost:4000");

function Main_RoomPage() {
    const path = window.location.pathname;
    const roomID = path.split("/")[3];

    const [message, setMessage] = useState("");
    const [receivedMessages, setReceivedMessages] = useState([]); 
    const [members, setMembers] = useState([]);
    const myUsername = Cookies.get("username") || "User";

    useEffect(() => {
        // Ensure socket is connected if it was previously disconnected
        if (!socket.connected) {
            socket.connect();
        }

        // Join room when component mounts
        if (roomID) {
            socket.emit("join_room", { roomID, username: myUsername });
        }

        // Listen for messages
        socket.on("recieve-msg", (data) => {
            setReceivedMessages((prev) => [...prev, { message: data.message, user: data.user }]);
        });

        // Listen for member updates
        socket.on("update_members", (updatedMembers) => {
            setMembers(updatedMembers);
        });

        // Cleanup on unmount
        return () => {
            socket.off("recieve-msg");
            socket.off("update_members");
        };
    }, [roomID, myUsername]);

    const sendMessage = () => {
        if (message.trim() !== "") {
            const messageData = {
                roomID: roomID,
                message: message,
                user: myUsername
            };

            socket.emit("send_message", messageData);

            // Update local UI
            setReceivedMessages((prev) => [...prev, messageData]);
            setMessage("");
        }
    };

    const getUserImage = (username) => {
        const knownUsers = ['Anshul', 'Vidhi', 'Anjali', 'Mohini'];
        // Try to match first name or exact name
        const match = knownUsers.find(k => username.toLowerCase().includes(k.toLowerCase()));
        if (match) {
            return `/About-us/members/${match}.png`;
        }
        return `https://ui-avatars.com/api/?name=${username}&background=534DB4&color=fff&bold=true`;
    };

    return (
        <div>
            <h1>
                <i className="fa-solid fa-arrow-left cursor-pointer hover:scale-110 transition-transform" id='arrows' onClick={() => window.history.back()}></i>
                <b className='room'>{roomID}</b>
            </h1>
            <div className="text-container">
                <div id='usermsg' className="flex flex-col gap-4 p-6 overflow-y-auto w-full h-[60vh] custom-scrollbar">
                    {/* Welcome message */}
                    <div className="flex justify-center w-full my-4">
                        <span className="bg-gray-200 text-gray-500 px-4 py-1 rounded-full text-xs font-bold">Welcome to the Room! Say hi 👋</span>
                    </div>

                    {/* Dynamic Messages */}
                    {receivedMessages.map((msg, index) => {
                        const isMe = msg.user === myUsername;
                        return (
                            <div key={index} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'} mb-2`}>
                                <div className={`flex gap-3 max-w-[80%] ${isMe ? 'flex-row-reverse' : 'flex-row'} items-end`}>
                                    <img 
                                        src={getUserImage(msg.user)} 
                                        alt={msg.user} 
                                        className="w-10 h-10 rounded-full object-cover small-box-shadow mb-1 shrink-0 bg-white"
                                    />
                                    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                        <small className="text-gray-500 mb-1 ml-1 mr-1 font-bold">{msg.user}</small>
                                        <div className={`p-4 rounded-[1.5rem] small-box-shadow ${isMe ? 'bg-[#534DB4] text-white rounded-br-sm' : 'white text-black rounded-bl-sm'}`}>
                                            <p className="text-[15px] leading-relaxed">{msg.message}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                <div className="membersSection small-box-shadow blue overflow-y-auto custom-scrollbar">
                    <h2><b>Members ({members.length})</b></h2>
                    <div className="flex flex-col gap-4 mt-4 px-2">
                        {members.map((member, index) => (
                            <div key={index} className="flex items-center gap-4 bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-colors cursor-pointer">
                                <img 
                                    src={getUserImage(member.username)} 
                                    alt={member.username} 
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white/30 bg-white"
                                />
                                <div>
                                    <h4 className="text-white font-bold text-md leading-tight">{member.username} {member.username === myUsername ? "(You)" : ""}</h4>
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
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                />
                <button 
                    onClick={sendMessage}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-[#534DB4] hover:bg-[#3a358c] transition-colors shadow-md shrink-0"
                >
                    <img src="/Room/Vector.png" className="w-5 h-5 invert brightness-0" />
                </button>
            </div>
        </div>
    );
}

export default Main_RoomPage;