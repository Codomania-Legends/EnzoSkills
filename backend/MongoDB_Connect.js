require("dotenv").config();
const dns = require("node:dns");
const mongoose = require("mongoose");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const databaseConnectionString = process.env.MongoDB_URL;

// Stop the server if the database disconnects or encounters an error during runtime
mongoose.connection.on("disconnected", () => {
    console.error("MongoDB disconnected! Stopping server...");
    process.exit(1);
});

mongoose.connection.on("error", (databaseError) => {
    console.error("MongoDB connection error:", databaseError);
    process.exit(1);
});

const connectToDatabase = async () => {
    try {
        if (!databaseConnectionString) {
            console.error("MongoDB connection failed: MongoDB_URL is not defined in environment variables (.env)");
            process.exit(1);
        }

        console.log("Attempting to connect to MongoDB...");
        await mongoose.connect(databaseConnectionString);
        console.log("Successfully connected to the database!");
    } catch (databaseConnectionError) {
        console.error("MongoDB connection failed:", databaseConnectionError);
        process.exit(1);
    }
};

module.exports = connectToDatabase;