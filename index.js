const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI('AIzaSyDv7lN5iXebaebJ8nj10g3lOGWyqoESHso'); // Create client instance

app.post('/api/chat', async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const { message } = req.body;
    
    const prompt = `You're a safety assistant from INDIA. Respond to: "${message}". Include safety tips, emergency contacts, or location-based help. Keep responses under 100 words.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    res.json({ text });
  } catch (error) {
    console.error('Gemini error:', error);
    res.status(500).json({ error: 'Error processing your request' });
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
