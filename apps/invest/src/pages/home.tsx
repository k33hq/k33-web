import { useFundRedirection } from '@/hooks';
import { MainLayout } from '@/layouts';
import PrivateLayout from '@/layouts/PrivateLayout';
import { ReactElement } from 'react';
import { Marker } from 'ui';
import { NextPageWithLayout } from 'ui';
import content from '../assets/Content.png';
import serviceProviders from '../assets/service_providers.png';
import fundFact from '../assets/fund_fact.png';
import Image from 'next/image';
import { Size } from 'ui';

/**
 *  user-state: [registered, fund-registered]
 * @returns
 */

const fundCards = {
  strategy: {
    title: 'Fund Strategy',
    date: 'Aug 22nd 2022',
    subtitle:
      'Arcane Assets is an actively managed fund with the goal to maximise long term investor returns by capturing the value accrual of cryptocurrencies as an asset class. We do this by offering long exposure to sound projects with strong fundamentals in the crypto space.',

    description: [
      'Furthermore, the fund makes tactical adjustments to its allocations across the crypto asset risk spectrum depending on expected macroeconomic conditions.',
      'Finally, we allocate a small part of our assets under management to discretionary trading, a mix of opportunistic event-driven strategies, employing derivatives strategies, short selling, arbitrage, staking and various investments in the decentralised finance ecosystem. The carefully selected and diversified cryptocurrency exposure ensures that the fund can excel regardless of whether it is bitcoin or other cryptocurrencies that succeed.',
    ],
  },
  position: {
    title: 'position and Near Term Outlook ',
    date: 'Dec 2022',
    subtitle: '',
    description: [
      'The macroeconomic outlook for 2023 has shifted to favouring more neutral positioning but we don’t expect risk-on markets, including crypto, to see a sustained bull market quite yet. That being said, we believe that it is time to move from defensive to more neutral risk positioning in crypto markets, as leverage that built up during the bull craze of 2020 and 2021 has mostly wound down and reset. We see 2023 as a better year for crypto assets than 2022 and are positioning the fund accordingly.',
    ],
  },
  summary: {
    title: 'trading summary',
    description: [
      'The objective of the Fund is to provide a diversified exposure to the cryptocurrency market, independently of the performance of individual assets. The Fund has a long-term fundamental approach to the majority of its investments, but also acts on short-term opportunities in the market.',
    ],
  },
};

const Home: NextPageWithLayout = () => {
  //  const { data, isLoading } = useFundRedirection();
  //if (isLoading) return 'loading';
  return (
    <>
      <section className="bg-bg-light-secondary md:py-16">
        <div className="md:container flex md:flex-row flex-col md:gap-16">
          <FundCard
            size="medium"
            title={fundCards.strategy.title}
            date={fundCards.strategy.date}
          >
            <FundBold>{fundCards.strategy.subtitle}</FundBold>
            {fundCards.strategy.description.map((d) => (
              <FundRegular key={d}>{d}</FundRegular>
            ))}
          </FundCard>
          <FundCard
            size="medium"
            title={fundCards.position.title}
            date={fundCards.position.date}
          >
            <FundBody>{fundCards.position.description}</FundBody>
          </FundCard>
        </div>
      </section>
      <section className="bg-bg-light-primary md:py-16">
        <div className="md:container flex flex-col md:gap-10">
          <div className="flex md:flex-row flex-col md:gap-8">
            <FundCard
              size="medium"
              title="Fund Performance"
              date="Monthly Performance of K33 vs. Bitcoin"
            >
              <Image src={content} alt="" />
              <div></div>
            </FundCard>
            <div className="flex flex-col md:gap-4">
              <FundCard title="trading summary" date={''}>
                <FundBold>
                  The objective of the Fund is to provide a diversified exposure
                  to the cryptocurrency market, independently of the performance
                  of individual assets. The Fund has a long-term fundamental
                  approach to the majority of its investments, but also acts on
                  short-term opportunities in the market.
                </FundBold>
              </FundCard>
              <FundCard title="key fund facts" date={''}>
                <Image src={fundFact} alt="" />
              </FundCard>
            </div>
          </div>
          <FundCardBody size="large">
            <div className="flex flex-row justify-between">
              <FundCardContent title="Fund Terms" date="">
                <table className="table-auto text-left border-separate border-spacing-2">
                  <thead className="text-caption text-label-light-primary">
                    <tr>
                      <th>Minimum Investment</th>
                      <th>Share Class B $100,000</th>
                      <th>Share Class D $250,000</th>
                    </tr>
                  </thead>
                  <tbody className="text-label-light-secondary text-body3">
                    <tr>
                      <td>Investors</td>
                      <td>Professional (MiFID II)</td>
                      <td>Professional (MiFID II)</td>
                    </tr>
                    <tr>
                      <td>Subscriptions</td>
                      <td>Monthly</td>
                      <td>Monthly</td>
                    </tr>
                    <tr>
                      <td>Redemptions</td>
                      <td className="pr-10">30 days notice period</td>
                      <td>30 days notice period</td>
                    </tr>
                    <tr>
                      <td>Base Currency</td>
                      <td>USD</td>
                      <td>USD</td>
                    </tr>
                    <tr>
                      <td>Management Fee</td>
                      <td>2%</td>
                      <td>2%</td>
                    </tr>
                    <tr>
                      <td>Performance Fee</td>
                      <td>20%</td>
                      <td>20% (btc benchmark)</td>
                    </tr>
                    <tr>
                      <td>High watermark</td>
                      <td>Yes</td>
                      <td>Yes</td>
                    </tr>
                    <tr>
                      <td>Redemption Fee</td>
                      <td>1% (2% first 3 years)</td>
                      <td>1% (2% first 3 years)</td>
                    </tr>
                    <tr>
                      <td className="pr-10">Recommended Investment Term</td>
                      <td>Long-term</td>
                      <td>Long-term</td>
                    </tr>
                  </tbody>
                </table>
              </FundCardContent>
              <FundCardContent title="Service Providers" date="">
                <Image src={serviceProviders} alt="service providers" />
              </FundCardContent>
            </div>
          </FundCardBody>
        </div>
      </section>
    </>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;

interface FundCardContentProps {
  title: string;
  date: string;
  children: React.ReactNode;
}

const FundCardContent: React.FC<FundCardContentProps> = ({
  title,
  date,
  children,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center md:gap-4 md:pb-6">
        <div className="flex flex-row items-center gap-1">
          <Marker color="brand.black" />
          <p className="uppercase text-heading8 text-label-light-primary/60">
            {title}
          </p>
        </div>
        <p className="text-body4 text-label-light-secondary/60">{date}</p>
      </div>
      <div className="flex flex-col md:gap-4">{children}</div>
    </div>
  );
};

interface FundCardBodyProps {
  children: React.ReactNode;
  size?: Size;
}

const cardSize: Record<Size, string> = {
  small: 'md:w-[624px]',
  large: 'w-full',
  medium: 'md:max-w-[832px] md:min-w-[720px]',
};

const FundCardBody: React.FC<FundCardBodyProps> = ({
  children,
  size = 'small',
}) => {
  return (
    <div
      className={`bg-bg-light-primary shadow-lg ring-1 ring-label-light-tertiary/10 md:px-10 md:py-8 rounded-xl ${cardSize[size]}`}
    >
      {children}
    </div>
  );
};

interface FundTextProps {
  children: React.ReactNode;
}

interface FundBoldProps extends FundTextProps {}

const FundBold: React.FC<FundBoldProps> = ({ children }) => {
  return <p className="text-body1 text-label-light-primary">{children}</p>;
};

const FundRegular: React.FC<FundTextProps> = ({ children }) => {
  return <p className="text-small text-label-light-secondary">{children}</p>;
};

const FundBody: React.FC<FundTextProps> = ({ children }) => {
  return <p className="text-body3 text-label-light-secondary">{children}</p>;
};

interface FundCardProps
  extends Omit<FundCardBodyProps, 'children'>,
    FundCardContentProps {}

const FundCard: React.FC<FundCardProps> = ({
  title,
  date,
  children,
  size = 'small',
}) => {
  return (
    <FundCardBody size={size}>
      <FundCardContent title={title} date={date}>
        {children}
      </FundCardContent>
    </FundCardBody>
  );
};
