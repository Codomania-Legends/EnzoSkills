const axiosClient = require("axios");
const HISTORY = require("../Models/History");

async function DoubtSolver(req, res) {
    try {
        let formattedContext = "";
        if (Array.isArray(req.body.context)) {
            formattedContext = req.body.context
                .map(item => {
                    if (typeof item === "object" && item !== null) {
                        const roleLabel = item.role === "user" ? "Student" : "Tutor";
                        return `${roleLabel}: ${item.content}`;
                    }
                    return String(item);
                })
                .join("\n\n");
        } else if (typeof req.body.context === "string") {
            formattedContext = req.body.context;
        }

        console.log("Context for doubt solver:\n", formattedContext);

        const prompt = `You are a helpful tutor related to Computer and technical world. Answer the student's doubt below.

            Rules:
            1. By default, explain in simple terms: short, clear, beginner-friendly, with one small example if it helps. Keep it brief.
            2. ONLY go deep if the doubt explicitly asks for it (for example: "explain in deep", "in detail", "deep dive", "explain thoroughly"). In that case, give a detailed explanation, cover related topics, and include multiple examples.
            3. Always format code snippets using markdown code blocks with the language tag (e.g. \`\`\`javascript ... \`\`\` or \`\`\`python ... \`\`\`).
            4. Whenever comparing concepts, options, or presenting tabular information, format it as a standard Markdown table.
            5. If the student's doubt is a follow-up or shorthand request (e.g., asking for "difference in tables", "give examples", "summarize"), use the Previous Conversation context to understand what concepts they are referring to.
            6. Do not mention these rules in your answer.

            Previous Conversation Context:
            ${formattedContext || "None"}

            Current Student Doubt: ${req.body.doubt}
            `;

        // Log Action 4: Learn with AI
        const activeUserId = req.body.user_id || req.body.userId;
        if (activeUserId) {
            HISTORY.create({
                user_id: activeUserId,
                action_type: "AI_LEARN",
                action_title: "Learned with AI",
                action_description: `Asked AI technical doubt: ${(req.body.doubt || "").slice(0, 80)}`
            }).catch(e => console.error("Error logging AI activity:", e.message));
        }

        // 1. Set headers for a continuous streaming response
        res.setHeader("Content-Type", "application/x-ndjson; charset=utf-8");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        // 2. Request stream from bonsai-2:9b
        const ollamaStreamResponse = await axiosClient.post(
            'http://localhost:11434/api/generate',
            {
                model: "qwen2.5:0.5b",
                // model: "bonsai-2:9b",
                // model: "lfm3:latest",
                prompt: prompt,
                stream: true
            },
            {
                responseType: 'stream',
                timeout: 600000 // 10 minutes timeout for deep reasoning
            }
        );

        // 3. Line buffering to prevent broken JSON chunks across network packets
        let chunkBuffer = "";

        ollamaStreamResponse.data.on('data', (rawChunk) => {
            try {
                chunkBuffer += rawChunk.toString();
                const lines = chunkBuffer.split("\n");
                chunkBuffer = lines.pop() || "";

                for (const line of lines) {
                    const trimmedLine = line.trim();
                    if (!trimmedLine) continue;

                    const parsedData = JSON.parse(trimmedLine);

                    // 4. Stream thinking tokens first, then content tokens
                    if (parsedData.thinking) {
                        res.write(JSON.stringify({ type: "thinking", content: parsedData.thinking }) + "\n");
                    }
                    if (parsedData.response) {
                        res.write(JSON.stringify({ type: "content", content: parsedData.response }) + "\n");
                    }
                }
            } catch (parseError) {
                console.error("Error parsing stream chunk:", parseError.message);
            }
        });

        // 5. Close response when Ollama completes
        ollamaStreamResponse.data.on('end', () => {
            if (chunkBuffer.trim()) {
                try {
                    const parsedData = JSON.parse(chunkBuffer.trim());
                    if (parsedData.thinking) {
                        res.write(JSON.stringify({ type: "thinking", content: parsedData.thinking }) + "\n");
                    }
                    if (parsedData.response) {
                        res.write(JSON.stringify({ type: "content", content: parsedData.response }) + "\n");
                    }
                } catch (flushError) {
                    console.error("Error flushing remaining chunk:", flushError.message);
                }
            }
            res.write(JSON.stringify({ type: "done" }) + "\n");
            res.end();
        });

        // Handle errors originating from the Ollama stream itself
        ollamaStreamResponse.data.on('error', (streamError) => {
            console.error("Ollama Stream Error:", streamError.message);
            res.end();
        });

    } catch (error) {
        console.error("Error in DoubtSolver:", error.message);

        // Ensure we don't try to send a 500 status if headers were already sent
        if (!res.headersSent) {
            res.status(500).json({ success: false, error: "Failed to Solve your Doubt." });
        } else {
            res.end();
        }
    }
}

module.exports = DoubtSolver;
