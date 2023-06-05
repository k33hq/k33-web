import { getArticlePage, getArticleSeo, getArticleSlugs } from '@/api';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const articles = await getArticleSlugs();
  return articles.map(({ articleSlug }) => ({
    slug: articleSlug,
  }));
}

interface PageProps {
  params: {
    slug: string;
  };
}

// TODO: add tags
// TODO: add image
// TODO: add section links
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = params.slug;
  const { article, ...data } = await getArticleSeo(slug);
  if (data.seo) {
    const { seo } = data;
    return {
      title: seo.title,
      description: seo.description,
      twitter: {
        title: seo.title,
        description: seo.description,
      },
      openGraph: {
        title: seo.title,
        description: seo.description,
      },
    };
  }
  return {
    title: article.title,
    description: article.subtitle,
    twitter: {
      title: article.title,
      description: article.subtitle,
    },
    openGraph: {
      title: article.title,
      description: article.subtitle,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const page = await getArticlePage(params.slug);
  return <div>{params.slug}</div>;
}
