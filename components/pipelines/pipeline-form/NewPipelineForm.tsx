'use client';

import { v4 } from 'uuid';
import { Pipeline } from '@/lib/pipelines/types';
import { savePipeline } from '@/components/pipelines/api';
import { FormEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

async function createNewPipeline(title: string): Promise<Pipeline> {
  const pipeline: Pipeline = {
    id: v4(),
    title,
    nodes: [],
  }

  return await savePipeline(pipeline);
}

export function NewPipelineForm() {
  const [ title, setTitle ] = useState('');
  const router = useRouter();

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (!title) return;

    const pipeline = await createNewPipeline(title)

    router.push(`/pipeline-designer/${pipeline.id}`);
  }

  return (
    <form
      className="w-[450px]"
      onSubmit={onSubmit}
    >
      <h1 className="text-lg font-bold">
        Create a Pipeline
      </h1>
      <Input
        className="mt-4 w-full"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Button
        className="mt-4 w-full"
        type="submit"
      >
        Create
      </Button>
    </form>
  )
}
