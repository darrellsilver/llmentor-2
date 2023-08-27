import { NewPipelineNode } from '@/lib/new-pipelines/core/types';

import { CoreTextInputNode, TextInputNodeExtension } from './textInput';
import { CoreTextNode, CoreTextNodeExtension } from './text';
import { CoreTextOutputNode, TextOutputNodeExtension } from './textOutput';

export type CoreNode = (
  CoreTextInputNode |
  CoreTextNode |
  CoreTextOutputNode
);

export const nodeExtensions = [
  new TextInputNodeExtension(),
  new CoreTextNodeExtension(),
  new TextOutputNodeExtension(),
];
