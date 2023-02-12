import Image from 'next/image';
import { BasicCards, Hero, BasicPromotion, NextPageWithLayout } from 'ui';
import { MainLayout } from '@/layouts';
import heroImage from '../assets/hero.svg';
import bloomberg from '../assets/bloomberg.png';
import forbes from '../assets/forbes.png';
import reuters from '../assets/reuters.png';
import ft from '../assets/ft.png';
import cnn from '../assets/cnn.png';
import research from '../assets/research.svg';
import market from '../assets/market.svg';
import invest from '../assets/invest.svg';
import promotion1 from '../assets/promotion1.png';
import promotion2 from '../assets/promotion2.png';
import promotion3 from '../assets/promotion3.png';
import researchOffer from '../assets/research_offer.svg';
import adviceOffer from '../assets/advice_offer.svg';
import marketsOffer from '../assets/markets_offer.svg';

import { Companies, SendEmail } from '@/components';
import { ReactElement } from 'react';

const hero = {
  title: 'Safe. Secure. Digital assets.',
  subtitle:
    'Make informed decisions backed by industry leading research, enter the market guided by our multi-exchange brokerage service, and invest safely for the long term in tailored managed funds.',
};

const companies = {
  label: 'Trusted By',
  companies: [ft, bloomberg, cnn, reuters, forbes],
};

const apps = [
  {
    logo: <Image src={research} width={108} height={108} alt="research" />,
    title: 'Research',
    description:
      'Weekly reports on digital asset markets & macro, from industry leading analysts.',
  },
  {
    logo: <Image src={market} width={108} height={108} alt="market" />,
    title: 'Markets',
    description:
      'Get best execution across multiple exchanges, with a custody solution tailored just for you.',
  },
  {
    logo: <Image src={invest} width={108} height={108} alt="invest" />,
    title: 'Investments',
    description:
      'Gain long-term managed exposure to digital assets through tailored managed funds.',
  },
];

const insightPromotion = {
  image: (
    <Image
      src={promotion1}
      height={744}
      alt="get real insight"
      className="md:w-[400px]"
    />
  ),
  title: 'Get real insight',
  description:
    'Understand the digital assets industry, gain insight into the markets, and go deep on the protocols that matter.',
  points: [
    'Weekly reports delivered to your inbox',
    'Monthly webinars',
    'In-depth reports on token fundamentals',
    'Book a call with our analysts',
    'Bespoke research & consulting',
  ],
  callToAction: {
    url: '',
    label: '',
  },
};

const tradePromotion = {
  image: (
    <Image
      src={promotion2}
      height={744}
      alt="Trade with conviction"
      className="md:w-[400px]"
    />
  ),
  title: 'Trade with conviction',
  description:
    'Secure custody, best execution across multiple exchanges, with real time in-person service & support.',
  points: [
    'Bespoke service via chat, call, or in-person',
    'Market leading rates on USD FX conversion',
    'Customised custody arrangements',
    'Q&A with our market research analysts',
    'Seamless onboarding',
  ],
  callToAction: {
    url: '',
    label: '',
  },
};

const securePromotion = {
  image: (
    <Image
      src={promotion3}
      height={744}
      alt="Secure your wealth"
      className="md:w-[400px]"
    />
  ),
  title: 'Secure your wealth',
  description:
    'Establish your digital assets investment strategy guided by our experts, with a list of expertly vetted funds.',
  points: [
    'One-on-one advice and guidance',
    'Bespoke portfolio creation',
    'Curated funds built for long-term growth',
    'Seamless onboarding',
    'Fully regulated exposure',
  ],
  callToAction: {
    url: '',
    label: '',
  },
};

const call = {
  title: 'Are you an investment manager?',
  subtitle: 'Do you want to offer digital assets exposure to your clients?',
};

const offers = [
  {
    logo: (
      <Image src={researchOffer} width={64} height={64} alt="research offer" />
    ),
    title: 'Research',
    description: 'Access to analysts to help investment decision making',
  },
  {
    logo: <Image src={adviceOffer} width={64} height={64} alt="advice offer" />,
    title: 'Advice',
    description:
      'A dedicated tool to manage your clients digital assets trading & investment',
  },
  {
    logo: (
      <Image src={marketsOffer} width={64} height={64} alt="market offer" />
    ),
    title: 'Markets',
    description:
      'Market updates & research reports to keep your clients informed',
  },
];

const Index: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col sm:gap-32 gap-12 px-6 md:px-0">
      <Hero
        {...hero}
        bigImage={<Image src={heroImage} width={863} alt="hero-k33-image" />}
      >
        <SendEmail placeholder="Enter your email" label="Get Early Access" />
      </Hero>
      <Companies {...companies} />
      <div
        id="k33-apps"
        className="flex sm:flex-row flex-col items-center gap-8 sm:justify-between sm:content-center sm:w-full"
      >
        {apps.map((app) => (
          <BasicCards {...app} key={app.title} />
        ))}
      </div>
      <BasicPromotion {...insightPromotion} direction="left" />
      <BasicPromotion {...tradePromotion} direction="right" />
      <BasicPromotion {...securePromotion} direction="left" />
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col text-center items-center justify-center">
          <p className="sm:text-heading6 text-heading7 text-brand-light-primary">
            {call.title}
          </p>
          <p className="sm:text-heading6 text-heading7 text-brand-light-primary">
            {call.subtitle}
          </p>
        </div>
        <div className="flex flex-col items-center w-full">
          <p className="sm:text-heading8 text-body1 text-brand-light-secondary">
            What we offer
          </p>
          <div
            id="k33-offers"
            className="flex sm:flex-row flex-col items-center justify-between pt-14 w-full gap-8"
          >
            {offers.map((offer) => (
              <BasicCards {...offer} key={offer.title} variant="secondary" />
            ))}
          </div>
        </div>
      </div>
      <div
        id="k33-send-email"
        className="sm:w-2/4 w-full sm:pb-32 flex flex-col self-center"
      >
        <SendEmail placeholder="Enter your email" label="Get Early Access" />
      </div>
    </div>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Index;