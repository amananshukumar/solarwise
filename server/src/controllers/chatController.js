const { generateSolarAiResponse } = require('../services/geminiService');

// @desc    Process user question with optional calculationContext
// @route   POST /api/chat
// @access  Public
const handleChatRequest = async (req, res) => {
  try {
    const { message, calculationContext } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Message content is required',
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        message: 'Message exceeds maximum length of 2000 characters',
      });
    }

    const aiResult = await generateSolarAiResponse(message, calculationContext);

    return res.json({
      success: true,
      reply: aiResult.reply,
      isFallback: aiResult.isFallback,
      timestamp: aiResult.timestamp,
    });
  } catch (error) {
    console.error('Chat Controller Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate AI response: ' + error.message,
    });
  }
};

module.exports = {
  handleChatRequest,
};
