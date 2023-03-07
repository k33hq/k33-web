import { getArchivedArticle, getArchivedPageSlugs } from '@/api';
import {
  ArticleBody,
  ArticleTitle,
  Indicator,
  Profile,
  ReportsDownload,
} from '@/components';
import { ArchivePage } from '@/types';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { getTitle } from 'platform-js';
import { Divider, NextPageWithLayout } from 'ui';

interface PageProps {
  page: ArchivePage;
}

const Page: NextPageWithLayout<PageProps> = ({ page }) => {
  return (
    <>
      <Head>
        <title>{getTitle('Research', page.title)}</title>
      </Head>
      <Indicator color={'systemOrange'} />
      <section
        id="main-article-section"
        className="flex md:flex-row flex-col-reverse md:container pt-6 md:py-12 md:pt-16 md:gap-6 gap-20"
      >
        <div className="w-full md:w-1/3 bg-bg-light-secondary flex flex-col md:bg-bg-light-primary gap-4 px-6 md:px-0 py-10">
          <p className="text-body1 text-label-light-primary">Written by</p>
          {page.content.authorsCollection ? (
            <>
              {page.content.authorsCollection.items.map((author) => (
                <Profile
                  name={author.name}
                  title={author.title}
                  profilePicture={author.image}
                  key={author.name}
                />
              ))}
            </>
          ) : null}
        </div>

        <article
          className={`flex flex-col justify-center md:gap-8 gap-6 md:w-2/3 w-full px-6 md:px-0`}
        >
          <ArticleTitle
            published={page.content.publishDate}
            product={{
              title: 'Archived Articles',
              href: '/',
              branding: { color: 'systemOrange' },
            }}
            title={page.title}
          />
          <Divider />
          {/* <NutShell document={article.summary} />
          <KeyPoints points={article.keyPoints} /> */}
          <div className="w-full h-64 md:h-[423px] relative">
            {page.content.image ? (
              <Image
                src={page.content.image.url}
                fill
                style={{
                  objectFit: 'contain',
                }}
                alt={page.content.image.description}
              />
            ) : null}
          </div>
          {/* {(subscriber === null || subscriber === 'free') && (
            <div
              id="id-subscribe"
              className="bg-bg-dark-elevated-primary flex flex-col items-center justify-center text-center content-center md:py-16 py-8 md:px-24 px-10 md:gap-6 gap-2"
            >
              <p className="md:text-heading7 text-body1 text-label-dark-primary">
                Upgrade to K33 Research Pro to download all reports
              </p>
              <Link
                href={getUrl(
                  'subscription',
                  'professional-k33-research-subscription'
                )}
              >
                <BasicButton variant="secondary">
                  Start 30-Day Free Trial
                </BasicButton>
              </Link>
            </div>
          )} */}

          {/* {subscriber != null && subscriber === 'pro' && (
            <>
              <ArticleBody document={article.body} />
              {article.reportDocument ? (
                <ReportsDownload
                  url={article.reportDocument.url}
                  title={article.reportDocument.title}
                />
              ) : null}
            </>
          )} */}
          <>
            <ArticleBody document={page.content.publicSnippet} />
            <ArticleBody document={page.content.content} />
            {/* {page.content.linkToReport ? (
              <ReportsDownload
                url={page.content.linkToReport.url}
                title={page.content.linkToReport.title}
              />
            ) : null} */}
          </>
        </article>
        <div id="article-socials" className="md:w-1/3 hidden md:block"></div>
      </section>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const pages = await getArchivedPageSlugs();
  const paths = pages.map(({ slug }) => ({
    params: {
      slug,
    },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params!.slug as string;
  const page = await getArchivedArticle(slug);
  return {
    props: {
      page,
    },
  };
};

export default Page;
