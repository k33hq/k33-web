import { RichText } from '../../types/domain';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import * as React from 'react';
import { richTextOptions } from '../rich-text';

interface NutShellProps {
  document: RichText | null;
}

const NutShell: React.FC<NutShellProps> = ({ document }) => {
  if (!document) {
    return <></>;
  }
  return (
    <div className="flex flex-wrap gap-6">
      <div className="flex-grow basis-28">
        <p className="text-body1 text-label-light-primary">In short</p>
      </div>
      <div className="flex flex-col gap-8 basis-0 grow-[999]">
        {documentToReactComponents(document.json, richTextOptions)}
      </div>
    </div>
  );
};

export default NutShell;
