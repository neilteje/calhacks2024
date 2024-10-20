const axios = require('axios');
const mongoose = require('mongoose');

// MongoDB schema for storing keyword tags
const TaggedEntrySchema = new mongoose.Schema({
    originalText: {
        type: String,
        required: true,
    },
    keywords: {
        type: [String],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const TaggedEntry = mongoose.model('TaggedEntry', TaggedEntrySchema);

// Google Gemini NLP API Endpoint
const GEMINI_NLP_URL = "https://api.google-gemini.com/v1/nlp/keywords";
const API_KEY = process.env.GEMINI_API_KEY;

// Function to connect to MongoDB
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
};

// Function to fetch keywords from Gemini NLP
const fetchKeywordsFromGemini = async (text) => {
    try {
        const response = await axios.post(
            GEMINI_NLP_URL,
            { text }, // Body of the request
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                }
            }
        );

        if (response.data && response.data.keywords) {
            console.log("Keywords fetched successfully:", response.data.keywords);
            return response.data.keywords;
        } else {
            console.warn("No keywords returned.");
            return [];
        }
    } catch (error) {
        console.error("Error fetching keywords from Gemini NLP:", error);
        return [];
    }
};

// Function to save tagged data to MongoDB
const saveTaggedDataToDB = async (originalText, keywords) => {
    try {
        const taggedEntry = new TaggedEntry({
            originalText,
            keywords,
        });

        await taggedEntry.save();
        console.log("Tagged entry saved successfully to MongoDB.");
    } catch (error) {
        console.error("Failed to save tagged entry:", error);
    }
};

// Main function to process text, fetch keywords, and save to DB
const processAndTagText = async (text) => {
    try {
        await connectToMongoDB();

        // Fetch keywords from the NLP service
        const keywords = await fetchKeywordsFromGemini(text);

        // Save the keywords along with the original text
        await saveTaggedDataToDB(text, keywords);

        console.log("Process completed.");
    } catch (error) {
        console.error("Error during the process:", error);
    } finally {
        mongoose.disconnect();
    }
};

// Execute function (Example usage)
(async () => {
    const sampleText = "Artificial Intelligence is transforming the world of technology.";
    await processAndTagText(sampleText);
})();
