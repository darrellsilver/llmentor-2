import {
  NewClientPipeline,
  NewPipeline,
  NewPipelineExecution,
  NewPipelineInputNode,
  NewPipelineOutputNode,
} from '@/lib/new-pipelines/types';
import { Panel } from 'reactflow';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IconPulseLoader } from '@/views/analysis-session';
import { AlertCircle, Cloud, RefreshCw, Save } from 'lucide-react';
import { CenteredMessage } from '@/views/analysis-session/centered-message';
import {
  useExecutionClientPipeline
} from '@/lib/new-pipelines/ui/designer/pipeline-designer-flow/hooks/useExecutionClientPipeline';
import { usePipelineExtensionStore } from '@/lib/new-pipelines/ui/stores/usePipelineExtensionStore';

type PipelineDesignerFlowExecutorProps = {
  pipeline: NewPipeline;
  onRefresh: () => void;
  onExecute: (input: { [key: string]: any }) => void
  isExecuting: boolean;
  execution: NewPipelineExecution | null;
  onSaveExecution: (execution: NewPipelineExecution) => void;
  isOpen: boolean;
};

export function PipelineDesignerFlowExecutor({
  pipeline,
  isOpen,
  onRefresh,
  onExecute,
  isExecuting,
  onSaveExecution,
  execution,
}: PipelineDesignerFlowExecutorProps) {
  const {
    clientPipeline,
    getInputValue,
    setInputValue,
    buildInput,
  } = useExecutionClientPipeline(pipeline);

  function onClickExecute() {
    onExecute(buildInput());
  }

  // Return needs to go after all functions and hooks
  if (!isOpen || clientPipeline === null) return null;

  return (
    <Panel
      className="h-[600px] w-[750px] max-w-[750px] p-4"
      style={{ margin: 0, marginTop: 85 }}
      position={'top-right'}
    >
      <Card
        className="flex h-full w-full"
      >
        <InputPanel
          onClickRefresh={onRefresh}
          inputNodes={clientPipeline.inputNodes}
          getInputValue={getInputValue}
          setInputValue={setInputValue}
        />
        <div className="flex w-[480px] max-w-[480px] flex-col p-4">
          <div className="mb-4 flex w-full">
            <Button
              className="mb-4 flex-1"
              onClick={onClickExecute}
              disabled={isExecuting}
            >
              Run Pipeline
            </Button>
            {execution && execution.status === 'success' && (
              <Button
                className="ml-2"
                variant="secondary"
                onClick={() => onSaveExecution(execution)}
              >
                <Save size={18} />
              </Button>
            )}
          </div>
          {isExecuting && (
            <IconPulseLoader Icon={<Cloud />} text="Running" />
          )}
          {!isExecuting && !execution && (
            <CenteredMessage>
              No Results
            </CenteredMessage>
          )}
          {!isExecuting && execution && (
            <ExecutionResult
              clientPipeline={clientPipeline}
              execution={execution}
            />
          )}
        </div>
      </Card>
    </Panel>
  );
}

type InputPanelProps = {
  onClickRefresh: () => void;
  inputNodes: NewPipelineInputNode[];
  getInputValue: (node: NewPipelineInputNode) => any;
  setInputValue: (node: NewPipelineInputNode, value: any) => void;
}

function InputPanel({
  onClickRefresh,
  inputNodes,
  getInputValue,
  setInputValue,
}: InputPanelProps) {
  return (
    <div className="flex w-[280px] min-w-[280px] flex-col bg-accent">
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="text-lg font-bold">
          Inputs
        </h3>
        <Button
          className="hover:bg-background"
          variant="ghost"
          onClick={onClickRefresh}
        >
          <RefreshCw size={15} />
        </Button>
      </div>
      <div className="no-scrollbar flex-1 overflow-y-scroll px-4 pt-4">
        {inputNodes.map(node => (
          <InputNode
            key={node.id}
            node={node}
            value={getInputValue(node)}
            onChange={(value) => setInputValue(node, value)}
          />
        ))}
      </div>
    </div>
  )
}

type InputNodeProps = {
  node: NewPipelineInputNode;
  value: any;
  onChange: (value: any) => void;
}

function InputNode({
  node,
  value,
  onChange,
}: InputNodeProps) {
  const extension = usePipelineExtensionStore(state => state.getExtension(node.extension));
  return extension ? extension.renderInputNode(node, value, onChange) : null;
}

type ExecutionResultProps = {
  clientPipeline: NewClientPipeline;
  execution: NewPipelineExecution;
}

function ExecutionResult({
  clientPipeline,
  execution,
}: ExecutionResultProps) {
  switch (execution.status) {
    case 'running':
      return (
        <CenteredMessage>
          Running
        </CenteredMessage>
      )
    case 'error':
      return (
        <CenteredMessage className="rounded-md bg-red-200 text-red-950 dark:bg-red-900 dark:text-red-100">
          <AlertCircle className="mb-4"/>
          {execution.message}
        </CenteredMessage>
      )
    case 'success':
      return (
        <div className="no-scrollbar overflow-y-scroll">
          {clientPipeline.outputNodes.map(node => (
            <OutputNode
              key={node.id}
              node={node}
              value={execution.output[node.id]}
            />
          ))}
        </div>
      )
  }
}

type OutputNodeProps = {
  node: NewPipelineOutputNode,
  value: any;
}

function OutputNode({
  node,
  value,
}: OutputNodeProps) {
  const extension = usePipelineExtensionStore(state => state.getExtension(node.extension));
  return extension ? extension.renderOutputNode(node, value) : null;
}
