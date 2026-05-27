const axiosClient = require("axios");

async function getMotivationalQuotes(req, res) {
    try {
        const quotePrompt = `
        Write a short, highly motivational quote to start the day.

        # IMPORTANT RULES:
        1. The quote MUST be exactly 5 words long.
        2. The quote MUST start with the word "The".
        3. The tone MUST be encouraging, positive, and inspiring.
        4. The quote MUST be suitable for a beginner.
        5. The quote MUST NOT contain any numbers or statistics.
        6. Do NOT add any explanation or text after the quote.
        7. Output ONLY the quote itself.
    `;

        const ollamaApiResponse = await axiosClient.post('http://localhost:11434/api/generate', {
            model: "qwen2:0.5b",
            prompt: quotePrompt,
            stream: false
        });

        const generatedQuoteText = ollamaApiResponse.data.response;
        res.json({ success: true, quote: generatedQuoteText });
    } catch (backendError) {
        console.error("Error communicating with local AI:", backendError);
        res.status(500).json({ success: false, error: "Failed to generate local quote" }); // ❌
    }
}

module.exports = getMotivationalQuotes;