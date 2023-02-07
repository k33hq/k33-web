import { BLOCKS, Block, Inline, MARKS } from '@contentful/rich-text-types';
import * as React from 'react';

interface RichTextElements {
  children: React.ReactNode;
}

const Text: React.FC<RichTextElements> = ({ children }) => (
  <p className="text-body2 text-label-light-secondary">{children}</p>
);

export const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: React.ReactNode) => (
      <Text>{children}</Text>
    ),
  },
};
