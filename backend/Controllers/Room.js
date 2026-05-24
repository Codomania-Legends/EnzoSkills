const { Server } = require("socket.io");
const express = require("express");

const { createServer } = require("http");

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

const roomMembers = {};

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("join_room", ({ roomID, username }) => {
        socket.join(roomID);
        socket.username = username || "User";
        socket.roomID = roomID;
        console.log(`User ${socket.username} (${socket.id}) joined room ${roomID}`);

        if (!roomMembers[roomID]) {
            roomMembers[roomID] = [];
        }

        // Add to room if not already there (by socket id)
        const existing = roomMembers[roomID].find(m => m.socketId === socket.id);
        if (!existing) {
            roomMembers[roomID].push({ socketId: socket.id, username: socket.username });
        } else {
            existing.username = socket.username;
        }

        // Broadcast to everyone in the room (including sender)
        io.to(roomID).emit("update_members", roomMembers[roomID]);
    });

    socket.on("send_message", (data) => {
        console.log("Data received:", data);
        socket.to(data.roomID).emit("recieve-msg", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        if (socket.roomID && roomMembers[socket.roomID]) {
            roomMembers[socket.roomID] = roomMembers[socket.roomID].filter(m => m.socketId !== socket.id);

            // Clean up the room entirely if no one is left
            if (roomMembers[socket.roomID].length === 0) {
                delete roomMembers[socket.roomID];
            } else {
                io.to(socket.roomID).emit("update_members", roomMembers[socket.roomID]);
            }
        }
    });
});

server.listen(4000, () => {
    console.log("Server started on port 4000");
});