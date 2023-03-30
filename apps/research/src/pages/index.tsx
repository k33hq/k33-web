import { getAllSubscriptions, getResearchLandingPage } from '@/api';
import {
  ResearchHeader,
  SubscriptionElement,
  CitedBy,
  ProductAdvert,
  ResearchFooter,
  AnalystPromotion,
} from '@/components';
import { LandingPage, Subscriptions } from '@/types';
import { GetStaticProps, NextPage } from 'next';
import left from '../assets/research-left-bg.png';
import right from '../assets/research-right-bg.png';
import Image from 'next/image';
import subImage from '../assets/sub.png';
import { SendEmail, getTitle, useAppState } from 'platform-js';
import { BasicButton } from 'ui';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import config from '@/firebase/config';
import Head from 'next/head';
import { getUrl, siteUsername } from '@/utils';

const hero = {
  title: 'Understand the digital assets industry,',
  body: 'from short-term market signals to long-term fundamentals.',
};

interface ResearchProps {
  subscriptions: Subscriptions;
  landingPage: LandingPage;
}
// TODO: put this on contentful
const Research: NextPage<ResearchProps> = ({ subscriptions, landingPage }) => {
  const router = useRouter();
  const state = useAppState(config);
  useEffect(() => {
    if (state === 'REGISTRED') {
      router.push('/home');
    }
  }, [state, router]);

  const getSeo = () => {
    if (landingPage.seo)
      return (
        <>
          <>
            <meta name="description" content={landingPage.seo.description} />
            <meta
              property="og:title"
              content={landingPage.seo.title}
              key="ogtitle"
            />
            <meta
              property="og:description"
              content={landingPage.seo.description}
              key="ogdesc"
            />

            <meta property="og:image" content={landingPage.seo.image.url} />

            <meta name="twitter:title" content={landingPage.seo.title} />
            <meta
              name="twitter:description"
              content={landingPage.seo.description}
            />
            <meta name="twitter:image" content={landingPage.seo.image.url} />
          </>
        </>
      );
    return (
      <>
        <meta name="description" content={''} />
        <meta property="og:title" content={landingPage.title} key="ogtitle" />
        <meta property="og:description" content={''} key="ogdesc" />

        <meta name="twitter:title" content={landingPage.title} />
        <meta name="twitter:description" content={''} />
      </>
    );
  };

  return (
    <>
      <Head>
        {getSeo()}
        <title>{getTitle('Research')}</title>
        <meta name="twitter:site" content={siteUsername} />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_RESEARCH_URL + getUrl()}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="min-h-screen pb-12">
        <div className="bg-scroll bg-landing bg-blend-soft-light bg-center bg-no-repeat bg-cover bg-bg-dark-primary min-h-[544px] w-full">
          <ResearchHeader categories={[]} />
          <div className="xl:container flex flex-col items-center justify-center lg:gap-16 gap-12 text-center lg:pt-20 pt-11 xl:px-0 px-6 transition-all ease-in-out">
            <div className="flex flex-col lg:gap-8 gap-4 items-center justify-center">
              <div className="text-brand-dark-primary flex flex-col lg:gap-2">
                <h5 className="lg:text-heading5 text-heading8">{hero.title}</h5>
                <h6 className="lg:text-heading6 text-heading8">{hero.body}</h6>
              </div>
              <BasicButton
                onClick={() => router.push('home')}
                variant="secondary"
              >
                Get Access Now
              </BasicButton>
            </div>
            <CitedBy />
          </div>
        </div>
        <div className="px-6 xl:container xl:px-0 pt-20 w-full flex flex-col items-center xl:gap-16 pb-20 xl:pb-32 gap-10 transition-all ease-in-out">
          <div
            id="product-heading"
            className="flex flex-col items-center gap-2 justify-center content-center xl:w-[624px] text-center"
          >
            <p className="xl:text-heading7 text-label-light-primary text-heading8">
              Our main reports
            </p>
            <p className="text-body1 xl:text-heading8 text-label-light-secondary">
              The market and narratives dominate in the short term, but in the
              long run fundamentals will prevail.
            </p>
          </div>
          <div
            id="product-list"
            className="flex lg:flex-row lg:gap-24 md:gap-12 gap-8 flex-col px-6 xl:px-0 transition-all ease-in-out"
          >
            {landingPage.productsCollection.items.map((advert) => (
              <ProductAdvert key={advert.productSlug} {...advert} />
            ))}
          </div>
        </div>
        <AnalystPromotion />
        <div className="2xl:container">
          <div className="flex flex-col xl:flex-row w-full items-center justify-between py-20 xl:py-32 transition-all ease-in-out">
            <div id="subscription-title" className="relative py-10 self-start">
              <Image
                src={subImage}
                height={779}
                width={700}
                alt="choose a product"
                className="w-[400px] md:w-[550px] xl:w-[700px]"
              />
              <h2 className="absolute top-1/2 left-1/4 -translate-x-1/3 -translate-y-1/2 sm:left-1/3 md:left-1/3 lg:left-2/3 lg:-translate-x-2/3 text-heading6 sm:text-heading5 md:text-heading4 xl:text-heading3 2xl:text-heading2 text-label-light-primary md:w-[500px] sm:w-[400px] xl:w-[490px] 2xl:w-[509px] w-[249px] transition-all ease-in-out px-6 2xl:px-0">
                Choose a plan that’s right for you
              </h2>
            </div>
            <div
              id="subscription-element"
              className="flex md:flex-row items-start md:gap-4 lg:gap-8 xl:gap-12 2xl:gap-20 flex-col gap-12 px-6 2xl:px-0 transition-all ease-in-out"
            >
              {subscriptions.map((subscription) => (
                <SubscriptionElement
                  subscription={subscription}
                  key={subscription.stripeProductId}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <ResearchFooter categories={[]} />
    </>
  );
};

export default Research;

export const getStaticProps: GetStaticProps<ResearchProps> = async () => {
  const landingPage = await getResearchLandingPage();
  const subscriptions = await getAllSubscriptions();

  return {
    props: {
      subscriptions,
      landingPage,
    },
  };
};
