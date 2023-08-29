import { CoreTextInputNode, TextInputNodeExtension } from './textInput';
import { CoreTextNode, CoreTextNodeExtension } from './text';
import { CoreCombineTextNode, CoreCombineTextNodeExtension } from './combineText';
import { CoreTextOutputNode, TextOutputNodeExtension } from './textOutput';
import { CorePipelineOutputNode, PipelineOutputNodeExtension } from './pipelineOutput';

export type CoreNode = (
  CoreTextInputNode |
  CoreTextNode |
  CoreCombineTextNode |
  CoreTextOutputNode |
  CorePipelineOutputNode
);

export const nodeExtensions = [
  new TextInputNodeExtension(),
  new CoreTextNodeExtension(),
  new CoreCombineTextNodeExtension(),
  new TextOutputNodeExtension(),
  new PipelineOutputNodeExtension(),
];
