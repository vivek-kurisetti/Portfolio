# Vivek Kurisetti — Portfolio

Senior Data Engineer at PayU. Live site: https://vivek-kurisetti.github.io/Portfolio/

- `index.html` — the whole site: animated pipeline background, project workflows, and the "Ask about Vivek" chatbot.
- The chatbot answers only from the profile document inside `index.html` (search for `id="knowledge"` to edit it).
- `gemini-worker.js` — optional Cloudflare Worker that lets the chatbot use Gemini's free tier. Deploy it, then set `GEMINI_PROXY_URL` in `index.html`.
