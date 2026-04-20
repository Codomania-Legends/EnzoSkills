import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client"; 
import Cookies from 'js-cookie';

// Initialize socket outside or inside useEffect to prevent recreation
const socket = io("http://localhost:4000");

function Main_RoomPage() {
    const path = window.location.pathname; 
    const roomID = path.split("/")[3];

    const [message, setMessage] = useState("");
    const [receivedMessages, setReceivedMessages] = useState([]); // Fixed name

    useEffect(() => {
        // Join room when component mounts
        if (roomID) {
            socket.emit("join_room", roomID);
        }

        // Listen for messages
        socket.on("recieve-msg", (msg) => {
            // msg here is just the string based on your backend logic
            setReceivedMessages((prev) => [...prev, { message: msg, user: "Other" }]);
        });

        // Cleanup on unmount
        return () => {
            socket.off("recieve-msg");
        };
    }, [roomID]); // Runs once, or if roomID changes

    const sendMessage = () => {
        if (message.trim() !== "") {
            const messageData = {
                roomID: roomID,
                message: message,
                user: Cookies.get("username") || "Anonymous"
            };

            socket.emit("send_message", messageData);

            // Update local UI
            setReceivedMessages((prev) => [...prev, messageData]);
            setMessage("");
        }
    };

    return (
        <div>
            <h1>Room {roomID}</h1>
            <div className="text-container">
                <h3>Messages:</h3>
                {receivedMessages.map((msg, index) => (
                    <div key={index} className='flex justify-between'>
                        <p>{msg.message}</p>
                        <p><strong>{msg.user}</strong></p>
                    </div>
                ))}
            </div>
            <input 
                type="text"
                placeholder='Type your message...'
                value={message}
                onChange={(e) => setMessage(e.target.value)} 
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Main_RoomPage;