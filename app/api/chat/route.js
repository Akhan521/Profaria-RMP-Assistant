import { NextResponse } from 'next/server'
import { Pinecone } from '@pinecone-database/pinecone'
import OpenAI from 'openai'

const systemPrompt = `
Remember you are a Rate My Professor agent that helps students find professors for their classes by answering user questions.
You use your knowledge to provide the best possible answers to user questions. You are dedicated to helping students have the best experience in their classes.
 Adhere to the following guidelines:
1. Provide as much clarity in answers to user questions.
2. If the user asks for a professor that is not in the database, respond with "I'm sorry, I don't have that information."
3. Be empathic in your responses and remember to highlight what would best help students succeed in their academics.
4. When providing brief summaries of professors, format them beautifully in markdown, so that it's easy to read.
5. Include relevant information about the quality of teaching each professor provides in their summaries.
6. When listing the stars of each professor, use yellow stars and do NOT use numbers to list stars.
`

export async function POST(req) {
    const data = await req.json();
    
    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    });
    const index = pc.index('rag').namespace('ns1');
    const openai = new OpenAI();

    const text = data[data.length - 1].content;
    const embedding = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
        encoding_format: 'float',
    });

    const results = await index.query({
        topK: 5,
        includeMetadata: true,
        vector: embedding.data[0].embedding,
    });

    let resultString = ''
    results.matches.forEach((match) => {
        resultString += `
        Returned Results:
        Professor: ${match.id}
        Review: ${match.metadata.stars}
        Subject: ${match.metadata.subject}
        Stars: ${match.metadata.stars}
        \n\n`
    });

    const lastMessage = data[data.length - 1];
    const lastMessageContent = lastMessage.content + resultString;
    const lastDataWithoutLastMessage = data.slice(0, data.length - 1);

    const completion = await openai.chat.completions.create({
        messages: [
          {role: 'system', content: systemPrompt},
          ...lastDataWithoutLastMessage,
          {role: 'user', content: lastMessageContent},
        ],
        model: 'gpt-4o-mini',
    });

    let aiResponse = completion.choices[0]["message"]["content"];
    console.log(aiResponse);

    return new NextResponse(aiResponse);
  }