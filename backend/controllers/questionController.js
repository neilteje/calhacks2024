const Question = require('../models/Question');

// Create a new question
exports.createQuestion = async (req, res) => {
    try {
        const { text } = req.body;
        const question = new Question({ text });
        await question.save();
        res.status(201).json(question);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create question' });
    }
};

// Get all questions
exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve questions' });
    }
};

// Get a specific question by ID
exports.getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve question' });
    }
};

// Delete a question by ID
exports.deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }
        res.status(200).json({ message: 'Question deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete question' });
    }
};
