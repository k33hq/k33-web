import { RichText } from '@/types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import * as React from 'react';
import { richTextOptions } from '../rich-text';
import { BLOCKS, Block, Inline } from '@contentful/rich-text-types';
import Image from 'next/image';

interface ArticleBodyProps {
  document: any | null;
}

const ArticleBody: React.FC<ArticleBodyProps> = ({ document }) => {
  if (!document) {
    return <></>;
  }

  return (
    <>
      {documentToReactComponents(document.json, {
        ...richTextOptions,
        renderNode: {
          ...richTextOptions.renderNode,
          [BLOCKS.EMBEDDED_ASSET]: (
            node: Block | Inline,
            children: React.ReactNode
          ) => {
            const img = document.links.assets.block.find(
              (i: any) => i.sys.id === node.data.target.sys.id
            );
            return (
              <div className="w-full min-h-[70px] md:max-h-[423px] relative">
                <Image
                  src={img?.url}
                  fill
                  style={{
                    objectFit: 'contain',
                    width: '100%',
                  }}
                  alt={img.description}
                />
              </div>
            );
          },
        },
      })}
    </>
  );
};

export default ArticleBody;
