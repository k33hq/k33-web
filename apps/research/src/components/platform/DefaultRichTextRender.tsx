import { RichTextDocument } from '@/types';
import * as React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { Card, Image, Typography, theme } from 'antd';
import { richTextOptions } from '../contentful';

interface DefaultRichTextRenderProps {
  document: RichTextDocument;
}

const { useToken } = theme;

const DefaultRichTextRender: React.FC<DefaultRichTextRenderProps> = ({
  document,
}) => {
  const {
    token: { fontSizeSM },
  } = useToken();

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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: 0,
                  gap: 24,
                }}
              >
                <Image src={img?.url} alt={img.title ?? ''} />
                {img.description && (
                  <Typography.Text
                    style={{ fontSize: fontSizeSM }}
                    type="secondary"
                  >
                    {img.description}
                  </Typography.Text>
                )}
              </div>
            );
          },
        },
      })}
    </>
  );
};

export default DefaultRichTextRender;
