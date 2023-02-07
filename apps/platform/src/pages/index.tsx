import { NextPage } from 'next';
import Image from 'next/image';
import { BasicCards, Hero } from 'ui';
import heroImage from '../assets/hero.svg';
import bloomberg from '../assets/bloomberg.png';
import forbes from '../assets/forbes.png';
import reuters from '../assets/reuters.png';
import ft from '../assets/ft.png';
import cnn from '../assets/cnn.png';
import research from '../assets/research.svg';
import market from '../assets/market.svg';
import invest from '../assets/invest.svg';
import Companies from 'src/components/Companies';
import { HorizontleDivider } from 'ui';

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
const Index: NextPage = () => {
  return (
    <div className="flex flex-col gap-32">
      <Hero
        {...hero}
        bigImage={<Image src={heroImage} width={863} alt="hero-k33-image" />}
      >
        email
      </Hero>
      <Companies {...companies} />
      <div id="k33-apps" className="flex flex-row items-center justify-around">
        {apps.map((app) => (
          <>
            <BasicCards {...app} key={app.title} />
            <HorizontleDivider />
          </>
        ))}
      </div>
    </div>
  );
};

export default Index;
