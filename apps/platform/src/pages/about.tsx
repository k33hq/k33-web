import left from '../assets/about-left-bg.png';
import right from '../assets/about-right-bg.png';
import Image from 'next/image';
import { MainLayout } from '@/layouts';
import { NextPageWithLayout } from 'ui';
//import aboutUsImage from '../assets/AboutUs.png';
import aboutUsImage from '../assets/about.png';
import aboutUsMobile from '../assets/about-mobile.png';
import Head from 'next/head';
import { getTitle } from 'platform-js';

const hero = {
  title: 'Safe. Secure. Digital Assets.',
  body: 'Who we are and what we stand for',
};

const aboutUs = [
  'K33’s mission is to build the most secure and accessible platform to learn about, trade, and hold digital assets. As a research-led brokerage with investment services, we deeply understand the digital assets landscape, with the need for secure and verifiable custody, the risk inherent in trading, the difficulty in selecting safe investments, and the desire for impartial and objective research and analysis.',
  'We hold transparency as a core principle, from the accessibility of our analysts, the visibility of our custody, the openness of our financials, right down to our open-source code base.',
];

const About: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>{getTitle('About')}</title>
      </Head>
      <div
        className="relative w-full max-w-[1728px] mx-auto py-8 flex flex-col items-center content-center px-6 md:px-0"
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
          className="flex flex-col justify-center items-center md:container md:content-center md:text-center gap-4 md:w-[1173px] md:pt-[188px]"
        >
          <h2 className="md:text-heading2 text-heading5 text-brand-light-primary">
            {hero.title}
          </h2>
          <p className="md:text-heading5 text-heading8 text-brand-light-tertiary">
            {hero.body}
          </p>
        </div>
      </div>
      <div
        id="company-info"
        className="md:text-heading7 text-heading8 px-6 md:px-0 text-label-light-secondary md:container flex flex-col md:flex-row md:justify-between md:items-center md:pt-72 pt-20 pb-[72px] gap-11 md:gap-0"
      >
        <div className="flex flex-col md:gap-12 md:w-[720px] gap-6">
          {aboutUs.map((para) => (
            <p key={para} className="">
              {para}
            </p>
          ))}
          <p>
            Built by a dedicated team of industry experts, K33 is your gateway
            to safe, secure, digital assets. K33 is fully owned by the Nasdaq
            First North listed Arcario AB, previously Arcane Crypto AB. For more
            information, check out
            <a
              className="hover:text-label-light-primary px-2"
              href="http://arcario.com"
            >
              arcario.com
            </a>
            or go directly to Investor Relations for Arcario
          </p>
        </div>
        <div className="relative w-full md:h-[763px] md:w-[636px] h-[999px] hidden md:block">
          <Image
            src={aboutUsImage}
            fill
            alt="k33 family"
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
        <div className="relative md:hidden block transition-all h-[935px] w-[328px]">
          <Image
            src={aboutUsMobile}
            fill
            alt="k33 family"
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
      </div>
    </>
  );
};

About.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default About;
