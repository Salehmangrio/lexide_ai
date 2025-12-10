// netlify/functions/chat.js  ← Full file for Devstral speed
export default async (req) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

  const { messages } = await req.json();
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

  if (!OPENROUTER_API_KEY) {
    return new Response(JSON.stringify({ error: "API key missing" }), { status: 500 });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        // "HTTP-Referer": "https://your-site.netlify.app",
        "X-Title": "Lexide AI",
      },
      body: JSON.stringify({
        model: "mistralai/devstral-2512:free",  // ← Your exact model
        messages: messages.slice(-10),         // ← Fast: last 10 only
        stream: true,                          // ← Streaming ON
        max_tokens: 1500,                      // ← Faster generation
        temperature: 0.3,                      // ← Quick & focused
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return new Response(JSON.stringify({ error }), { status: 500 });
    }

    // Pipe stream directly (no buffering = no timeout)
    return new Response(response.body, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const config = { path: "/api/chat" };