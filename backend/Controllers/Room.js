function setupRoomSocket(io) {
    const activeRoomMembers = {};

    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        socket.on("join_room", (roomData) => {
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
            if (!messageData || !messageData.roomID) return;
            socket.to(messageData.roomID).emit("recieve-msg", messageData);
        });

        socket.on("disconnect", () => {
            const currentRoomID = socket.roomID;

            if (currentRoomID && activeRoomMembers[currentRoomID]) {
                activeRoomMembers[currentRoomID] = activeRoomMembers[currentRoomID].filter(member => member.socketId !== socket.id);

                if (activeRoomMembers[currentRoomID].length === 0) {
                    delete activeRoomMembers[currentRoomID];
                } else {
                    io.to(currentRoomID).emit("update_members", activeRoomMembers[currentRoomID]);
                }
            }
        });
    });
}

module.exports = setupRoomSocket;