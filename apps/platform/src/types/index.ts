export interface Frontmatter {
  title: string;
  description: string;
  author?: string;
  updatedAt?: string;
  createdAt?: string;
}

interface Page {
  content: string;
  frontmatter: Frontmatter;
}
