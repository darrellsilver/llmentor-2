"use client";

import { Input } from '@/components/ui/input';
import { useChat } from 'ai/react';

export default function WhyWeWorkPage() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
  } = useChat({
    api: '/api/chat',
    body: {
      source: 'whywework.epub',
    }
  });

  return (
    <section className="container flex flex-1 flex-col gap-2 pb-8 pt-6 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Chat with &quot; Why we Work &quot;
      </h1>

      <div className="no-scrollbar flex flex-1 flex-col justify-end overflow-y-scroll ">
        {messages.map(m => (
          <p key={m.id} className="pb-2">
            <b>{m.role == 'user' ? 'User: ' : 'AI: '}</b>
            {m.content}
          </p>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder={'Chat with "Why we Work"'}
        />
      </form>
    </section>
  )
}
