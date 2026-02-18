import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/ask", async (req, res) => {
  try {
    const { question, mode } = req.body;

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `Explain this science topic in ${mode} mode: ${question}`,
    });

    res.json({
      answer: response.output[0].content[0].text
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(10000, () => {
  console.log("Server running...");
});
