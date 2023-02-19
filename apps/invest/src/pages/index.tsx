import { NextPage } from 'next';
import left from '../assets/left-bg.png';
import right from '../assets/right-bg.png';
import Image from 'next/image';
import { SendEmail } from 'platform-js';
import vault from '../assets/vault.png';
import promotion2 from '../assets/promotion2.png';
import { BasicPromotion } from 'ui';

const hero = {
  title: 'Invest in the future of finance',
  body: 'Build your wealth by investing in high quality funds and indexes recommended by our experts',
};

const offerings = {
  title: 'Our investment philosophy',
  description:
    'The market and narratives dominate in the short term, but in the long run fundamentals will prevail. Our industry leading research is a necessary source of information for everyone that’s serious about investing in digital assets.',
  products: [
    {
      logo: vault,
      title: 'Vault',
      description:
        'Hold custody of your private keys in a secure multisig vault',
      features: [
        'Built for seamless succession planning',
        'Enables an easy transition to trading',
        'Clear transparency and visibility on the blockchain',
      ],
    },
  ],
};

const insightPromotion = {
  image: (
    <Image
      src={promotion2}
      height={744}
      alt="get real insight"
      className="md:w-[400px]"
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
    url: '',
    label: '',
  },
};

const Index: NextPage = () => {
  return (
    <>
      <div
        className="relative w-full md:max-w-[1728px] px-6 md:px-0 mx-auto py-8 flex flex-col items-center content-center"
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
          className="flex flex-col md:justify-center items-center content-center md:text-center gap-4 md:w-3/5 md:pt-[123px]"
        >
          <h2 className="md:text-heading2 text-heading5 text-brand-light-primary">
            {hero.title}
          </h2>
          <p className="md:text-body2 text-brand-light-tertiary text-small">
            {hero.body}
          </p>
          <div className="md:w-[600px] md:py-6 py-8">
            <SendEmail
              placeholder="Enter your email"
              label="Learn More"
              listIds={['']}
            />
          </div>
        </div>
      </div>
      <div className="md:container flex flex-col items-center pt-20 px-6 md:px-0 md:gap-20">
        <div className="text-center flex flex-col md:gap-10 gap-4">
          <h6 className="md:text-heading6 text-heading8">{offerings.title}</h6>
          <p className="md:text-heading8 text-body1 text-label-light-secondary">
            {offerings.description}
          </p>
        </div>
        <div id="promotions" className="w-full">
          <BasicPromotion {...insightPromotion} direction="right" />
        </div>
        <div id="end-promotion" className="flex flex-col md:gap-10">
          <div
            id="end-hero-section"
            className="md:w-[600px] text-center flex flex-col md:gap-6"
          >
            <h2 className="md:text-heading7 text-heading8 text-brand-light-primary">
              Get professional help defining your digital assets investment
              strategy
            </h2>
            <p className="md:text-body2 text-brand-light-tertiary text-small">
              Set up a meeting
            </p>
          </div>
          <SendEmail
            placeholder="Enter your email"
            label="Get in Touch"
            listIds={['']}
          />
        </div>
      </div>
    </>
  );
};

export default Index;
