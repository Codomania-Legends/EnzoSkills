const { Server } = require("socket.io");
const express = require("express");
const { createServer } = require("http");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

const activeRoomMembers = {};

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("join_room", (roomData) => {
        // Prevent crashes if payload is malformed
        if (!roomData || !roomData.roomID) return;

        socket.join(roomData.roomID);
        socket.username = roomData.username || "User";
        socket.roomID = roomData.roomID;

        console.log(`User ${socket.username} (${socket.id}) joined room ${roomData.roomID}`);

        if (!activeRoomMembers[roomData.roomID]) {
            activeRoomMembers[roomData.roomID] = [];
        }

        const existingMember = activeRoomMembers[roomData.roomID].find(member => member.socketId === socket.id);
        if (!existingMember) {
            activeRoomMembers[roomData.roomID].push({ socketId: socket.id, username: socket.username });
        } else {
            existingMember.username = socket.username;
        }

        io.to(roomData.roomID).emit("update_members", activeRoomMembers[roomData.roomID]);
    });

    socket.on("send_message", (messageData) => {
        console.log("Data received:", messageData);
        socket.to(messageData.roomID).emit("recieve-msg", messageData);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        const currentRoomID = socket.roomID;

        if (currentRoomID && activeRoomMembers[currentRoomID]) {
            activeRoomMembers[currentRoomID] = activeRoomMembers[currentRoomID].filter(member => member.socketId !== socket.id);

            // Clean up the room entirely if no one is left
            if (activeRoomMembers[currentRoomID].length === 0) {
                delete activeRoomMembers[currentRoomID];
            } else {
                io.to(currentRoomID).emit("update_members", activeRoomMembers[currentRoomID]);
            }
        }
    });
});

httpServer.listen(4000, () => {
    console.log("Server started on port 4000");
});