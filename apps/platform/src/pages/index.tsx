import Image from 'next/image';
import {
  BasicCards,
  Hero,
  BasicPromotion,
  NextPageWithLayout,
  BasicButton,
  ListIcon,
} from 'ui';
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
import { BiRightArrowAlt } from 'react-icons/bi';

import { Companies } from '@/components';

import { ReactElement } from 'react';
import { SendEmail, getTitle } from 'platform-js';
import Head from 'next/head';

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
    url: process.env.NEXT_PUBLIC_RESEARCH_URL as string,
    description:
      'Weekly reports on digital asset markets & macro, from industry leading analysts.',
  },
  {
    logo: <Image src={market} width={108} height={108} alt="market" />,
    title: 'Markets',
    url: process.env.NEXT_PUBLIC_MARKETS_URL as string,
    description:
      'Get best execution across multiple exchanges, with a custody solution tailored just for you.',
  },
  {
    logo: <Image src={invest} width={108} height={108} alt="invest" />,
    title: 'Investments',
    url: process.env.NEXT_PUBLIC_INVEST_URL as string,
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
      className="md:w-[768px] w-[328px]"
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
    url: process.env.NEXT_PUBLIC_RESEARCH_URL as string,
    label: 'Find Out More',
  },
};

const tradePromotion = {
  image: (
    <Image
      src={promotion2}
      height={744}
      alt="Trade with conviction"
      className="md:w-[768px] w-[328px]"
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
    url: process.env.NEXT_PUBLIC_MARKETS_URL as string,
    label: 'Find Out More',
  },
};

const securePromotion = {
  image: (
    <Image
      src={promotion3}
      height={744}
      alt="Secure your wealth"
      className="md:w-[768px] w-[328px]"
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
    url: process.env.NEXT_PUBLIC_INVEST_URL as string,
    label: 'Find Out More',
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

//

const Index: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>{getTitle(hero.title)}</title>
      </Head>
      <div className="flex flex-col md:container md:flex-row gap-12 items-center justify-between pb-[88px]">
        <div className="flex flex-col gap-4 md:px-0 px-6">
          <p className="text-heading4 md:text-heading2">{hero.title}</p>
          <p className="text-brand-light-tertiary md:text-body4 text-body3">
            {hero.subtitle}
          </p>
          {/* <SendEmail
            placeholder="Enter your email"
            label="Get Started"
            listIds={['d2e4dc82-5cd8-4cc9-ad84-131389919f91']}
          /> */}
        </div>
        <Image
          src={heroImage}
          width={863}
          alt="hero-k33-image"
          className="md:w-[863px] w-[458px]"
        />
      </div>
      <div className="flex flex-col md:gap-24 gap-44 px-6 md:px-0 md:container">
        <Companies {...companies} />
        <div
          id="k33-apps"
          className="flex md:flex-row flex-col items-center gap-8 md:justify-between md:content-center md:w-full md:pb-20"
        >
          {apps.map((app) => (
            <BasicCards {...app} key={app.title}>
              <a
                href={app.url}
                className="ui-text-heading6 hover:underline ui-text-brand-light-primary"
              >
                {app.title}
              </a>
            </BasicCards>
          ))}
        </div>
        <div className="md:container md:px-0 px-6 flex flex-col gap-32 md:gap-52">
          <div className="flex md:flex-row flex-col md:gap-10 gap-8 items-center">
            {insightPromotion.image}
            <div className="flex flex-col gap-8 items-start">
              <div className="flex flex-col gap-2">
                <p className="text-heading5 md:text-heading4 text-label-light-primary/80 md:text-label-light-primary">
                  {insightPromotion.title}
                </p>
                <p className="text-small md:text-body1 text-label-light-secondary">
                  {insightPromotion.description}
                </p>
              </div>
              <div className="flex flex-col gap-3 md:gap-9 justify-center">
                {insightPromotion.points.map((point) => (
                  <div key={point} className="flex flex-row items-center gap-2">
                    <ListIcon />
                    <p className="md:text-heading8 text-body1 text-label-light-secondary">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
              <a href={insightPromotion.callToAction.url}>
                <BasicButton>
                  <div className="flex flex-row items-center gap-2">
                    {insightPromotion.callToAction.label} <BiRightArrowAlt />
                  </div>
                </BasicButton>
              </a>
            </div>
          </div>
          <div className="flex md:flex-row flex-col-reverse md:gap-10 gap-8 items-center">
            <div className="flex flex-col gap-8 items-start">
              <div className="flex flex-col gap-2">
                <p className="text-heading5 md:text-heading4 text-label-light-primary/80 md:text-label-light-primary">
                  {tradePromotion.title}
                </p>
                <p className="text-small md:text-body1 text-label-light-secondary">
                  {tradePromotion.description}
                </p>
              </div>
              <div className="flex flex-col gap-3 md:gap-9 justify-center">
                {tradePromotion.points.map((point) => (
                  <div key={point} className="flex flex-row items-center gap-2">
                    <ListIcon />
                    <p className="md:text-heading8 text-body1 text-label-light-secondary">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
              <a href={tradePromotion.callToAction.url}>
                <BasicButton>
                  <div className="flex flex-row items-center gap-2">
                    {tradePromotion.callToAction.label} <BiRightArrowAlt />
                  </div>
                </BasicButton>
              </a>
            </div>
            {tradePromotion.image}
          </div>
          <div className="flex md:flex-row flex-col md:gap-10 gap-8 items-center">
            {securePromotion.image}
            <div className="flex flex-col gap-8 items-start">
              <div className="flex flex-col gap-2">
                <p className="text-heading5 md:text-heading4 text-label-light-primary/80 md:text-label-light-primary">
                  {securePromotion.title}
                </p>
                <p className="text-small md:text-body1 text-label-light-secondary">
                  {securePromotion.description}
                </p>
              </div>
              <div className="flex flex-col gap-3 md:gap-9 justify-center">
                {securePromotion.points.map((point) => (
                  <div key={point} className="flex flex-row items-center gap-2">
                    <ListIcon />
                    <p className="md:text-heading8 text-body1 text-label-light-secondary">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
              <a href={securePromotion.callToAction.url}>
                <BasicButton>
                  <div className="flex flex-row items-center gap-2">
                    {securePromotion.callToAction.label} <BiRightArrowAlt />
                  </div>
                </BasicButton>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Index;
