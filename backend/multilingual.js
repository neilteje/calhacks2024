const express = require('express');
const axios = require('axios');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Load API Keys from environment variables
const CARTESIA_API_KEY = process.env.CARTESIA_API_KEY;

// Set Cartesia API endpoint and headers
const SONIC_API_ENDPOINT = "https://api.cartesia.ai/sonic";
const HEADERS = {
  "Authorization": `Bearer ${CARTESIA_API_KEY}`,
  "Content-Type": "application/json",
};

// Utility Function: Create Request for Sonic Multilingual
const createSonicRequest = async (text, targetLang) => {
  try {
    const payload = {
      model: 'sonic-multilingual',
      input: text,
      targetLanguage: targetLang,
      options: {
        voice: targetLang === 'es' ? 'sonic-spanish' : 'sonic-english',
        speed: 1.0,
        emotion: 'neutral',
      },
    };

    const response = await axios.post(`${SONIC_API_ENDPOINT}/translate`, payload, { headers: HEADERS });
    return response.data;
  } catch (error) {
    console.error('Error creating Sonic request:', error);
    throw new Error('Failed to create Sonic request');
  }
};

// Utility Function: Convert Audio to Different Language
const translateAudioFile = async (audioFilePath, sourceLang, targetLang) => {
  try {
    const audioData = fs.readFileSync(audioFilePath);
    const base64Audio = audioData.toString('base64');

    const payload = {
      model: 'sonic-multilingual',
      input: base64Audio,
      sourceLanguage: sourceLang,
      targetLanguage: targetLang,
      options: {
        speed: 1.0,
        emotion: 'neutral',
        continuation: true,
      },
    };

    const response = await axios.post(`${SONIC_API_ENDPOINT}/translate-audio`, payload, { headers: HEADERS });
    return response.data.translatedAudioUrl;
  } catch (error) {
    console.error('Error translating audio file:', error);
    throw new Error('Failed to translate audio file');
  }
};

// Route 1: Text Translation
app.post('/translate-text', express.json(), async (req, res) => {
  const { text, targetLang } = req.body;

  try {
    const result = await createSonicRequest(text, targetLang);
    res.json({ translatedText: result.translatedText, audioUrl: result.audioUrl });
  } catch (error) {
    res.status(500).send('Failed to translate text.');
  }
});

// Route 2: Audio File Upload and Translation
app.post('/translate-audio', upload.single('audioFile'), async (req, res) => {
  const { sourceLang, targetLang } = req.body;
  const audioFilePath = path.join(__dirname, req.file.path);

  try {
    const translatedAudioUrl = await translateAudioFile(audioFilePath, sourceLang, targetLang);
    res.json({ translatedAudioUrl });
  } catch (error) {
    res.status(500).send('Failed to translate audio.');
  } finally {
    fs.unlinkSync(audioFilePath); // Clean up the uploaded file
  }
});

// Route 3: Language Conversion Status
app.get('/conversion-status/:conversionId', async (req, res) => {
  const { conversionId } = req.params;

  try {
    const response = await axios.get(`${SONIC_API_ENDPOINT}/conversion-status/${conversionId}`, { headers: HEADERS });
    res.json(response.data);
  } catch (error) {
    console.error('Error checking conversion status:', error);
    res.status(500).send('Failed to fetch conversion status');
  }
});

// Route 4: List Supported Languages
app.get('/supported-languages', async (req, res) => {
  try {
    const response = await axios.get(`${SONIC_API_ENDPOINT}/languages`, { headers: HEADERS });
    res.json(response.data.languages);
  } catch (error) {
    console.error('Error fetching supported languages:', error);
    res.status(500).send('Failed to fetch supported languages');
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
