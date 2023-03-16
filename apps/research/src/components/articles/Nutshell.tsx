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
    <div className="flex md:flex-wrap md:gap-6 gap-2 flex-col md:flex-row transition-all">
      <div className="md:flex-grow md:basis-28">
        <p className="text-body1 text-label-light-primary">In short</p>
      </div>
      <div className="flex flex-col md:gap-8 gap-5 md:basis-0 md:grow-[999]">
        {documentToReactComponents(document.json, richTextOptions)}
      </div>
    </div>
  );
};

export default NutShell;
