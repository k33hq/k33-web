export * from './domain';
export * from './api';

export interface Frontmatter {
  title: string;
  description: string;
  author?: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface Page {
  content: string;
  frontmatter: Frontmatter;
}
