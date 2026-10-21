const axios = require("axios");

exports.generateAssessment = async (clientRequest, serverResponse) => {
  try {
    const { course_name, assessment_name, numberOfQuestions } = clientRequest.body;

    // 🛑 1. Input Validation
    if (!course_name || !assessment_name) {
      return serverResponse.status(400).json({
        message: "Missing required fields. Please provide course_name and assessment_name."
      });
    }

    const count = Number.isInteger(Number(numberOfQuestions)) && Number(numberOfQuestions) > 0
      ? Number(numberOfQuestions)
      : 10;

    // 🪄 2. Cured Prompt: No concrete example question, diverse topic coverage, strict schema format
    const assessmentGenerationPrompt = `
You are an expert technical curriculum designer and senior instructor.
Create an original, comprehensive multiple-choice assessment based on the specifications below.

ASSESSMENT SPECIFICATIONS:
- Course: ${course_name}
- Assessment Topic: ${assessment_name}
- Total Questions: Exactly ${count}

STRICT GENERATION RULES:
1. TOPIC FOCUS & RELEVANCE:
   - Every question must directly test key concepts, syntax, architectural principles, edge cases, or practical problem-solving specifically for "${assessment_name}" in the context of "${course_name}".
   - Do NOT include generic, irrelevant, or placeholder questions.

2. DIVERSITY & QUALITY:
   - Provide a fresh, varied question set covering different facets and subtopics of "${assessment_name}".
   - Include a balanced mix of difficulty levels: beginner fundamentals, intermediate scenarios, and advanced troubleshooting or best practices.
   - Ensure every question is completely distinct and unique. Avoid repeating similar questions or merely rewording choices.

3. OPTIONS & ANSWER INTEGRITY:
   - Each question must have exactly 4 distinct, plausible options.
   - Exactly one option must be correct. The remaining 3 options must be realistic, intelligent distractors representing common misconceptions or errors.
   - Do NOT prefix options with letters or numbers (e.g., do NOT use "A)", "B)", "1.", "a."). Only provide the clean option text.
   - The "answer" field MUST be a strict, character-for-character copy of the correct option string from the "options" array.
   - Shuffle the position of the correct answer randomly across the 4 options. Do NOT always place the correct answer as the first option.

4. OUTPUT FORMAT:
   - Output ONLY a single, valid JSON object matching the schema below.
   - Do NOT wrap your output in markdown code blocks (\`\`\`json ... \`\`\`), do NOT include introductory text, commentary, or post-generation notes.
   - Your response must be directly parseable by JSON.parse.

JSON SCHEMA:
{
  "questions": [
    {
      "id": "question_1",
      "question": "<string: clear, well-phrased question testing a specific concept>",
      "options": [
        "<string: plausible option>",
        "<string: plausible option>",
        "<string: plausible option>",
        "<string: plausible option>"
      ],
      "answer": "<string: exact match to one of the 4 options above>"
    }
  ]
}

CRITICAL:
- The schema above illustrates only the required keys and types. Do NOT output placeholder text such as "<string: ...>". Generate real, thoughtful questions and options.
- The "questions" array MUST contain exactly ${count} objects, with IDs sequentially from "question_1" through "question_${count}".
`;

    // 🎲 3. Request Payload with dynamic seed & sampling options to prevent duplicate questions
    const ollamaRequestPayload = {
      model: "llama3.1:latest",
      prompt: assessmentGenerationPrompt,
      stream: true,
      format: "json",
      options: {
        temperature: 0.8, // Balances creativity and adherence to schema
        top_p: 0.9,       // Nucleus sampling for diverse vocabulary and question structures
        top_k: 40,
        seed: Math.floor(Math.random() * 2147483647) // Randomized seed ensures a brand new question set on every run
      }
    };

    // 🚀 4. Call Ollama with streaming enabled
    const ollamaStreamResponse = await axios.post(
      'http://localhost:11434/api/generate',
      ollamaRequestPayload,
      { 
        responseType: 'stream',
        timeout: 600000 // 10 minutes timeout
      }
    );

    // 📨 5. Prepare the Express response for Streaming to the Frontend
    serverResponse.setHeader('Content-Type', 'text/plain');
    serverResponse.setHeader('Transfer-Encoding', 'chunked');

    // 🧩 6. Process the chunks of data as they arrive with line buffering
    let chunkBuffer = "";

    ollamaStreamResponse.data.on('data', (rawChunk) => {
      try {
        chunkBuffer += rawChunk.toString();
        const textLines = chunkBuffer.split('\n');
        
        // Keep the last incomplete line in chunkBuffer
        chunkBuffer = textLines.pop() || "";
        
        for (const line of textLines) {
          const trimmedLine = line.trim();
          if (!trimmedLine) continue;

          const parsedChunk = JSON.parse(trimmedLine);
          if (parsedChunk.response) {
            serverResponse.write(parsedChunk.response);
          }
        }
      } catch (parseError) {
        console.error("Error parsing a stream chunk:", parseError);
      }
    });

    // 🏁 7. Close the connection when Ollama finishes
    ollamaStreamResponse.data.on('end', () => {
      // Flush any remaining buffered line
      if (chunkBuffer.trim()) {
        try {
          const parsedChunk = JSON.parse(chunkBuffer.trim());
          if (parsedChunk.response) {
            serverResponse.write(parsedChunk.response);
          }
        } catch (flushError) {
          console.error("Error parsing trailing stream chunk:", flushError);
        }
      }
      console.log("Stream completed successfully! 🎉");
      serverResponse.end(); 
    });

    // 🚨 8. Handle stream errors
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