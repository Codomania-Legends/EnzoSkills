require("dotenv").config();
const dns = require("node:dns");
const mongoose = require("mongoose");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const databaseConnectionString = "";

const connectToDatabase = async () => {
    try {
        console.log("Attempting to connect to MongoDB...");
        await mongoose.connect(databaseConnectionString);
        console.log("Successfully connected to the database!");
    } catch (databaseConnectionError) {
        console.error("MongoDB connection failed:", databaseConnectionError);
        process.exit(1);
    }
};

module.exports = connectToDatabase;