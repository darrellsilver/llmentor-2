# LLMentor

An AI-powered app to help you tackle any problem.

## Installation

### Redis

```bash
brew install redis
```

## Setup

Install dependencies

```bash
npm install  # OR
pnpm install
```

Add your OpenAI API key to .env.local in the project root

```
# In .env.local
OPENAI_API_KEY=sk-...
ASSEMBLYAI_API_KEY=...
```

## Running

Start redis server

```bash
redis-server
```

Start the app

```bash
npm run dev  # OR
pnpm dev
```

Go to http://localhost:3000

## Tools

### Transcription Analysis

- Upload an audio file for analysis
- The file is uploaded to AssemblyAI and transcribed
- The transcript response is kept in `/data/assemblyai/<file-name>.json`, to avoid re-uploads/transcriptions
- Once the file is done being transcribed, perform analysis on it using the right panel
- A few stock analyzers are available, or you can write your own custom analysis prompt

## Books

- epubs are split into text chunks
- The chunks are turned into embeddings using openai's embeddings api
- Vector stores containing the embeddings are kept in `/data/vector-stores/<epub-name>.index`
- Chat with the book using the appropriate view
- User chats are passed through a lookup stage and pass context from the book to the LLM

## Structure

The project uses the [Next.js App router](https://nextjs.org/docs/app)

- API routes are in `app/api/**/route.ts` files
- Pages are in `app/**/page.tsx` files
  - Tools are in `app/tools/*.tsx`
  - Books are in `app/books/*.tsx`
- Components are in the `components` directory. The UI components are from [shadcn/ui](https://ui.shadcn.com/)
- Files are kept in the `data` directory
  - epubs are kept in `/data/epubs`
  - Vector stores are kept in `/data/vector-stores`
  - AssemblyAI transcript responses are kept in `/data/assmemblyai`

## API

### /api/chat

This route takes in a `source` parameter and a `p` parameter. The source indicates the source for the vector store.
If no vector store for the source is found, an error is returned.
