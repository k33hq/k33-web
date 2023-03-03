import { ArchivePageSlugs } from '@/types';
// import fs from 'fs';

// export const generateSitemap = async (posts: ArchivePageSlugs) => {
//   const sitemap = `
// <?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
// ${[...posts]
//   .map(
//     (post) => `<url>
//   <loc>${process.env.NEXT_PUBLIC_RESEARCH_URL}/${post.slug}</loc>
//   <lastmod>${post.sys.publishedAt}</lastmod>
// </url>`
//   )
//   .join('')}
// </urlset>`.replace(',', '');

//   // writes sitemap.xml to public directory
//   const path = `${process.cwd()}/public/sitemap.xml`;

//   fs.writeFileSync(path, sitemap, 'utf8');

//   return sitemap;
// };

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

// TODO: put these in some lib
// TODO: update research use this from platform-js
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
