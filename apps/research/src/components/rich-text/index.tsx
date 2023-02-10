import { getAssetById } from '@/api';
import { BLOCKS, Block, Inline, MARKS } from '@contentful/rich-text-types';
import * as React from 'react';

interface RichTextElements {
  children: React.ReactNode;
}

const Text: React.FC<RichTextElements> = ({ children }) => (
  <p className="text-body2 text-label-light-secondary">{children}</p>
);

const Heading1: React.FC<RichTextElements> = ({ children }) => (
  <h1 className="text-label-light-primary md:text-heading2 text-heading3">
    {children}
  </h1>
);

const Heading2: React.FC<RichTextElements> = ({ children }) => (
  <h2 className="text-label-light-primary md:text-heading4 text-heading5">
    {children}
  </h2>
);

const Heading3: React.FC<RichTextElements> = ({ children }) => (
  <h1 className="text-label-light-primary md:text-heading6 text-heading7">
    {children}
  </h1>
);

export const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: React.ReactNode) => (
      <Text>{children}</Text>
    ),
    [BLOCKS.HEADING_1]: (node: Block | Inline, children: React.ReactNode) => (
      <Heading1>{children}</Heading1>
    ),
    [BLOCKS.HEADING_2]: (node: Block | Inline, children: React.ReactNode) => (
      <Heading2>{children}</Heading2>
    ),
    [BLOCKS.HEADING_3]: (node: Block | Inline, children: React.ReactNode) => (
      <Heading3>{children}</Heading3>
    ),
  },
};
