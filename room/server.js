const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid"); // For unique room IDs 🆔

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public")); // Serve your HTML file 📂

io.on("connection", (socket) => {
  console.log("A user connected ⚡");

  // Event: Create a new room
  socket.on("create_room", () => {
    const roomId = uuidv4(); // Generate a random unique ID 🎲
    socket.join(roomId); // The creator joins the room automatically
    socket.emit("room_created", roomId); // Send ID back to user to share
    console.log(`Room created with ID: ${roomId} 🏠`);
  });

  // Event: Join an existing room
  socket.on("join_room", (roomId) => {
    // You can add logic here to check if the room exists first! 🕵️‍♂️
    socket.join(roomId);
    console.log(`User joined room: ${roomId} 🚶`);
    socket.to(roomId).emit("user_joined", "A new user has joined the chat! 👋");
  });

  // Event: Send a message to a specific room
  socket.on("send_message", ({ roomId, message }) => {
    // Send ONLY to users in that room 🔒
    io.to(roomId).emit("receive_message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected 🔌");
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000 🚀");
});
