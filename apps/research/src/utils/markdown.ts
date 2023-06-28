import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

/**
 * _pages and _pages/dynamic directory where the markdown content will live
 * _pages will have the home.md (aka index or /)
 * _pages/dynamic will be home to all other pages (aka [slug].js)
 */
const pagesDirectory = path.join(process.cwd(), 'src', '_pages');

export async function getPageData(page: string) {
  const fullPath = path.join(pagesDirectory, `${page}.md`);

  const fileContents = fs
    .readFileSync(fullPath, 'utf8')
    .replace(
      /(?<=\]\()(.+)(?=(\)))/g,
      (url) => `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/${url}`
    );
  const { data, content } = matter(fileContents);

  return {
    page,
    content,
    frontmatter: data,
  };
}
