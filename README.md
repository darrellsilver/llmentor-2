# LLMentor

An AI-powered app to help you tackle any problem.

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
```

## Running

Start the app
```
npm run dev  # OR
pnpm dev
```

Go to http://localhost:3000

## Structure

The project uses the [Next.js App router](https://nextjs.org/docs/app)

- API routes are in `app/api/**/route.ts` files
- Pages are in `app/**/page.tsx` files
- Components are in the `components` directory. The UI components are from [shadcn/ui](https://ui.shadcn.com/)
- Sources are vector stores are kept in the `data` directory

## API

### /api/chat

This route takes in a `source` parameter and a `p` parameter. The source indicates the source for the vector store.
If no vector store for the source is found, an error is returned.
