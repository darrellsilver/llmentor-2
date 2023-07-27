"use client";

import { Input } from '@/components/ui/input';
import { FormEventHandler, useState } from 'react';

const INITIAL_CHAT_HISTORY = [
  'Beginning of chat',
]

const SOURCE = 'whywework.pub'

const getHistoryText = (user: string, text: string): string => `${user}: ${text}`;

export default function WhyWeWorkPage() {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState(INITIAL_CHAT_HISTORY);
  const [isLoading, setIsLoading] = useState(false);

  const onInputSubmitLoading: FormEventHandler = async (e) => {
    e.preventDefault();
  }

  const onInputSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    const updatedChatHistory = [...chatHistory, getHistoryText('You', inputText)]
    setChatHistory(updatedChatHistory);
    setInputText('');
    setIsLoading(true);

    fetch(`/api/get-response?source=${SOURCE}&q=${inputText}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setChatHistory([...updatedChatHistory, getHistoryText('ERROR', data.error)])
        } else {
          setChatHistory([...updatedChatHistory, getHistoryText('AI', data.text)])
        }
        setIsLoading(false);
      })
  }

  return (
    <section className="container flex flex-1 flex-col gap-2 pb-8 pt-6 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Chat with &quot; Why we Work &quot;
      </h1>

      <div className="no-scrollbar flex flex-1 flex-col justify-end overflow-y-scroll ">
        {chatHistory.map((chat, index) => (
          <p className="pb-2" key={index}>
            {chat}
          </p>
        ))}
        {isLoading && (
          <p className="pb-2">
            Thinking...
          </p>
        )}
      </div>

      <form onSubmit={isLoading ? onInputSubmitLoading : onInputSubmit}>
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={'Chat with "Why we Work"'}
        />
      </form>
    </section>
  )
}
