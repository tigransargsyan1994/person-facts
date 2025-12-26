# Simple Node API (html_try_5)

A tiny Node.js Express service with two endpoints used for learning/demo purposes.

**What it is**
- A minimal Express server exposing `/hello` and `/facts` endpoints.
- `/hello`: simple arithmetic demo (`/hello?n=5`).
- `/facts`: forwards a prompt to a Groq/OpenAI-compatible API to fetch fun facts (requires an API key).

**Languages & tools used**
- JavaScript (Node.js, CommonJS)
- Docker (for containerizing the app)
- Express (web framework)
- dotenv (optional, for local development)

**Files of interest**
- `server.js` — main server file
- `Dockerfile` — builds a small container image
- `.env.example` — shows expected environment variables

**Requirements**
- Node.js 18+ (or use the included Dockerfile which uses Node 20)
- An API key for the Groq/OpenAI-compatible endpoint (set `GROQ_API_KEY`)

## Local development (recommended)
1. Install dependencies:

```bash
npm install express dotenv
```

2. Create a `.env` file in the project root (you can copy `.env.example`) and add your real key:

```bash
copy .env.example .env
# then edit .env and set GROQ_API_KEY
```

3. Run the server:

```bash
node server.js
```

4. Test endpoints:

```bash
curl "http://localhost:3000/hello?n=5"
curl "http://localhost:3000/facts?name=Alice&country=Canada"
```

## Using Docker
Build the image and run while passing the environment variable:

```bash
docker build -t simple-node-api .
docker run -e GROQ_API_KEY="your_actual_key_here" -p 3000:3000 simple-node-api
```

Or use an env file on the host:

```bash
# create a .env locally (do NOT commit it)
docker run --env-file .env -p 3000:3000 simple-node-api
```

## Personal environment
- This project expects you to create a personal environment (a local `.env` file) containing secrets such as `GROQ_API_KEY`. Do not commit this file to source control.
- Local workflow: copy `.env.example` to `.env` and set your real key (`copy .env.example .env` then edit `.env`). The server will load values from `process.env` (via `dotenv` when available) or from the container environment.
- When running the Docker image, supply the key with `-e GROQ_API_KEY="..."` or use `--env-file .env` so the container receives your secret.

## LLM (Groq)
- The `/facts` endpoint calls the Groq OpenAI-compatible API at `https://api.groq.com/openai/v1/chat/completions` using the model `openai/gpt-oss-20b`.
- Requests require a valid `GROQ_API_KEY` provided as a Bearer token. The server forwards a short prompt and returns the model response; be mindful of API usage, rate limits, and costs.

## Notes & recommendations
- Do NOT commit your real `.env` to source control. Add `.env` to `.gitignore`.
- The Dockerfile already installs `dotenv` so the image can load `.env` files if you mount them or use `--env-file`.
- If `GROQ_API_KEY` is missing, the server responds with `Server misconfigured: missing API key` and a `500` status.

