const express = require('express');
const { get_History, add_History } = require('../Controllers/History');

const historyRouter = express.Router();

historyRouter.post('/add', add_History);
historyRouter.get('/get/:userId', get_History);

module.exports = historyRouter;
