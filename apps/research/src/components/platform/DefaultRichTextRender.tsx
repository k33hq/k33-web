import { RichTextDocument } from '@/types';
import * as React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { Card, Image } from 'antd';
import { richTextOptions } from '../contentful';

interface DefaultRichTextRenderProps {
  document: RichTextDocument;
}

const { Meta } = Card;

const DefaultRichTextRender: React.FC<DefaultRichTextRenderProps> = ({
  document,
}) => {
  if (!document) return;

  return (
    <>
      {documentToReactComponents(document.json, {
        ...richTextOptions,
        renderNode: {
          ...richTextOptions.renderNode,
          [BLOCKS.EMBEDDED_ASSET]: (node, children: React.ReactNode) => {
            const img = (document as any).links.assets.block.find(
              (i: any) => i.sys.id === node.data.target.sys.id
            );
            return (
              <Card
                cover={<Image src={img?.url} alt={img.description} />}
                style={{
                  border: 0,
                }}
              >
                <Meta description={img.description} />
              </Card>
            );
          },
        },
      })}
    </>
  );
};

export default DefaultRichTextRender;
