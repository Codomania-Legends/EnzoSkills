const axiosClient = require("axios");

async function DoubtSolver(req, res) {
    try {
        const promptText = `
            Explain in detail this question, cover topics which are related to this question. Provide examples and make sure the explanation is easy to understand.

            Doubt: ${req.body.doubt}
        `;

        console.log(req.body.doubt);

        // 1. Set headers for a continuous text stream
        res.setHeader("Content-Type", "text/plain");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        // 2. Add responseType: 'stream' so Axios doesn't buffer the response
        const ollamaStreamResponse = await axiosClient.post('http://localhost:11434/api/generate', {
            model: "qwen2:0.5b",
            prompt: promptText,
            stream: true
        }, {
            responseType: 'stream'
        });

        // 3. Listen for data chunks from Ollama
        ollamaStreamResponse.data.on('data', (chunk) => {
            try {
                // Ollama sends buffer chunks that look like: {"model":"...","response":"Hello","done":false}
                const chunkString = chunk.toString();
                const parsedData = JSON.parse(chunkString);

                // 4. Extract the actual text and stream it to the frontend
                if (parsedData.response) {
                    res.write(parsedData.response);
                }
            } catch (parseError) {
                console.error("Error parsing chunk:", parseError.message);
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