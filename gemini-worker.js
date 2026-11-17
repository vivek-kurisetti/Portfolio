// Cloudflare Worker: a tiny proxy so your portfolio can use Gemini's free tier
// without exposing your API key in the browser.
//
// Setup (free):
// 1. Get a key at https://aistudio.google.com/apikey
// 2. Cloudflare dashboard -> Workers & Pages -> Create Worker -> paste this file
// 3. Settings -> Variables -> add secret GEMINI_API_KEY = your key
// 4. Set ALLOWED_ORIGIN below to your site (e.g. https://vivek0803.github.io)
// 5. Put the Worker URL in GEMINI_PROXY_URL inside index.html

const ALLOWED_ORIGIN = "https://vivek0803.github.io"; // origin only, no /portfolio path
const MODEL = "gemini-3.1-flash-lite"; // stable, free-tier model; swap for any current free Flash model

export default {
  async fetch(req, env) {
    const cors = {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: cors });
    if (req.headers.get("Origin") !== ALLOWED_ORIGIN) return new Response("Forbidden", { status: 403, headers: cors });

    let prompt = "";
    try { ({ prompt } = await req.json()); } catch { return new Response("Bad JSON", { status: 400, headers: cors }); }
    if (typeof prompt !== "string" || prompt.length > 20000) return new Response("Bad request", { status: 400, headers: cors });

    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 400 },
        }),
      }
    );
    if (!r.ok) return new Response(JSON.stringify({ error: "upstream " + r.status }), { status: 502, headers: { ...cors, "Content-Type": "application/json" } });
    const j = await r.json();
    const text = j?.candidates?.[0]?.content?.parts?.map(p => p.text).join("") || "";
    return new Response(JSON.stringify({ text }), { headers: { ...cors, "Content-Type": "application/json" } });
  },
};
