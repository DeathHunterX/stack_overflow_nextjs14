import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { question } = await request.json();

  try {
    const response = await fetch(
      "https://api.pawan.krd/pai-001/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "pai-001",
          messages: [
            {
              role: "system",
              content:
                "You are a knowledgeable assistant that provides quality information.",
            },
            {
              role: "user",
              content: `Tell me ${question}`,
            },
          ],
        }),
      }
    );

    const responseData = await response.json();
    const reply = responseData.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
