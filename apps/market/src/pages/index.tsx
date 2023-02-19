import { NextPage } from 'next';
import left from '../assets/markets-left-bg.png';
import right from '../assets/markets-right-bg.png';
import Image from 'next/image';
import { SendEmail } from 'platform-js';
import bespoke from '../assets/bespoke.png';
import professional from '../assets/professional.png';
import vault from '../assets/vault.png';
import { ProductElements } from '@/components';

const hero = {
  title: 'Trade across multiple markets and exchanges',
  body: 'Take the pain away from onboarding, understand what custody solution works best for you, get best execution across multiple exchanges, with real time in-person service & support',
};

const offerings = {
  title: 'Choose a product that’s right for you',
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
    {
      logo: bespoke,
      title: 'Bespoke',
      description: 'Trade any digital asset with 1-on-1 real time support',
      features: [
        'Bespoke setup, service and support via chat, call, or in-person',
        'Market leading rates on USD FX conversion',
        'Q&A with our market research analysts',
      ],
    },
    {
      logo: professional,
      title: 'Professional',
      description:
        'Trade 24/7 with products and liquidity from multiple exchanges',
      features: [
        'Market leading rates on USD FX conversion',
        'Q&A with our market research analysts',
        'Institutional grade portfolio management',
      ],
    },
  ],
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
              label="Get Early Access"
              listIds={['']}
            />
          </div>
        </div>
      </div>
      <div className="md:container flex flex-col items-center pt-20 px-6 md:px-0">
        <div className="md:w-[566px] text-center">
          <h6 className="md:text-heading6 text-heading8">{offerings.title}</h6>
        </div>
        <div className="flex md:flex-row flex-col items-center gap-20 md:py-20 py-12">
          {offerings.products.map((product) => (
            <ProductElements {...product} key={product.title} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;
