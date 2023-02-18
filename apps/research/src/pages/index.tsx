import { getAllSubscriptions, getResearchLandingPage } from '@/api';
import {
  ResearchHeader,
  SubscriptionElement,
  CitedBy,
  ProductAdvert,
} from '@/components';
import { LandingPage, Subscriptions } from '@/types';
import { GetStaticProps, NextPage } from 'next';
import left from '../assets/research-left-bg.png';
import right from '../assets/research-right-bg.png';
import Image from 'next/image';
import subImage from '../assets/sub.png';
import { SendEmail } from 'platform-js';

const hero = {
  title: 'Get real insight from industry experts',
  body: 'Understand the digital assets industry, gain insight into the markets, and go deep on the protocols that matter.',
};

interface ResearchProps {
  subscriptions: Subscriptions;
  landingPage: LandingPage;
}
// TODO: put this on contentful
const Research: NextPage<ResearchProps> = ({ subscriptions, landingPage }) => {
  return (
    <>
      <div
        className="relative w-full max-w-[1728px] mx-auto py-8 flex flex-col items-center content-center"
        id="markets-hero"
      >
        <div className="md:absolute md:left-0 md:h-[634px] md:w-[238px] hidden md:block">
          <Image
            src={left}
            fill
            style={{
              objectFit: 'contain',
            }}
            alt="left-market-bg"
          />
        </div>
        <div className="md:absolute md:right-0 md:h-[634px] md:w-[238px] hidden md:block">
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
          className="flex flex-col justify-center items-center content-center text-center gap-4 w-3/5 pt-[123px]"
        >
          <h2 className="text-heading2 text-brand-light-primary">
            {hero.title}
          </h2>
          <p className="text-body2 text-brand-light-tertiary">{hero.body}</p>
          <div className="w-[600px] py-6">
            {/* <SendEmail
              placeholder="Enter your email"
              label="Get Early Access"
              listIds={['d2e4dc82-5cd8-4cc9-ad84-131389919f91']}
            /> */}
          </div>
        </div>
      </div>
      <div className="px-6 md:container md:px-0 pt-20 w-full flex flex-col items-center md:gap-16">
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
