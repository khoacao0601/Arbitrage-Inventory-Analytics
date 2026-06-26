import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildAssistantPrompt } from '../config/prompts';

// Get API key from .env
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("GEMINI_API_KEY is not available in .env");
}

const genAI = new GoogleGenerativeAI(apiKey || '');

export const streamChat = async (req: Request, res: Response) => {
    try {

        const { message, context } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        // 1. Prevent NodeJs to hold Chunk (Chỉ set header 1 lần duy nhất)
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Transfer-Encoding', 'chunked');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        // 2. Force Express send header immediately
        res.flushHeaders(); 

        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: buildAssistantPrompt(context)
        });

        const result = await model.generateContentStream(message);

        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            res.write(chunkText);
        }
        res.end();

    } catch (error) {
        console.error("Error stream chat:", error);
        if (res.headersSent) {
            res.end();
        } else {
            res.status(500).json({ error: "Failed to generate AI response" });
        }
    }
};
