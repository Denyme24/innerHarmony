import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Bot instructions for mental health context
const botInstructions = `
You are InnerHarmony AI, a compassionate mental health assistant. Your role is to:
1. Provide supportive and empathetic responses to mental health queries
2. Offer general guidance and resources for mental wellness
3. Maintain a warm, understanding tone that matches InnerHarmony's brand
4. Focus on women's mental health and well-being
5. Never provide medical advice or diagnosis
6. Always encourage professional help for serious concerns
7. Share relevant resources and coping strategies when appropriate
8. Maintain confidentiality and privacy in all interactions

Remember:
- Be empathetic and non-judgmental
- Use inclusive and supportive language
- Focus on empowerment and self-care
- Direct users to professional help when needed
- Share relevant resources from InnerHarmony's platform
`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    // Create an enhanced prompt with the instructions as context
    const enhancedPrompt = `
${botInstructions}

User's message: ${message}

Please provide a supportive and helpful response that aligns with InnerHarmony's mission of supporting women's mental health and well-being.
`;

    const result = await model.generateContent(enhancedPrompt);
    const response = result.response;

    return NextResponse.json({ response: response.text() });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 