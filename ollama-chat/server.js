import express from "express";
import fetch from "node-fetch"; // jeśli używasz Node.js < 18
const app = express();

app.use(express.json());
app.use(express.static("public"));

// endpoint czatu
app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    try {
        // wysyłamy prompt do lokalnej Ollamy
        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "mistral", // możesz zmienić na np. "deepseek-r1:8b"
                prompt: userMessage,
                stream: false,
            }),
        });

        const data = await response.json();
        res.json({ reply: data.response });
    } catch (error) {
        console.error("Błąd komunikacji z Ollamą:", error);
        res.status(500).json({ reply: "Błąd połączenia z Ollamą 😢" });
    }
});

app.listen(3000, () => console.log("🚀 Serwer działa na http://localhost:3000"));
