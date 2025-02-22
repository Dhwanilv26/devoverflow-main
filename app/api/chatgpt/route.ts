/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const POST = async (request: Request) => {
  const { question, content } = await request.json();
  try {
    const genAI = new GoogleGenerativeAI(
      "AIzaSyDo_O7V1GB14qrqnhlAsmCtCNK7M2sxo4s"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Please provide an in-depth answer to "${question}" within the context of "${content}". If this question is about code debugging or error resolution, include explanations of common issues, code examples, and potential fixes. If it's a competitive programming question, focus on optimal solutions and performance tips. For development topics, provide best practices and practical examples relevant to software engineering. Tailor the response for a Stack Overflow audience, ensuring clarity and technical accuracy.`;

    const result = await model.generateContent(prompt);
    const reply = result.response?.text();

    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
