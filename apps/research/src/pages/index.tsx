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
import { SendEmail, useAppState } from 'platform-js';
import { BasicButton } from 'ui';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import config from '@/firebase/config';

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
  return (
    <>
      <div className="min-h-screen pb-12">
        <div className="bg-scroll bg-landing bg-blend-soft-light bg-center bg-no-repeat bg-cover bg-brand-light-primary min-h-[544px] w-full">
          <ResearchHeader categories={[]} />
          <div className="md:container flex flex-col items-center justify-center md:gap-16 gap-12 text-center md:pt-20 pt-11 md:px-0 px-6">
            <div className="flex flex-col md:gap-8 gap-4 items-center justify-center">
              <div className="text-brand-dark-primary flex flex-col md:gap-2">
                <h5 className="md:text-heading5 text-heading8">{hero.title}</h5>
                <h6 className="md:text-heading6 text-heading8">{hero.body}</h6>
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
        <div className="px-6 md:container md:px-0 pt-20 w-full flex flex-col items-center md:gap-16 pb-32">
          <div
            id="product-heading"
            className="flex flex-col items-center gap-2 justify-center content-center md:w-[624px] text-center"
          >
            <p className="md:text-heading7 text-label-light-primary text-heading8">
              Our main reports
            </p>
            <p className="text-body1 md:text-heading8 text-label-light-secondary">
              The market and narratives dominate in the short term, but in the
              long run fundamentals will prevail.
            </p>
          </div>
          <div
            id="product-list"
            className="flex md:flex-row md:gap-24 gap-8 flex-col px-6 md:px-0"
          >
            {landingPage.productsCollection.items.map((advert) => (
              <ProductAdvert key={advert.productSlug} {...advert} />
            ))}
          </div>
        </div>
        <AnalystPromotion />
        <div className="px-6 md:container md:px-0">
          <div className="flex flex-col md:flex-row  w-full items-center justify-between py-20 md:py-32">
            <div id="subscription-title" className="relative">
              <Image src={subImage} height={779} width={700} alt="asd" />
              <h2 className="absolute top-1/2 left-1/3 -translate-x-1/3 -translate-y-1/2 text-heading6 md:text-heading2 text-label-light-primary md:w-[509px] w-[249px]">
                Choose a plan that’s right for you
              </h2>
            </div>
            <div
              id="subscription-element"
              className="flex md:flex-row items-start md:gap-20 flex-col gap-12"
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
