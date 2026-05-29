const axios = require("axios");

exports.generateAssessment = async (clientRequest, serverResponse) => {
  try {
    const { course_id, course_name, week, day, assessment_name } = clientRequest.body;

    // 🛑 1. Input Validation
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
1. OUTPUT STRICTLY VALID JSON ONLY. 🧱
2. Every single question object MUST contain exactly 4 options in the "options" array. 🔢
3. Every single question object MUST contain an "answer" key. 🔑
4. The string provided in the "answer" key MUST be an exact, word-for-word copy of one of the strings inside the "options" array. 📋
5. Ensure the JSON is perfectly formed. ✅ All arrays and objects must be properly closed without trailing commas. 🛑

FOLLOW THIS EXACT JSON STRUCTURE: 🏗️
{
  "questions": [
    {
      "id": "question_1",
      "question": "What is the primary purpose of console.log()?",
      "options": ["A", "B", "C", "D"],
      "answer": "A"
    }
  ]
}
`;

    const ollamaRequestPayload = {
      model: "llama3.1",
      prompt: assessmentGenerationPrompt,
      stream: true, // 🌊 2. TURN STREAMING ON!
      format: "json"
    };

    // 🚀 3. Call Ollama and tell Axios we want a STREAM back
    const ollamaStreamResponse = await axios.post(
      'http://localhost:11434/api/generate',
      ollamaRequestPayload,
      { 
        responseType: 'stream', // 🚰 CRITICAL: Tell Axios to handle this as a stream
        timeout: 600000 // ⏱️ 10 minutes, just in case the connection drops completely
      }
    );

    // 📨 4. Prepare the Express response for Streaming to the Frontend
    serverResponse.setHeader('Content-Type', 'text/plain');
    serverResponse.setHeader('Transfer-Encoding', 'chunked');

    // 🧩 5. Process the chunks of data as they arrive from Ollama
    ollamaStreamResponse.data.on('data', (rawChunk) => {
      try {
        // Ollama sends text chunks that look like: {"model":"llama","response":"{","done":false}
        // Sometimes multiple JSON objects arrive in one chunk, separated by newlines
        const textLines = rawChunk.toString().split('\n').filter(line => line.trim() !== '');
        
        for (const line of textLines) {
          const parsedChunk = JSON.parse(line);
          
          if (parsedChunk.response) {
            // Write just the actual generated character/word to the client! ✍️
            serverResponse.write(parsedChunk.response);
          }
        }
      } catch (parseError) {
        console.error("Error parsing a stream chunk:", parseError);
      }
    });

    // 🏁 6. Close the connection when Ollama is completely finished
    ollamaStreamResponse.data.on('end', () => {
      console.log("Stream completed successfully! 🎉");
      serverResponse.end(); 
    });

    // 🚨 7. Handle stream errors
    ollamaStreamResponse.data.on('error', (streamError) => {
      console.error("Stream encountered an error:", streamError);
      if (!serverResponse.headersSent) {
        serverResponse.status(500).json({ error: "Stream failed mid-way." });
      } else {
        serverResponse.end();
      }
    });

  } catch (processError) {
    console.error("Assessment generation process failed:", processError);
    if (!serverResponse.headersSent) {
        return serverResponse.status(500).json({
        message: "Failed to connect to the local AI service.",
        error: processError.message
        });
    }
  }
};