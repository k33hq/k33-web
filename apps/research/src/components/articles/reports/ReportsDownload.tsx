import * as React from 'react';
import { BasicButton } from 'ui';

interface ReportsDownloadProps {
  url: string;
  title: string;
}

const ReportsDownload: React.FC<ReportsDownloadProps> = ({ url, title }) => {
  function forceDownload(blob: string, filename?: string | undefined) {
    var a = document.createElement('a');
    //@ts-ignore
    a.download = filename;
    //@ts-ignore
    a.href = blob;
    // For Firefox https://stackoverflow.com/a/32226068
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  // Current blob size limit is around 500MB for browsers
  function downloadResource(url: string, filename?: string) {
    if (!filename) filename = url.split('\\').pop()!.split('/').pop();
    fetch(url, {
      headers: new Headers({
        Origin: location.origin,
      }),
      mode: 'cors',
    })
      .then((response) => response.blob())
      .then((blob) => {
        let blobUrl = window.URL.createObjectURL(blob);
        forceDownload(blobUrl, filename);
      })
      .catch((e) => console.error(e));
  }
  return (
    <BasicButton fullWidth onClick={() => downloadResource(url)}>
      Download Report
    </BasicButton>
  );
};

export default ReportsDownload;
