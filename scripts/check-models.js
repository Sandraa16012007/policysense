const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: ".env.local" });

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    const models = await genAI.listModels();
    console.log("Available Models:");
    models.forEach((m) => {
      console.log(`- ${m.name} (${m.supportedGenerationMethods})`);
    });
  } catch (err) {
    console.error("Failed to list models:", err.message);
  }
}

listModels();
