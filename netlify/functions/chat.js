// netlify/functions/chat.js

export default async (req) => {
  // Only allow POST
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const { messages } = await req.json();

  // Your OpenRouter API key — safely stored in Netlify (never in frontend)
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

  if (!OPENROUTER_API_KEY) {
    return new Response("API key missing", { status: 500 });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        // "HTTP-Referer": "https://your-lexide-site.netlify.app", 
        "X-Title": "Lexide AI",
      },
      body: JSON.stringify({
        model: "mistralai/devstral-2512:free",
        messages: messages,
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

// Important: This tells Netlify the route
export const config = {
  path: "/api/chat",
};