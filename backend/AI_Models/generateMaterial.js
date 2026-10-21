const axios = require("axios");

exports.generateDaywiseMaterial = async (req, res) => {
  try {
    const { course_name, day, title, topics } = req.body;

    if (!course_name || !title) {
      return res.status(400).json({
        message: "Missing required fields. Please provide course_name and title."
      });
    }

    const dayNumber = Number(day) || 1;
    const topicsPrompt = topics || title;

    const materialGenerationPrompt = `
ROLE
You are an expert educator and a strict JSON generator. Your entire response is consumed by a program, so it must be valid JSON and nothing else.

TASK
Generate comprehensive, engaging, structured daily learning material for a course lesson.
- Course: ${course_name}
- Day: ${dayNumber}
- Lesson Title: ${title}
- Key Topics / Focus: ${topicsPrompt}

OUTPUT FORMAT
Return a single JSON object with this exact structure:
{
  "day": ${dayNumber},
  "title": "${title}",
  "topics": "${topicsPrompt}",
  "material": [
    {
      "heading": "Clear Section Heading (e.g., Introduction to the Topic)",
      "learning_para": "A detailed, engaging, and educational explanation of this concept with clear explanations, practical context, and code/design insights."
    },
    {
      "heading": "Core Architecture & Principles",
      "learning_para": "In-depth explanation covering how this works under the hood and best practices."
    },
    {
      "heading": "Practical Application & Best Practices",
      "learning_para": "Hands-on advice on implementing this concept in real-world projects and common pitfalls to avoid."
    }
  ]
}

RULES
1. Output ONLY the JSON object. Do not add markdown, code fences, comments, or any text before or after it.
2. The "material" array must contain between 3 to 4 detailed sections.
3. Each section must have an engaging "heading" and a comprehensive "learning_para" (3-5 sentences each).
4. The JSON must be perfectly formed without trailing commas.
`;

    const ollamaRequestPayload = {
      model: "llama3.1:latest",
      prompt: materialGenerationPrompt,
      stream: false,
      format: "json"
    };

    try {
      const ollamaRes = await axios.post(
        "http://localhost:11434/api/generate",
        ollamaRequestPayload,
        { timeout: 60000 }
      );

      const generatedText = ollamaRes.data?.response;
      let parsed = null;
      if (typeof generatedText === "string") {
        try {
          parsed = JSON.parse(generatedText);
        } catch {
          const match = generatedText.match(/\{[\s\S]*\}/);
          if (match) parsed = JSON.parse(match[0]);
        }
      } else if (generatedText && typeof generatedText === "object") {
        parsed = generatedText;
      }

      if (parsed && Array.isArray(parsed.material)) {
        return res.status(200).json(parsed);
      }
    } catch (ollamaErr) {
      console.warn("Ollama AI generation failed or timed out:", ollamaErr.message);
    }

    // Intelligent fallback if Ollama model is offline
    const fallbackMaterial = {
      day: dayNumber,
      title: title,
      topics: topicsPrompt,
      material: [
        {
          heading: `Introduction to ${title} 🚀`,
          learning_para: `Welcome to Day ${dayNumber} of ${course_name}. Today we explore ${title}, covering key fundamentals including ${topicsPrompt}. Understanding these concepts is essential for building robust and scalable applications.`
        },
        {
          heading: `Core Concepts & Architecture 🏗️`,
          learning_para: `When working with ${title}, understanding the underlying principles allows you to make informed engineering choices. We focus on separation of concerns, maintainability, and clean code conventions.`
        },
        {
          heading: `Practical Implementation & Real-World Use 💡`,
          learning_para: `In production environments, ${title} is used to solve real user challenges. Always consider error handling, performance implications, and follow industry best practices.`
        }
      ]
    };

    return res.status(200).json(fallbackMaterial);

  } catch (error) {
    console.error("Material generation error:", error);
    return res.status(500).json({ message: "Failed to generate material", error: error.message });
  }
};
