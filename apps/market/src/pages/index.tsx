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
  ],
};

const Index: NextPage = () => {
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
            <SendEmail
              placeholder="Enter your email"
              label="Get Early Access"
              listIds={['d2e4dc82-5cd8-4cc9-ad84-131389919f91']}
            />
          </div>
        </div>
      </div>
      <div className="md:container flex flex-col items-center py-20">
        <div className="w-[566px] text-center">
          <h6 className="text-heading6">{offerings.title}</h6>
        </div>
        <div>
          {offerings.products.map((product) => (
            <ProductElements {...product} key={product.title} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;
