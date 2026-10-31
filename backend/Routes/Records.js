const express = require("express");
const {
    handle_Records_Section,
    get_Records,
    get_User_Records,
    add_Or_Update_Record
} = require("../Controllers/Records");

const recordsRouter = express.Router();

recordsRouter.get("/user/:userId", get_User_Records);
recordsRouter.get("/get", get_Records);
recordsRouter.post("/add", add_Or_Update_Record);
recordsRouter.patch("/postrecords", handle_Records_Section);

module.exports = recordsRouter;
