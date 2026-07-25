const roofAnalysisService = require('../services/roofAnalysisService');

/**
 * POST /api/roof/analyze
 * Body: { imageBase64, mimeType, latitude, longitude }
 */
const analyzeRoof = async (req, res) => {
  try {
    const { imageBase64, mimeType, latitude, longitude } = req.body;

    const lat = Number(latitude) || 19.0760;
    const lng = Number(longitude) || 72.8777;

    if (!imageBase64 || typeof imageBase64 !== 'string') {
      // If no image is uploaded, generate heuristic analysis based on coordinates
      const fallbackAnalysis = roofAnalysisService.generateFallbackRoofAnalysis(lat, lng);
      return res.status(200).json({
        success: true,
        message: 'Rooftop analyzed using location metrics',
        data: fallbackAnalysis,
      });
    }

    // Process image with Gemini Vision Service
    const analysis = await roofAnalysisService.analyzeRoofImage(imageBase64, mimeType, lat, lng);

    return res.status(200).json({
      success: true,
      message: 'AI Rooftop Analysis completed successfully',
      data: analysis,
    });
  } catch (err) {
    console.error('[Roof Controller Error]:', err);
    return res.status(500).json({
      success: false,
      message: err.message || 'Server error during rooftop AI analysis',
    });
  }
};

module.exports = {
  analyzeRoof,
};
