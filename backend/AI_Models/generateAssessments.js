const axios = require("axios");

exports.generateAssessment = async (clientRequest, serverResponse) => {
  try {
    const { course_id, course_name, week, day, assessment_name } = clientRequest.body;

    // 🛑 1. Input Validation: Ensure we have the minimum required data before calling the LLM
    if (!course_name || !week || !day || !assessment_name) {
      return serverResponse.status(400).json({
        message: "Missing required fields. Please provide course_name, week, day, and assessment_name."
      });
    }

    const assessmentGenerationPrompt = `
You are an expert educator and a strict JSON generator. 🎓🤖
I am currently learning the course: ${course_name} at Week: ${week}, Day: ${day}. 📅

Please generate a ${assessment_name} containing exactly 10 multiple-choice questions. 📝

CRITICAL RULES THAT MUST BE FOLLOWED: ⚠️
1. OUTPUT STRICTLY VALID JSON ONLY. 🧱 Do not include markdown formatting (like \`\`\`json), do not include greetings, conversational text, or explanations. 🚫
2. Every single question object MUST contain exactly 4 options in the "options" array. 🔢
3. Every single question object MUST contain an "answer" key. 🔑
4. The string provided in the "answer" key MUST be an exact, word-for-word copy of one of the strings inside the "options" array. 📋 Do not hallucinate answers. 🧠
5. Ensure the JSON is perfectly formed. ✅ All arrays and objects must be properly closed without trailing commas. 🛑

FOLLOW THIS EXACT JSON STRUCTURE: 🏗️
{
  "questions": [
    {
      "id": "question_1",
      "question": "What is the primary purpose of console.log() in JavaScript?",
      "options": [
        "To output debugging information and data to the web console.",
        "To interact with the user via a popup window.",
        "To create and manipulate graphical objects on the screen.",
        "To save data permanently to a database."
      ],
      "answer": "To output debugging information and data to the web console."
    }
  ]
}
`;

    // 🚀 2. Call local Ollama instance with an explicit timeout
    // LLMs can take time, especially locally. A timeout prevents the request from hanging indefinitely.
    const ollamaRequestPayload = {
      model: "gemini-3-flash-preview",
      prompt: assessmentGenerationPrompt,
      stream: false,
      format: "json"
    };

    const ollamaNetworkResponse = await axios.post(
      'http://localhost:11434/api/generate',
      ollamaRequestPayload,
      { timeout: 300000 } // ⏱️ 2-minute timeout buffer
    );

    let rawLlmOutputString = ollamaNetworkResponse.data.response;

    // 🛡️ 3. Safety Buffer: Strip markdown formatting
    rawLlmOutputString = rawLlmOutputString.replace(/```json/gi, '').replace(/```/g, '').trim();

    // 🧩 4. Safely parse the JSON string
    let parsedAssessmentJson;
    try {
      parsedAssessmentJson = JSON.parse(rawLlmOutputString);
    } catch (jsonParseError) {
      console.error("Failed to parse Ollama output into JSON:", jsonParseError);
      console.error("Raw Output was:", rawLlmOutputString);
      return serverResponse.status(502).json({
        message: "The AI model returned malformed data that could not be read.",
        error: jsonParseError.message
      });
    }

    console.log("Successfully generated assessment data:", parsedAssessmentJson);

    // 📨 5. Send proper JSON back to the client
    return serverResponse.status(200).json(parsedAssessmentJson);

  } catch (processError) {
    console.error("Assessment generation process failed:", processError);

    // Check if the error was a timeout or network issue with Axios
    if (processError.code === 'ECONNABORTED' || processError.isAxiosError) {
      return serverResponse.status(503).json({
        message: "Failed to connect to the local AI service or the request timed out.",
        error: processError.message
      });
    }

    return serverResponse.status(500).json({
      message: "An unexpected error occurred while generating the assessment.",
      error: processError.message
    });
  }
};