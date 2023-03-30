import left from '../assets/kvq-left-bg.png';
import right from '../assets/kvq-right-bg.png';
import Image from 'next/image';
import { MainLayout } from '@/layouts';
import { NextPageWithLayout } from 'ui';
import Head from 'next/head';
import { getTitle } from 'platform-js';
import { GetStaticProps } from 'next';
import { getPageData } from '@/lib';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

interface TermsAndConditionsProps {
  terms: {
    page: string;
    content: string;
    frontmatter: {
      title: any;
      description: any;
    };
  };
}

const TermsAndConditions: NextPageWithLayout<TermsAndConditionsProps> = ({
  terms,
}) => {
  return (
    <>
      <Head>
        <title>{getTitle('Terms and Condition')}</title>
      </Head>
      <div
        className="relative w-full max-w-[1728px] mx-auto py-8 flex flex-col items-center content-center px-6 xl:px-0 transition-all ease-in"
        id="markets-hero"
      >
        <div className="xl:absolute xl:left-0 xl:h-[420px] xl:w-[200px] 2xl:w-[238px] hidden xl:block">
          <Image
            src={left}
            fill
            style={{
              objectFit: 'contain',
            }}
            alt="left-market-bg"
          />
        </div>
        <div className="xl:absolute xl:right-0 xl:h-[420px] xl:w-[200px]  2xl:w-[238px] hidden xl:block transition-all ease-in-out">
          <Image
            src={right}
            fill
            style={{
              objectFit: 'contain',
            }}
            alt="left-market-bg"
          />
        </div>
        <div
          id="hero-text"
          className="flex flex-col items-start lg:justify-center lg:items-center xl:container xl:content-center xl:text-center gap-4 2xl:w-[1173px] xl:w-[1000px] xl:pt-[164px] xl:pb-[188px] pb-[80px] transition-all ease-in"
        >
          <h2 className="xl:text-heading2 text-heading6 text-brand-light-primary">
            {terms.frontmatter.title}
          </h2>
        </div>
      </div>
      <div
        id="company-info"
        className="transition-all delay-75 ease-in-out md:container flex flex-col items-center pb-[120px]"
      >
        <div className="flex flex-col md:w-[672px] prose max-w-none prose-p:text-body2 prose-headings:text-label-light-primary prose-h2:text-heading8 px-6 md:px-0">
          <ReactMarkdown>{terms.content}</ReactMarkdown>
        </div>
      </div>
    </>
  );
};

TermsAndConditions.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export const getStaticProps: GetStaticProps<TermsAndConditionsProps> = async ({
  params,
}) => {
  const terms = await getPageData('terms');
  return {
    props: {
      terms,
    },
  };
};

export default TermsAndConditions;
