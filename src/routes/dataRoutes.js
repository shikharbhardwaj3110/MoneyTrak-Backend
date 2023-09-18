const express = require('express');
const dataController = require("../controllers/dataController");
const jwtAuthMiddleware = require('../middleware/jwtMiddleware');

const router = express.Router();

router.post('/addExpense', jwtAuthMiddleware, dataController.addExpense);
router.post('/updateExpense', jwtAuthMiddleware, dataController.updateExpense);
router.post('/updateIncome', jwtAuthMiddleware, dataController.updateCurrentIncome);

module.exports = router;
