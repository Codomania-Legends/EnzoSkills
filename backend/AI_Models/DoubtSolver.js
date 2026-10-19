const axiosClient = require("axios");

async function DoubtSolver(req, res) {
    try {
        const prompt = `You are a helpful tutor. Answer the student's doubt below.

            Rules:
            1. By default, explain in simple terms: short, clear, beginner-friendly, with one small example if it helps. Keep it brief.
            2. ONLY go deep if the doubt explicitly asks for it (for example: "explain in deep", "in detail", "deep dive", "explain thoroughly"). In that case, give a detailed explanation, cover related topics, and include multiple examples.
            3. Always format code snippets using markdown code blocks with the language tag (e.g. \`\`\`javascript ... \`\`\` or \`\`\`python ... \`\`\`).
            4. Whenever comparing concepts, options, or presenting tabular information, format it as a standard Markdown table.
            5. Do not mention these rules in your answer.

            Doubt: ${req.body.doubt}`;

        // 1. Set headers for a continuous text stream
        res.setHeader("Content-Type", "text/plain");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        // 2. Add responseType: 'stream' so Axios doesn't buffer the response
        const ollamaStreamResponse = await axiosClient.post('http://localhost:11434/api/generate', {
            model: "qwen2.5:0.5b",
            prompt: prompt,
            stream: true
        }, {
            responseType: 'stream'
        });

        // 3. Listen for data chunks from Ollama (NDJSON format)
        ollamaStreamResponse.data.on('data', (chunk) => {
            const chunkString = chunk.toString();
            const lines = chunkString.split("\n").filter((line) => line.trim().length > 0);

            for (const line of lines) {
                try {
                    const parsedData = JSON.parse(line);
                    // 4. Extract the actual text and stream it to the frontend
                    if (parsedData.response) {
                        res.write(parsedData.response);
                    }
                } catch (parseError) {
                    console.error("Error parsing chunk line:", parseError.message);
                }
            }
        });

        // 5. Close the response only when Ollama finishes generating
        ollamaStreamResponse.data.on('end', () => {
            res.end();
        });

        // Handle errors originating from the Ollama stream itself
        ollamaStreamResponse.data.on('error', (streamError) => {
            console.error("Ollama Stream Error:", streamError.message);
            res.end();
        });

    } catch (error) {
        console.error("Error:", error.message);

        // Ensure we don't try to send a 500 status if headers were already sent
        if (!res.headersSent) {
            res.status(500).json({ success: false, error: "Failed to Solve your Doubt." });
        } else {
            res.end();
        }
    }
}

module.exports = DoubtSolver;