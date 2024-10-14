import Image from 'next/image';
import CopyIcon from '../assets/copy-icon.svg';
import React, { useState } from 'react';
import { InfoAlert } from '@/components';

interface CopyTextProps {
  text: string;
  alertMessage?: string;
}

const CopyText: React.FC<CopyTextProps> = ({ text, alertMessage }) => {
  const [alertText, setAlertText] = useState<string | null>(null);
  return (
    <>
      <InfoAlert
        show={alertText != null}
        hide={() => setAlertText(null)}
        alertText={alertText || ''}
        className="my-3"
      />
      <div className="flex flex-row no-wrap">
        <div className="grow-0 outline rounded p-1">
          <span className="font-mono">{text}</span>
          <Image
            className="ps-2 w-8 inline hover:opacity-70"
            src={CopyIcon}
            alt={'Copy'}
            onClick={() =>
              navigator.clipboard
                .writeText(text || '')
                .then(() => setAlertText(alertMessage ?? 'Copied'))
            }
          />
        </div>
      </div>
    </>
  );
};

export default CopyText;
