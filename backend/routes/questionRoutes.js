const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Create a new question
router.post('/questions', questionController.createQuestion);

// Get all questions
router.get('/questions', questionController.getAllQuestions);

// Get a question by ID
router.get('/questions/:id', questionController.getQuestionById);

// Delete a question by ID
router.delete('/questions/:id', questionController.deleteQuestion);

module.exports = router;
