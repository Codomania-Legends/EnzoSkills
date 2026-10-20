const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connectToDatabase = require("./MongoDB_Connect");
const setupRoomSocket = require("./Controllers/Room");

const userRouter = require("./Routes/User");
const courseRouter = require("./Routes/Course");
const libraryRouter = require("./Routes/Library");
const recordsRouter = require("./Routes/Records");
const historyRouter = require("./Routes/History");
const DoubtRouter = require("./Routes/Doubts");
const assessmentRouter = require("./Routes/Assessments");
const helmet = require("helmet");
const Rate_Limiter = require("./MiddleWares/rateLimiter");

const app = express();
const server = http.createServer(app);

// Initialize Socket.io on the SAME server/port
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://localhost:5174"],
        methods: ["GET", "POST"]
    }
});

// Attach socket event handlers
setupRoomSocket(io);

app.use(Rate_Limiter)

app.use(helmet())

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}));
app.use(express.json({ limit: "10mb", type: ["application/json", "text/plain"] }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// API Routes
app.use("/user", userRouter);
app.use("/courses", courseRouter);
app.use("/assessments", assessmentRouter);
app.use("/library", libraryRouter);
app.use("/doubts", DoubtRouter);
app.use("/records", recordsRouter);
app.use("/history", historyRouter);

const PORT = process.env.PORT || 3000;

// Start server only after database is connected
const startServer = async () => {
    try {
        await connectToDatabase();
        server.listen(PORT, () => {
            console.log(`Server started on port ${PORT} (HTTP + WebSockets)`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();