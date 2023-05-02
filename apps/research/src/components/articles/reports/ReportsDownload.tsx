import * as React from 'react';
import { BasicButton } from 'ui';
import { GrDocumentLocked } from 'react-icons/gr';
import { useAppState } from 'platform-js';
import config from '@/firebase/config';
import { downloadResource } from '@/utils';

interface ReportsDownloadProps {
  url: string;
  title: string;
}

const ReportsDownload: React.FC<ReportsDownloadProps> = ({ url, title }) => {
  const state = useAppState(config);

  return (
    <BasicButton
      fullWidth
      onClick={() => downloadResource(url)}
      disabled={['LOADING', 'SIGNED_OUT', 'UNREGISTRED'].includes(state)}
    >
      <div className="flex flex-row items-center justify-center gap-2">
        Download Report
      </div>
    </BasicButton>
  );
};

export default ReportsDownload;
