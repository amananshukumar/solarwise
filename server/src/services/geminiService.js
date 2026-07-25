const { GoogleGenAI } = require('@google/genai');

// System Prompt for SolarWise AI Assistant
const SYSTEM_PROMPT = `
You are SolarWise AI, an expert rooftop solar consultant for India.

Your job is to answer user questions regarding:
- Rooftop solar systems (sizing, 550W Monocrystalline vs Polycrystalline, inverters, battery storage)
- PM Surya Ghar Muft Bijli Yojana & State DISCOM subsidies
- Solar installation costs, maintenance, 25-year financial ROI, and break-even periods
- Net metering regulations & grid connection workflows across Indian states
- Environmental impact (CO₂ reduction, trees equivalent, coal avoided)
- Technical choices (Off-grid, Grid-tied, Hybrid systems, microinverters)

Guidelines:
1. Always answer in simple, clear, professional English.
2. Structure your answers with markdown (bold headings, bullet points, tables where relevant).
3. If calculationContext is provided in the message, use it to personalize recommendations for the user's roof, city, state, system capacity, and savings.
4. Never invent government subsidy amounts. (PM Surya Ghar rules: 1 kW = ₹30,000; 2 kW = ₹60,000; 3 kW+ = ₹78,000 max DBT).
5. If information is uncertain, clearly state so.
6. Do not answer questions outside solar energy, clean power, or sustainability. Politely explain that you are specialized in rooftop solar assistance for India.
7. Safety Rule: Never provide unsafe physical or electrical installation DIY steps. Recommend consulting DISCOM-empanelled certified solar installers for physical installation.
`;

// Helper: Smart Fallback Response Generator for Offline / Unconfigured Key
const generateFallbackSolarResponse = (userMessage, context = {}) => {
  const msg = userMessage.toLowerCase();

  const ctxInfo = context.capacity
    ? `\n\n*Personalized for your rooftop in ${context.city || 'your city'}, ${context.state || 'India'}: Recommended ${context.capacity} kW System (${Math.ceil((context.capacity * 1000)/550)} × 550W Panels) • Estimated Annual Savings: ₹${(context.annualSavings || 0).toLocaleString('en-IN')}*`
    : '';

  if (msg.includes('subsidy') || msg.includes('surya ghar') || msg.includes('government')) {
    return `### PM Surya Ghar Muft Bijli Yojana Subsidies ☀️

Under the Central Government's **PM Surya Ghar Scheme**, Indian residential homeowners receive Direct Benefit Transfer (DBT) credited directly into their bank accounts:

- **1 kW System**: ₹30,000 Subsidy
- **2 kW System**: ₹60,000 Subsidy
- **3 kW & Above Systems**: **₹78,000 Maximum Subsidy**

#### Key Eligibility Criteria:
1. Must be an Indian residential household with a valid DISCOM electricity connection.
2. The rooftop space must be shadow-free and owned/accessible by the applicant.
3. System must use MNRE-approved Tier-1 solar modules & grid-tied bi-directional Net Metering.${ctxInfo}`;
  }

  if (msg.includes('panel') || msg.includes('how many') || msg.includes('need') || msg.includes('count')) {
    const panelsNeeded = context.capacity ? Math.ceil((context.capacity * 1000) / 550) : '8 to 10';
    const kwSize = context.capacity || 4.4;
    return `### Solar Panel Capacity & Requirements 📐

For a standard Indian home:
- **Recommended Module**: 550W Monocrystalline PERC (High Efficiency ~21%).
- **System Capacity**: ~${kwSize} kW
- **Panels Required**: **${panelsNeeded} × 550W Modules**
- **Roof Space Needed**: ~${context.roofArea || 480} sq.ft of shadow-free south-facing area.

*Monocrystalline panels generate up to 12% higher power during cloudy monsoon days compared to polycrystalline panels.*${ctxInfo}`;
  }

  if (msg.includes('net meter') || msg.includes('metering') || msg.includes('discom')) {
    return `### Net Metering & Grid Connection in India 🔌

**Net Metering** allows you to export excess solar power generated during peak sunshine back to your local State DISCOM grid:

1. **Bi-directional Meter**: Records both energy consumed from the grid and solar energy exported to the grid.
2. **Monthly Billing**: You are billed only for the net difference (*Units Consumed minus Units Exported*).
3. **NOC Approval**: Takes approximately 12–18 business days after vendor installation.${ctxInfo}`;
  }

  if (msg.includes('cost') || msg.includes('price') || msg.includes('investment') || msg.includes('payback')) {
    const netCost = context.capacity ? Math.max(0, Math.round(context.capacity * 55000) - (context.capacity >= 3 ? 78000 : 60000)) : 168840;
    return `### Solar Installation Costs & Payback Timeline 💰

- **Standard Base Cost**: ~₹55,000 per kW (Includes panels, inverter, mounting structure & DISCOM wiring).
- **Govt Subsidy**: Up to ₹78,000 DBT credit.
- **Estimated Net Payable**: ~₹${netCost.toLocaleString('en-IN')}
- **Average Payback Period**: **2.5 to 3.5 Years**
- **Lifespan**: 25+ Years with 80%+ efficiency warranty.${ctxInfo}`;
  }

  // Default Expert Solar Response
  return `### SolarWise AI Assistant ☀️

Welcome! I am your AI Rooftop Solar Consultant for India. 

Here is how rooftop solar benefits your home:
- **Slash Electricity Bills**: Save up to 90% on monthly DISCOM power bills.
- **PM Surya Ghar Subsidy**: Claim up to **₹78,000 Direct Benefit Transfer**.
- **High ROI**: Capital break-even in 2.5–3 years with 25-year compounding returns.
- **Eco Impact**: Offset ~0.82 kg CO₂ per kWh generated.

*How can I help you today? Feel free to ask about panel brands, battery storage, state subsidies, or net metering!*${ctxInfo}`;
};

// Main Gemini Service Function
const generateSolarAiResponse = async (userMessage, calculationContext = {}) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_gemini_api_key_here' || apiKey.trim() === '') {
    console.log('[Gemini Service Note] No GEMINI_API_KEY provided in server/.env. Using built-in SolarWise AI fallback engine.');
    return {
      reply: generateFallbackSolarResponse(userMessage, calculationContext),
      isFallback: true,
      timestamp: new Date().toISOString(),
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Construct contextual prompt
    let contextPrompt = SYSTEM_PROMPT;

    if (calculationContext && Object.keys(calculationContext).length > 0) {
      contextPrompt += `\n\n[USER CURRENT CALCULATION CONTEXT]:\n` +
        `- Terrace Area: ${calculationContext.roofArea || 60} sq.m (${calculationContext.roofAreaSqFt || 600} sq.ft)\n` +
        `- System Size: ${calculationContext.capacity || 4.4} kW\n` +
        `- Location: ${calculationContext.city || 'Mumbai'}, ${calculationContext.state || 'Maharashtra'}\n` +
        `- Annual Savings: ₹${(calculationContext.annualSavings || 60000).toLocaleString('en-IN')}\n` +
        `- Break-even: ${calculationContext.breakEven || 2.8} Years\n` +
        `- Roof Score: ${calculationContext.suitabilityScore || 100} / 100\n`;
    }

    const fullPrompt = `${contextPrompt}\n\n[USER QUESTION]: ${userMessage}`;

    // Query Gemini 3.6 Flash model (or fallback models)
    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: fullPrompt,
      });
    } catch (modelErr) {
      console.warn('[Gemini Model Fallback] Trying gemini-2.5-flash...', modelErr.message);
      try {
        response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: fullPrompt,
        });
      } catch (err2) {
        console.warn('[Gemini Model Fallback] Using smart solar AI engine');
        return {
          reply: generateFallbackSolarResponse(userMessage, calculationContext),
          isFallback: true,
          timestamp: new Date().toISOString(),
        };
      }
    }

    const text = response.text;
    if (text && text.trim().length > 0) {
      return {
        reply: text,
        isFallback: false,
        timestamp: new Date().toISOString(),
      };
    }

    return {
      reply: generateFallbackSolarResponse(userMessage, calculationContext),
      isFallback: true,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.warn('[Gemini API Warning] Gemini request failed:', error.message);
    return {
      reply: generateFallbackSolarResponse(userMessage, calculationContext),
      isFallback: true,
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
};

module.exports = {
  generateSolarAiResponse,
};
