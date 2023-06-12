import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { Options } from '@contentful/rich-text-react-renderer';
import * as React from 'react';
import { Button, Divider, Typography } from 'antd';

const { Text, Title, Link } = Typography;

interface RichTextElements {
  children: React.ReactNode;
}

const ContentFulText: React.FC<RichTextElements> = ({ children }) => (
  <Text>{children}</Text>
);

const Heading1: React.FC<RichTextElements> = ({ children }) => (
  <Title level={3}>{children}</Title>
);

const Heading2: React.FC<RichTextElements> = ({ children }) => (
  <Title level={4}>{children}</Title>
);

const Heading3: React.FC<RichTextElements> = ({ children }) => (
  <Title level={5}>{children}</Title>
);

//
const Heading4: React.FC<RichTextElements> = ({ children }) => (
  <Title level={5}>{children}</Title>
);

const Heading5: React.FC<RichTextElements> = ({ children }) => (
  <Title level={5}>{children}</Title>
);

const Heading6: React.FC<RichTextElements> = ({ children }) => (
  <Title level={5}>{children}</Title>
);

export const richTextOptions: Options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children: React.ReactNode) => (
      <ContentFulText>{children}</ContentFulText>
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
        <Link href={data.uri} target="_blank" rel="noopener noreferrer">
          <Button type="link">{children}</Button>
        </Link>
      );
    },
    [BLOCKS.UL_LIST]: (node, children) => <ul>{children}</ul>,
    [BLOCKS.OL_LIST]: (node, children) => <ol>{children}</ol>,
    [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
  },
};
