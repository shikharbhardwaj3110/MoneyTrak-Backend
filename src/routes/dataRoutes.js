const express = require('express');
const User = require("../models/UserModel");
const dataController = require("../controllers/dataController");
const jwtMiddleware = require('../middleware/jwtMiddleware');
const jwtAuthMiddleware = require('../middleware/jwtMiddleware');

const router = express.Router();

router.post('/addExpense', jwtAuthMiddleware, dataController.addExpense);

module.exports = router;
