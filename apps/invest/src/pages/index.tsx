import { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { SendEmail, useAppState } from 'platform-js';
import { BasicButton, BasicPromotion } from 'ui';

import promotion2 from '../assets/promotion2.png';
import { InvestFooter, InvestHeader } from '@/components';

const hero = {
  title: 'Invest in the future of finance',
  body: 'Build your wealth by investing in high quality funds and indexes guided by our experts',
};
const insightPromotion = {
  image: (
    <Image
      src={promotion2}
      height={744}
      alt="get real insight"
      className="md:w-[1000px]"
    />
  ),
  title: 'K33 Assets Fund',
  description: 'Get managed exposure to cryptocurrencies as an asset class',
  points: [
    'Actively managed',
    'Invest in quality projects',
    'For professional investors',
  ],
  callToAction: {
    url: process.env.NEXT_PUBLIC_INVEST_URL + '/' + 'classification',
    label: 'Learn More',
  },
};

// TODO: put this on contentful
const Index: NextPage = () => {
  return (
    <>
      <div className="min-h-screen pb-12">
        <div className="bg-scroll bg-landing bg-blend-soft-light bg-center bg-no-repeat bg-cover bg-brand-light-primary min-h-[482px] w-full">
          <InvestHeader />
          <div className="md:container flex flex-col items-center justify-center md:gap-16 gap-12 text-center md:pt-20 pt-11 md:px-0 px-6">
            <div className="flex flex-col md:gap-8 gap-4 items-center justify-center">
              <div className="text-brand-dark-primary flex flex-col md:gap-2">
                <h5 className="md:text-heading2 text-heading8">{hero.title}</h5>
                <h6 className="md:text-body2 text-heading8">{hero.body}</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 md:container md:px-0 pt-20 w-full flex flex-col items-center md:gap-16 pb-32">
          <div
            id="product-heading"
            className="flex flex-col items-center gap-2 justify-center content-center text-center"
          >
            <p className="md:text-heading7 text-label-light-primary text-heading8">
              Our Investment Philosophy
            </p>
            <p className="text-body1 md:text-heading8 text-label-light-secondary">
              Digital assets represent a new paradigm for finance and is
              emerging as a distinct asset class. By leveraging deep industry
              knowledge, combined with technical expertise, we are able to
              navigate and identity investment opportunities with promising
              fundamentals and long term viability.
            </p>
          </div>
        </div>
        <div className="px-6 md:container md:px-0">
          <BasicPromotion {...insightPromotion} direction="left" />
        </div>
      </div>
      <InvestFooter />
    </>
  );
};

export default Index;
