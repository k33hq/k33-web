import { appStructure } from '@/config';
import { ISectionFields, Navigations, ProductPlans } from '@/types';

export const getUrl = (...slugs: Array<string>) => `/${slugs.join('/')}`;

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

export const siteUsername = '@K33Research';

export const getLevelTwos = (levelOne: string) => {
  return appStructure.navigation
    .filter((nav) => nav.key === levelOne && nav.children !== undefined)
    .flatMap(({ children, key, label, url }) => [
      { key: 'home', label: 'Home', url },
      ...children?.flatMap((nav) => nav)!,
    ]) as Navigations;
};

export function isBrowser() {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}

export * from './share';

export const proFeatures = [
  'Ahead of the Curve – The Weekly Market Report',
  'Navigating Narratives – The Weekly DeFi Research Note',
  'This Week in Crypto – The Weekly Crypto Industry Newsletter',
];

export const sectionKeys: Record<string, ProductPlans> = {
  'ahead-of-the-curve': 'aoc',
  'this-week-in-crypto': 'twic',
  'navigating-narratives': 'nn',
};

export const getProductSection = (sections: { items: ISectionFields[] }) =>
  sections.items.find((s) => Object.keys(sectionKeys).includes(s.name));
