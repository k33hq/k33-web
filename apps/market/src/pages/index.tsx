import { NextPage } from 'next';
import left from '../assets/markets-left-bg.png';
import right from '../assets/markets-right-bg.png';
import Image from 'next/image';
import { SendEmail, getTitle } from 'platform-js';
import bespoke from '../assets/bespoke.png';
import professional from '../assets/professional.png';
import vault from '../assets/vault.png';
import { MarketFooter, MarketHeader, ProductElements } from '@/components';
import Head from 'next/head';

const hero = {
  title: 'Discover trades across multiple markets.',
  body: 'We support your growth with a simple pricing structure, understanding what custody solution works best for you, and getting best execution across multiple counterparties.',
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
      <Head>
        <title>{getTitle('Market')}</title>
      </Head>
      <div className="min-h-screen">
        <div className="bg-scroll bg-landing bg-blend-soft-light bg-center bg-no-repeat bg-cover bg-brand-light-primary md:h-[544px] min-h-[376px] w-full bg-[url('../assets/landing.svg')]">
          <MarketHeader />
          <div className="md:container flex flex-col items-center justify-center md:gap-16 gap-12 text-center md:pt-36 pt-11 md:px-0 px-6">
            <div className="flex flex-col md:gap-8 gap-4 items-center justify-center">
              <div className="text-brand-dark-primary flex flex-col md:gap-2">
                <h5 className="md:text-heading4 text-heading6">{hero.title}</h5>
                <h6 className="md:text-body1 text-caption">{hero.body}</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="md:container flex flex-col items-center pt-20 px-6 md:px-0">
          <div className="md:w-[566px] text-center">
            <h6 className="md:text-heading6 text-heading8">
              {offerings.title}
            </h6>
          </div>
          <div className="flex md:flex-row flex-col items-center gap-20 md:py-20 py-12">
            {offerings.products.map((product) => (
              <ProductElements {...product} key={product.title} />
            ))}
          </div>
        </div>
      </div>
      <MarketFooter />
    </>
  );
};

export default Index;
