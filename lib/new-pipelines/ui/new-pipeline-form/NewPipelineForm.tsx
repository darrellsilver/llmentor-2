'use client';

import { FormEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getUuid } from '@/components/pipelines/common/getUuid';
import { Textarea } from '@/components/ui/textarea';
import { NewPipeline } from '@/lib/new-pipelines/types';
import { savePipeline } from '@/lib/new-pipelines/ui/api';

async function createNewPipeline(
  name: string,
  description: string,
  extensionIds: string[],
): Promise<NewPipeline> {
  const pipeline: NewPipeline = {
    id: getUuid(),
    createdAt: (new Date()).toISOString(),
    name,
    description,
    extensionIds,
    nodes: [],
  }

  const newPipeline = await savePipeline(pipeline);
  console.log(newPipeline);
  return newPipeline;
}

export function NewPipelineForm() {
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const router = useRouter();

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (!title) return;

    const pipeline = await createNewPipeline(
      title,
      description,
      ['core', 'assemblyai', 'openai']
    );

    router.push(`/new-pipelines/${pipeline.id}`);
  }

  return (
    <form
      className="w-[450px]"
      onSubmit={onSubmit}
    >
      <h1 className="text-lg font-bold">
        Create a New Pipeline
      </h1>
      <Input
        className="mt-4 w-full"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Textarea
        className="mt-4 max-h-40 w-full"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
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
