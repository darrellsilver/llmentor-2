import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWorkflow, WorkflowStatus } from '@/views/analysis-session/use-workflow';
import { FormEventHandler, useState } from 'react';
import { AnalyzerSelect } from '@/views/analysis-session/analyzer-select';
import { Badge } from '@/components/ui/badge';
import { Glasses } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { CenteredMutedMessage } from '@/views/analysis-session/centered-muted-message';
import { Icon } from '@radix-ui/react-select';
import { IconPulseLoader } from '@/views/analysis-session/icon-pulse-loader';

export const ANALYZERS = [
  {
    value: 'talked-more',
    name: 'Who talked more',
    prompt: `
      Determine who did most of the talking, and write a paragraph explaining why they might have done that.
    `,
  },
  {
    value: 'aggression',
    name: 'Aggression',
    prompt: `
      Determine if one party is overly aggressive. Explain how you came to your conclusion.
    `,
  },
  {
    value: 'silliest-goose',
    name: 'Silliest goose',
    prompt: `
      Determine which of the speakers is the silliest goose. Explain how you came to your conclusion.
    `,
  },
  {
    value: 'custom',
    name: 'Custom',
    prompt: ``,
  },
]

function getAnalyzerPrompt(analyzer: string, customPrompt: string): string {
  if (analyzer === 'custom') return customPrompt;
  return ANALYZERS.filter(a => a.value == analyzer)[0].prompt;
}

type AnalysisResponse = {
  text: string;
}

const apiRoute = '/api/analysis-session/analyze-workflow'

async function runAnalysis(
  analyzerPrompt: string,
  inputText: string
): Promise<AnalysisResponse> {
  const headers = {
    'Content-Type': 'application/json',
  }
  const data = {
    analyzerPrompt,
    inputText,
  }
  const result = await fetch(apiRoute, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  })

  return await result.json()
}

interface SessionAnalysisSectionProps {
  disabled: boolean;
  inputText: null | string;
}

export function SessionAnalysisSection({
  disabled,
  inputText,
}: SessionAnalysisSectionProps) {
  const [ analyzer, setAnalyzer ] = useState(ANALYZERS[0].value);
  const [ customAnalyzerPrompt, setCustomAnalyzerPrompt ] = useState('');

  const {
    result,
    setResult,
    status,
    setStatus,
  } = useWorkflow<AnalysisResponse>();

  const onRunAnalysis: FormEventHandler = async (e) => {
    e.preventDefault();

    setStatus(WorkflowStatus.Running);

    const response = await runAnalysis(
      getAnalyzerPrompt(analyzer, customAnalyzerPrompt),
      inputText!
    );

    setStatus(WorkflowStatus.Complete);
    setResult(response);
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-col border-b p-4">
        <form
          className="flex flex-row items-center justify-between"
          onSubmit={onRunAnalysis}
        >
          <AnalyzerSelect
            disabled={disabled || status === WorkflowStatus.Running}
            options={ANALYZERS}
            value={analyzer}
            onChange={setAnalyzer}
          />
          <Button
            style={{ margin: 0 }}
            type="submit"
            disabled={disabled || status === WorkflowStatus.Running}
          >
            Run Analysis
          </Button>
        </form>
        {analyzer === 'custom' && (
          <Textarea
            style={{ marginTop: 12 }}
            placeholder="Custom analysis instructions"
            value={customAnalyzerPrompt}
            onChange={(e) => setCustomAnalyzerPrompt(e.target.value)}
          />
        )}
      </CardHeader>
      <CardContent className="flex-1 pt-4">
        {inputText === null && status === WorkflowStatus.Waiting && (
          <CenteredMutedMessage>
            Waiting for input
          </CenteredMutedMessage>
        )}
        {inputText !== null && status === WorkflowStatus.Waiting && (
          <CenteredMutedMessage>
            Pick an analyzer and run analysis
          </CenteredMutedMessage>
        )}
        {status === WorkflowStatus.Running && (
          <IconPulseLoader Icon={Glasses} text="Analyzing" />
        )}
        {status === WorkflowStatus.Error && (
          <CenteredMutedMessage>
            An Error Occurred
          </CenteredMutedMessage>
        )}
        {status === WorkflowStatus.Complete && result?.text}
      </CardContent>
    </Card>
  )
}
