import { RichTextDocument } from '@/types';
import * as React from 'react';
import {
  Options,
  documentToReactComponents,
} from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { Card, Image, Typography, theme } from 'antd';
import { richTextOptions } from '../contentful';

interface DefaultRichTextRenderProps {
  document: RichTextDocument;
  customOptions?: Options;
}

const { useToken } = theme;
const { Link } = Typography;

const DefaultRichTextRender: React.FC<DefaultRichTextRenderProps> = ({
  document,
  customOptions,
}) => {
  const {
    token: { fontSizeSM },
  } = useToken();

  if (!document) return;

  const defaultOptions: Options = {
    ...richTextOptions,
    renderNode: {
      ...richTextOptions.renderNode,
      [BLOCKS.EMBEDDED_ASSET]: (node, children: React.ReactNode) => {
        const asset = (document as any).links.assets.block.find(
          (i: any) => i.sys.id === node.data.target.sys.id
        );

        if (asset.contentType === 'application/pdf') {
          return (
            <Link href={asset.url} target="_blank" underline>
              {asset.title}
            </Link>
          );
        }

        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 0,
              gap: 8,
              marginTop: 32,
              marginBottom: 32,
            }}
          >
            <Image
              src={asset?.url}
              alt={asset.title ?? ''}
              style={{
                margin: 0,
              }}
            />
            {asset.description && (
              <Typography.Text
                style={{ fontSize: fontSizeSM }}
                type="secondary"
              >
                {asset.description}
              </Typography.Text>
            )}
          </div>
        );
      },
    },
  };

  return (
    <>
      {documentToReactComponents(
        document.json,
        customOptions ?? defaultOptions
      )}
    </>
  );
};

export default DefaultRichTextRender;
