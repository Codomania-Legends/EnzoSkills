const axios = require("axios");

exports.generateAssessment = async (clientRequest, serverResponse) => {
  try {
    const { course_name, assessment_name, numberOfQuestions } = clientRequest.body;

    // 🛑 1. Input Validation
    if (!course_name || !assessment_name) {
      return serverResponse.status(400).json({
        message: "Missing required fields. Please provide course_name, week, day, and assessment_name."
      });
    }

    const count = Number.isInteger(Number(numberOfQuestions)) && Number(numberOfQuestions) > 0
  ? Number(numberOfQuestions)
  : 10;

const assessmentGenerationPrompt = `
ROLE
You are an expert educator and a strict JSON generator. Your entire response is consumed by a program, so it must be valid JSON and nothing else.

TASK
Create a multiple-choice assessment.
- Course: ${course_name}
- Assessment title: ${assessment_name}
- Number of questions: ${count}

The questions must test knowledge of the course topic above and match the focus of the assessment title.

OUTPUT FORMAT
Return a single JSON object with this exact structure:

{
  "questions": [
    {
      "id": "question_1",
      "question": "What is the primary purpose of console.log() in JavaScript?",
      "options": [
        "To print output to the console",
        "To declare a variable",
        "To create a function",
        "To import a module"
      ],
      "answer": "To print output to the console"
    }
  ]
}

RULES
1. Output only the JSON object. Do not add markdown, code fences, comments, or any text before or after it.
2. The "questions" array must contain exactly ${count} objects.
3. Each "id" must be sequential: "question_1", "question_2", up to "question_${count}".
4. Each "question" must be a clear, complete question string.
5. Each "options" array must contain exactly 4 strings, all different from each other, with only one correct option.
6. Each "answer" must be an exact, word-for-word copy of one of the 4 strings in that question's "options" array.
7. Place the correct option at varied positions across questions. Do not always make it the first one.
8. Do not use labels like "A)", "B)" or "1." inside the option strings.
9. The JSON must be perfectly formed. Close all arrays and objects, escape special characters inside strings, and do not use trailing commas.

BEFORE YOU RESPOND
Check that:
- The array has exactly ${count} questions.
- Every question has 4 options and an "answer" key.
- Every "answer" matches one option exactly.
- The output parses with JSON.parse without errors.
`;

    const ollamaRequestPayload = {
      model: "qwen2.5:0.5b",
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