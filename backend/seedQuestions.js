const mongoose = require('mongoose');
const Question = require('./models/Question');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Failed to connect to MongoDB', err));

const questions = [
    { text: "What is one thing you're grateful for today, and why?", createdAt: new Date('2024-10-01') },
    { text: "Describe a moment this week when you felt truly at peace.", createdAt: new Date('2024-10-02') },
    { text: "What is a habit you'd like to build this month, and how can you start?", createdAt: new Date('2024-10-03') },
    { text: "What would you say to your younger self if you could go back in time?", createdAt: new Date('2024-10-04') },
    { text: "What fear are you ready to overcome, and what small step can you take towards it today?", createdAt: new Date('2024-10-05') },
    { text: "Who in your life brings you the most joy, and why?", createdAt: new Date('2024-10-06') },
    { text: "What is a new skill you’d love to learn before the year ends?", createdAt: new Date('2024-10-07') },
    { text: "How do you practice self-care, and what more could you do to nurture yourself?", createdAt: new Date('2024-10-08') },
    { text: "What was a recent success you achieved, and how did it make you feel?", createdAt: new Date('2024-10-09') },
    { text: "Reflect on a time you handled a difficult situation well. What did you do right?", createdAt: new Date('2024-10-10') },
    { text: "What is one thing you're passionate about, and why?", createdAt: new Date('2024-10-11') },
    { text: "What are your top 3 priorities for the rest of the year?", createdAt: new Date('2024-10-12') },
    { text: "If money was not an issue, what would you do with your life?", createdAt: new Date('2024-10-13') },
    { text: "What are you looking forward to this week, and why?", createdAt: new Date('2024-10-14') },
    { text: "What is one aspect of your life that you're proud of?", createdAt: new Date('2024-10-15') },
    { text: "What lesson did you learn the hard way, but are glad you did?", createdAt: new Date('2024-10-16') },
    { text: "How would you describe your perfect day?", createdAt: new Date('2024-10-17') },
    { text: "What is a book, song, or movie that deeply impacted you?", createdAt: new Date('2024-10-18') },
    { text: "What does success mean to you?", createdAt: new Date('2024-10-19') },
    { text: "What is one thing you can do today to make tomorrow easier?", createdAt: new Date('2024-10-20') },
    { text: "Who do you admire most, and what qualities make them admirable?", createdAt: new Date('2024-10-21') },
    { text: "What does 'home' mean to you?", createdAt: new Date('2024-10-22') },
    { text: "What are the little things that make you feel alive?", createdAt: new Date('2024-10-23') },
    { text: "What is the kindest thing anyone has ever done for you?", createdAt: new Date('2024-10-24') },
    { text: "How do you want to be remembered, and what are you doing to build that legacy?", createdAt: new Date('2024-10-25') },
    { text: "What do you think is the greatest strength of your personality?", createdAt: new Date('2024-10-26') },
    { text: "How do you handle stress, and what can you do to better manage it?", createdAt: new Date('2024-10-27') },
    { text: "What is something new you want to try this month?", createdAt: new Date('2024-10-28') },
    { text: "If you could instantly change one thing about yourself, what would it be?", createdAt: new Date('2024-10-29') },
    { text: "What is your favorite way to relax after a long day?", createdAt: new Date('2024-10-30') },
    { text: "What is your proudest accomplishment of the past year?", createdAt: new Date('2024-10-31') }
];

const seedDatabase = async () => {
    try {
        await Question.insertMany(questions);
        console.log('Database seeded successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Failed to seed database', error);
        mongoose.connection.close();
    }
};

seedDatabase();
