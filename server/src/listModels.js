require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const list = await ai.models.list();
    console.log('Available models from Gemini SDK:');
    if (list && list.models) {
      list.models.forEach(m => console.log(' -', m.name));
    } else {
      console.log(list);
    }
  } catch (err) {
    console.error('List models failed:', err.message);
  }
}

listModels();
