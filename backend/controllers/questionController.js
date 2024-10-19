const Question = require('../models/Question');

// Add a new question
exports.addQuestion = async (req, res) => {
  try {
    const newQuestion = new Question({ text: req.body.text });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Error adding question' });
  }
};

// Fetch a random question
exports.getRandomQuestion = async (req, res) => {
  try {
    const count = await Question.countDocuments();
    const random = Math.floor(Math.random() * count);
    const question = await Question.findOne().skip(random);
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching question' });
  }
};
