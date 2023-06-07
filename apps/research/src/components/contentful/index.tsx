import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { Options } from '@contentful/rich-text-react-renderer';
import * as React from 'react';
import { Divider } from 'antd';

interface RichTextElements {
  children: React.ReactNode;
}

const Text: React.FC<RichTextElements> = ({ children }) => <p>{children}</p>;

const Heading1: React.FC<RichTextElements> = ({ children }) => (
  <h1>{children}</h1>
);

const Heading2: React.FC<RichTextElements> = ({ children }) => (
  <h2>{children}</h2>
);

const Heading3: React.FC<RichTextElements> = ({ children }) => (
  <h3>{children}</h3>
);

//
const Heading4: React.FC<RichTextElements> = ({ children }) => (
  <h4>{children}</h4>
);

const Heading5: React.FC<RichTextElements> = ({ children }) => (
  <h5>{children}</h5>
);

const Heading6: React.FC<RichTextElements> = ({ children }) => (
  <h6>{children}</h6>
);

export const richTextOptions: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children: React.ReactNode) => (
      <Text>{children}</Text>
    ),
    [BLOCKS.HEADING_1]: (node, children: React.ReactNode) => (
      <Heading1>{children}</Heading1>
    ),
    [BLOCKS.HEADING_2]: (node, children: React.ReactNode) => (
      <Heading2>{children}</Heading2>
    ),
    [BLOCKS.HEADING_3]: (node, children: React.ReactNode) => (
      <Heading3>{children}</Heading3>
    ),
    [BLOCKS.HEADING_4]: (node, children: React.ReactNode) => (
      <Heading4>{children}</Heading4>
    ),
    [BLOCKS.HEADING_5]: (node, children: React.ReactNode) => (
      <Heading5>{children}</Heading5>
    ),
    [BLOCKS.HEADING_6]: (node, children: React.ReactNode) => (
      <Heading6>{children}</Heading6>
    ),
    [BLOCKS.HR]: (node, children: React.ReactNode) => <Divider />,

    [INLINES.HYPERLINK]: ({ data }, children: React.ReactNode) => {
      return (
        <a
          href={data.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-body2 text-label-light-primary underline hover:text-label-light-secondary"
        >
          {children}
        </a>
      );
    },
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className="list-outside list-disc pl-4">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <ol className="list-outside">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
  },
};
