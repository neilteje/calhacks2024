// hyperbolicAPI.js
const fetch = require('node-fetch');

const HYPERBOLIC_API_KEY = 'YOUR_HYPERBOLIC_API_KEY';
const BASE_URL = 'https://api.hyperbolic.xyz/v1';

const generateAudio = async (text) => {
  try {
    const url = `${BASE_URL}/audio/generation`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${HYPERBOLIC_API_KEY}`,
      },
      body: JSON.stringify({
        text,
        speed: 1, 
        voice: 'Melo-TTS', 
      }),
    });

    const result = await response.json();
    if (result.audio) {
      console.log("Generated audio URL:", result.audio);
      return result.audio;
    } else {
      console.error("Error in response:", result);
      return null;
    }
  } catch (error) {
    console.error("Failed to generate audio:", error);
    return null;
  }
};

module.exports = {
  generateAudio,
};
