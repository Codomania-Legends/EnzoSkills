const { Server } = require("socket.io");
const express = require("express")

const { createServer } = require("http")

const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket) => {
    console.log("A user connected", socket.id)
    
    socket.on( "join_room", (roomID) => {
        socket.join(roomID)
        console.log(`User ${socket.id} joined room ${roomID}`)
    } )

    socket.on("send_message", (data) => {
        console.log("Data received:", data);

        socket.to(data.roomID).emit("recieve-msg", data.message);
    });
})

server.listen( 4000, () => {
    console.log("Server started on port 4000")
} )