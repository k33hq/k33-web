export const getUrl = (...slugs: Array<string>) => `/${slugs.join('/')}`;

export const colors = {
  systemBlue: 'bg-default-systemBlue-light',
  systemRed: 'bg-default-systemRed-light',
  systemOrange: 'bg-default-systemOrange-light',
  systemYellow: 'bg-default-systemYellow-light',
  systemGreen: 'bg-default-systemGreen-light',
  systemTeal: 'bg-default-systemTeal-light',
  systemIndigo: 'bg-default-systemIndigo-light',
  systemPurple: 'bg-default-systemPurple-light',
  systemPink: 'bg-default-systemPink-light',
};

export * from './get-stripejs';

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
