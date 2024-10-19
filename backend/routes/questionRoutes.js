const express = require('express');
const router = express.Router();
const { addQuestion, getRandomQuestion } = require('../controllers/questionController');

// Route to add a new question
router.post('/add', addQuestion);

// Route to get a random question
router.get('/random', getRandomQuestion);

module.exports = router;
