# Vivek Kurisetti — Portfolio

Senior Data Engineer at PayU. Live site: https://vivek-kurisetti.github.io/Portfolio/

| Page | What it is |
|---|---|
| `index.html` | **vivek.run()** — the live portfolio. The site is one pipeline run: extract → transform → load → index → serve → sink. Dark by default with a light theme switch. |
| `series.html` | **Vivek: The Series** — the streaming-style version. |
| `classic.html` | The earlier version with the animated pipeline background. |
| `gemini-worker.js` | Optional Cloudflare Worker so the chatbot can use Gemini's free tier. Deploy it, then set `GEMINI_PROXY_URL` in the page. |

The "Ask Vivek" chatbot answers only from the profile document inside each page (search for `id="knowledge"` to edit it).
