const OpenAI = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_KEY });

// AI Tools Dashboard Page
exports.toolsHome = (req, res) => {
    res.render("ai/ai_tools");
};

// SUMMARY
exports.summarizeText = async (req, res) => {
    try {
        const { text } = req.body;

        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Summarize the following text simply." },
                { role: "user", content: text }
            ]
        });

        res.render("ai/result", { result: response.choices[0].message.content });
    } catch (err) {
        res.send("Error: " + err.message);
    }
};

// MCQ Generator
exports.generateMCQ = async (req, res) => {
    try {
        const { topic } = req.body;

        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Generate 5 MCQs with answers." },
                { role: "user", content: `Topic: ${topic}` }
            ]
        });

        res.render("ai/result", { result: response.choices[0].message.content });
    } catch (err) {
        res.send("Error: " + err.message);
    }
};

// Answer Improver
exports.improveAnswer = async (req, res) => {
    try {
        const { answer } = req.body;

        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Improve the quality of this answer." },
                { role: "user", content: answer }
            ]
        });

        res.render("ai/result", { result: response.choices[0].message.content });
    } catch (err) {
        res.send("Error: " + err.message);
    }
};

// Explain Concept
exports.explainTopic = async (req, res) => {
    try {
        const { topic } = req.body;

        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Explain the topic in simple words." },
                { role: "user", content: topic }
            ]
        });

        res.render("ai/result", { result: response.choices[0].message.content });
    } catch (err) {
        res.send("Error: " + err.message);
    }
};