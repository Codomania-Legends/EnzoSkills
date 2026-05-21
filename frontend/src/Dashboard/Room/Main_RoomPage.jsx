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
    const [receivedMessages, setReceivedMessages] = useState([]); // Fixed name

    useEffect(() => {
        // Join room when component mounts
        if (roomID) {
            socket.emit("join_room", roomID);
        }

        // Listen for messages
        socket.on("recieve-msg", (data) => {
            // msg here is just the string based on your backend logic
            console.log(data);
            // console.log(user)
            setReceivedMessages((prev) => [...prev, { message: data.message, user: data.user }]);
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
            <h1><i className="fa-solid fa-arrow-left" id='arrows'></i><b className='room'>{roomID}</b></h1>
            <div className="text-container">
                <div id='usermsg'>
                    <img src="/Room/Anshul.png"  style={{ position: "absolute",right: "4%"}}/>
                    <div className='anshul small-box-shadow white'>
                        <small style={{position: "absolute",left: "5%", top:"4%"}}>Anshul</small>
                        <p style={{position: "absolute",left: "13%",top: "30%"}}>Hello Vidhi What’s up</p>
                        <span style={{ position: "absolute",right: "5%",bottom: "10%"}}>10:02 PM</span>
                    </div>
                    <img src="/Room/Vidhi.png"  style={{ position: "absolute",left: "0%", top: "20%"}}/>
                    <div className='vidhi small-box-shadow blue'>
                        <small style={{position: "absolute",left: "5%", top:"5%"}}>Vidhi</small>
                        <p style={{position: "absolute",left: "13%",top: "32%"}}>I am Good What about You!?</p>
                        <span style={{ position: "absolute",right: "5%",bottom: "10%"}}>10:05 PM</span>
                    </div>
                    <img src="/Room/Anjali.png"  style={{ position: "absolute",left: "0%", top: "40.5%"}}/>
                    <div className='anjali small-box-shadow red'>
                        <small style={{position: "absolute",left: "3%", top:"5%"}}>Anjali</small>
                        <p style={{position: "absolute",left: "9%",top: "27%"}}>Hello Vidhi Anshul i hope you both are doing well, what’s going on now?</p>
                        <span style={{ position: "absolute",right: "3%",bottom: "10%"}}>10:10 PM</span>
                    </div>
                </div>
                <div>
                {receivedMessages.map((msg, index) => (
                    <div key={index} className='flex justify-between' >
                        <p>{msg.message}</p>
                        <p><strong>{msg.user}</strong></p>
                    </div>
                ))} 
                </div>
                <div className="membersSection small-box-shadow blue">
                    <h2><b>Members</b></h2>
                    <div className="member">
                        <img src="/Room/Anshul.png" style={{position: "absolute",left: "8%"}}/>
                        <div>
                            <h4>You</h4>
                            <p>Full Stack Developer</p>
                        </div>
                        <img src="/Room/Vidhi.png" style={{position: "absolute",left: "8%",top: "40.5%"}}/>
                        <div>
                            <h4>Vidhi Agrawal</h4>
                            <p>Frontend Developer</p>
                        </div>
                        <img src="/Room/Anjali.png" style={{position: "absolute",left: "8%",top: "58%"}}/>
                        <div>
                            <h4>Anjali </h4>
                            <p>Research Analytics</p>
                        </div>
                        <img src="/Room/Mohini.png" style={{position: "absolute",left: "8%",top: "76%"}}/>
                        <div>
                            <h4>Mohini Verma</h4>
                            <p>Research Analytics</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="inputSection big-box-shadow white">
                <i class="fa-solid fa-link" style={{color: "rgb(58, 46, 255)", paddingLeft: "15px"}}></i>
                <input style={{color: "rgb(0, 0, 0)"}}
                type="text"
                placeholder='What are You studying Nowadays?'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>
                    <img src="/Room/Vector.png"/>
                </button>
            </div>
            
        </div>
    );
}

export default Main_RoomPage;