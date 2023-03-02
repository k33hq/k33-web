export const pageview = (url: string) => {
  //@ts-ignore
  window.gtag(
    'config',
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID as string,
    {
      page_path: url,
    }
  );
};

interface AnalyticsEvent {
  action: string;
  category: string;
  label: string;
  value: string;
}

export const event = ({ action, category, label, value }: AnalyticsEvent) => {
  //@ts-ignore
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};

export function forceDownload(blob: string, filename?: string | undefined) {
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
export function downloadResource(url: string, filename?: string) {
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
