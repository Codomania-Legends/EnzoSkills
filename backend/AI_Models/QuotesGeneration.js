// Resilient, instant motivational quote generator (0ms latency, zero external crashes)
const quotes = [
    "The journey starts with curiosity.",
    "The best code is simple.",
    "The future belongs to builders.",
    "The code speaks for itself.",
    "The secret to mastery: consistency.",
    "The bug teaches the lesson.",
    "The process shapes the developer.",
    "The breakthrough follows the struggle.",
    "The daily practice builds champions.",
    "The keyboard unlocks endless possibilities.",
    "The challenge makes you stronger.",
    "The first step is courage.",
    "The disciplined mind writes clean.",
    "The quiet hours build greatness.",
    "The greatest skill is persistence."
];

async function getMotivationalQuotes(req, res) {
    try {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        res.json({ success: true, quote: randomQuote });
    } catch {
        res.json({ success: true, quote: "The future belongs to builders." });
    }
}

module.exports = getMotivationalQuotes;