import { ReactElement, useEffect } from 'react';
import { BasicButton, Marker, Size } from 'ui';
import performanceImage from '../assets/performance.svg';
import Image from 'next/image';
import { FundPromotion } from '@/components';
import { ImDownload2 } from 'react-icons/im';
import PrivateMainLayout from '@/layouts/PrivateMainLayout';
import Head from 'next/head';
import { getTitle, NextPageWithLayout, useAppState } from 'platform-js';
import { useLazyGetFundRegistrationQuery } from '@/services';
import { useRouter } from 'next/router';
import config from '@/firebase/config';

/**
 *  user-state: [registered, fund-registered]
 * @returns
 */

const fundCards = {
  strategy: {
    title: 'Fund Strategy',
    date: '',
    subtitle:
      'K33 Assets is an actively managed fund with the goal to maximize long-term investor returns by capturing the value accrual of cryptocurrencies as an asset class. We do this by offering long exposure to sound projects with strong fundamentals in the crypto space.',

    description: [
      'Furthermore, the fund makes tactical adjustments to its allocations across the crypto asset risk spectrum depending on expected macroeconomic conditions.',
      'Finally, we allocate a small part of our assets under management to discretionary trading, a mix of opportunistic event-driven strategies, employing derivatives strategies, short selling, arbitrage, staking and various investments in the decentralized finance ecosystem. The carefully selected and diversified cryptocurrency exposure ensures that the fund can excel regardless of whether it is Bitcoin or other cryptocurrencies that succeed.',
    ],
  },
  position: {
    title: 'position and Near Term Outlook',
    date: 'June 2024',
    subtitle: '',
    description: [
      'While momentum from BTC ETF inflows tapered in April and May, suggesting a low-activity summer, the approval of Ethereum spot ETFs has revitalised the markets, prompting a reassessment of our expectations for the coming months. While we still think summer will be relatively calm, the upcoming Ethereum ETFs  combined with anticipated BTC MtGox repayments make us bullish on ETHBTC. Consequently, the fund has increased its ETH exposure.',
      'Looking past the summer, the outlook for crypto in the second half of the year has improved significantly. Crypto, previously unmentioned in such contexts, now looks to have become a topic in the US election. This, along with the BTC and ETH ETFs, indicates continued adoption.',
    ],
  },
  performance: {
    title: 'fund performance',
    subtitle: 'Monthly Performance of K33 vs. Bitcoin',
    data: [
      {
        duration: 'Year to Date',
        k33: '55.71',
        btc: '59.86',
      },
      {
        duration: '1 Month',
        k33: '14.50',
        btc: '11.07',
      },
      {
        duration: '3 Months',
        k33: '9.72',
        btc: '10.08',
      },
      {
        duration: '6 Months',
        k33: '85.56',
        btc: '78.92',
      },
      {
        duration: '1 Year',
        k33: '141.64',
        btc: '147.66',
      },
      {
        duration: 'Launch to Date',
        k33: '1012.74',
        btc: '765.55',
      },
    ],
  },
  summary: {
    title: 'trading summary',
    description: [
      'The objective of the Fund is to provide diversified exposure to the cryptocurrency market, independently of the performance of individual assets. The Fund has a long-term fundamental approach to the majority of its investments but also acts on short-term opportunities in the market.',
    ],
  },
  facts: {
    title: 'key fund facts',
    data: [
      {
        key: 'Fund Type',
        value: 'Limited',
      },
      {
        key: 'Pricing (NAV)',
        value: 'Monthly',
      },
      {
        key: 'Investment Manager',
        value: 'AK Jensen Limited',
      },
      {
        key: 'Fund Manager',
        value: 'Torbjørn Bull Jenssen',
      },
      {
        key: 'Fund Manager',
        value: 'Oskar Janson',
      },
      {
        key: 'Subscription Notice',
        value: '5 business days preceding the Subscription day',
      },
      {
        key: 'Redemption Notice',
        value: '30 days preceding the Redemption day',
      },
      {
        key: 'Currency Class',
        value: 'US Dollar $',
      },
    ],
  },
  terms: {
    title: 'fund terms',
    label: {
      key: 'Minimum Investment',
      value: 'Share Class F $100,000',
      value2: 'Share Class G $100,000',
    },
    data: [
      {
        key: 'Investors',
        value: 'Professional (MiFID II)',
      },
      {
        key: 'Subscriptions',
        value: 'Monthly',
      },
      {
        key: 'Redemptions',
        value: '30 days notice period',
      },
      {
        key: 'Base Currency',
        value: 'USD',
      },
      {
        key: 'Management Fee',
        value: '2%',
      },
      {
        key: 'Performance Fee',
        value: '20%',
        value2: '20% (btc benchmark)',
      },
      {
        key: 'High Watermark',
        value: 'Yes',
      },
      {
        key: 'Redemption Fee',
        value: '1% (2% first 3 years)',
      },
      {
        key: 'Recommended Investment Term',
        value: 'Long-term',
      },
    ],
  },
  providers: {
    title: 'service providers',
    data: [
      {
        key: 'Platform',
        value: 'AK Jensen Investment Mgmt Ltd',
      },
      {
        key: 'Storage Provider',
        value: 'Coinbase Custody Intern. Ltd',
      },
      {
        key: 'Auditor',
        value: 'RSM Cayman Ltd.',
      },
      {
        key: 'Legal',
        value: 'Appleby / AKJ',
      },
    ],
  },
};

const promotion = {
  features: [
    'Actively managed',
    'Professional Investors',
    'Invests in quality projects',
    'Learn more about the fund',
    'Book a presentation',
    'Get the offering documents',
  ],
};

// TODO: extract the promotion box
const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const state = useAppState(config);

  // const { error, data, isError, isSuccess } = useGetFundRegistrationQuery(
  //   'k33-assets-i-fund-limited'
  // );

  const [trigger] = useLazyGetFundRegistrationQuery();

  useEffect(() => {
    const getFundRegistration = async () => {
      try {
        const data = await trigger('k33-assets-i-fund-limited').unwrap();
      } catch (error) {
        console.log(error);
        router.push('/');
      }
    };

    getFundRegistration();
  }, [state, trigger, router]);

  // useEffect(() => {
  //   console.log(isError);
  //   if (isError) {
  //     router.push('/');
  //   }
  // }, [router, isError]);

  return (
    <>
      <Head>
        <title>{getTitle('Investments', 'Home')}</title>
      </Head>
      <section className="bg-bg-light-secondary md:py-16 py-12 px-6 md:px-0">
        <div className="md:container flex md:flex-row flex-col md:gap-16 gap-8">
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
            {fundCards.position.description.map((desc) => (
              <FundBody>{desc}</FundBody>
            ))}
          </FundCard>
        </div>
      </section>
      <section id="promotion-section" className="bg-bg-dark-elevated-tertiary">
        <div
          id="promotion-section"
          className="md:container md:px-0 px-6 flex md:flex-row flex-col py-10 items-center md:py-8 md:justify-between gap-10"
        >
          <div id="promotion-action" className="flex flex-col gap-4">
            <div id="promotion-information" className="flex flex-col gap-2">
              <div className="flex flex-row gap-1">
                <p className="text-body3 text-label-dark-secondary">
                  Learn about
                </p>
                <p className="text-body1 text-label-dark-primary">
                  K33 Assets Fund
                </p>
              </div>
              <p className="text-label-dark-primary text-heading7">
                Experts insight on how to invest
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <a href="mailto:invest@k33.com?subject=K33 Assets Fund Info Request&body=Please tell me more about the fund.">
                <BasicButton variant="secondary" size="medium">
                  Contact Us Now
                </BasicButton>
              </a>
              <a
                href="/apps/invest/home/fund-doc.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <BasicButton variant="secondary" size="medium">
                  <div className="flex flex-row items-center gap-2">
                    Download PDF <ImDownload2 />
                  </div>
                </BasicButton>
              </a>
            </div>
          </div>
          <div
            id="promotion-features"
            className="md:px-8 md:py-7 py-2 px-4 rounded-[40px] flex flex-col sm:h-full sm:w-full md:flex-wrap gap-2 bg-default-systemGrey-dark-2 2xl:h-[176px] 2xl:max-w-[762px]"
          >
            {promotion.features.map((feature) => (
              <div
                key={feature}
                className="flex flex-row md:items-center items-start md:gap-2 gap-6 justify-start"
              >
                <div className="h-[19px] w-[19px] md:w-[35px] md:h-[33px]">
                  <svg
                    width="36"
                    height="33"
                    viewBox="0 0 36 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.9607 8.25762C17.8367 8.41036 21.9499 11.9532 23.4783 16.9821C25.0298 22.0868 23.8977 27.8889 19.884 31.0369C15.8998 34.1617 10.5961 33.3017 6.56634 30.2464C2.24972 26.9736 -1.19211 21.7097 0.392951 16.259C2.00934 10.7005 7.59369 8.08951 12.9607 8.25762Z"
                      fill="#AEAEB2"
                    />
                    <g clipPath="url(#clip0_5458_2250)">
                      <path
                        d="M35.1897 5.67634C35.4125 5.92077 35.4125 6.30269 35.1897 6.54712L15.6439 27.3237C15.4139 27.5605 15.0546 27.5605 14.8247 27.3237L4.47973 16.3243C4.25545 16.0799 4.25545 15.698 4.47973 15.4535C4.70465 15.2167 5.06826 15.2167 5.29318 15.4535L15.1696 26.0251L34.3705 5.67634C34.6005 5.43955 34.9598 5.43955 35.1897 5.67634Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_5458_2250">
                        <rect
                          width="31.0453"
                          height="33"
                          fill="white"
                          transform="translate(4.31152)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <p className="text-label-dark-primary text-body2">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-bg-light-primary md:py-16 py-10 px-6 md:px-0">
        <div className="md:container flex flex-col md:gap-10 gap-8">
          <div className="flex md:flex-row flex-col gap-8">
            <FundCard
              size="medium"
              title={fundCards.performance.title}
              date={fundCards.performance.subtitle}
            >
              <Image src={performanceImage} alt="" />
              <table className="bg-white border-separate max-w-[300px] self-center">
                <thead className="text-caption text-label-light-primary">
                  <tr>
                    <th className="text-left px-2 py-1"></th>
                    <th className="text-left px-2 py-1">K33</th>
                    <th className="text-left px-2 py-1">BTC</th>
                  </tr>
                </thead>
                <tbody className="text-label-light-secondary text-body3">
                  {fundCards.performance.data.map(({ duration, k33, btc }) => (
                    <tr>
                      <td className="px-2 py-1">{duration}</td>
                      <td className="px-2 py-1">{k33}%</td>
                      <td className="px-2 py-1">{btc}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </FundCard>
            <div className="flex flex-col md:gap-4 gap-8">
              <FundCard title={fundCards.summary.title} date={''}>
                <FundBold>{fundCards.summary.description}</FundBold>
              </FundCard>
              <FundCard title={fundCards.facts.title} date={''}>
                <table>
                  <tbody>
                    {fundCards.facts.data.map(({ key, value }) => (
                      <tr>
                        <td className="text-label-light-secondary">{key}</td>
                        <td className="text-label-light-primary text-right">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </FundCard>
            </div>
          </div>
          <FundCardBody size="large">
            <div className="flex md:flex-row md:justify-between flex-col gap-6">
              <FundCardContent title={fundCards.terms.title} date="">
                <table className="table-auto hidden md:block text-left border-separate border-spacing-2">
                  <thead className="text-caption text-label-light-primary">
                    <tr>
                      <th>{fundCards.terms.label.key}</th>
                      <th>{fundCards.terms.label.value}</th>
                      <th>{fundCards.terms.label.value2}</th>
                    </tr>
                  </thead>
                  <tbody className="text-label-light-secondary text-body3">
                    {fundCards.terms.data.map(({ key, value, value2 }) => (
                      <tr>
                        <td className="pr-10">{key}</td>
                        <td className="pr-10">{value}</td>
                        <td>{value2 ?? value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <table className="table-auto block md:hidden text-left">
                  <thead className="text-small text-label-light-primary">
                    <tr>
                      <th>{fundCards.terms.label.key}</th>
                      <th>{fundCards.terms.label.value}</th>
                    </tr>
                  </thead>
                  <tbody className="text-label-light-secondary text-xsmall">
                    {fundCards.terms.data.map(({ key, value, value2 }) => (
                      <tr>
                        <td className="pr-10">{key}</td>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <table className="table-auto block md:hidden text-left">
                  <thead className="text-small text-label-light-primary">
                    <tr>
                      <th>{fundCards.terms.label.key}</th>
                      <th>{fundCards.terms.label.value2}</th>
                    </tr>
                  </thead>
                  <tbody className="text-label-light-secondary text-xsmall">
                    {fundCards.terms.data.map(({ key, value, value2 }) => (
                      <tr>
                        <td className="pr-10">{key}</td>
                        <td>{value2 ?? value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </FundCardContent>
              <FundCardContent title={fundCards.providers.title} date="">
                <table className="table-auto block">
                  <tbody>
                    {fundCards.providers.data.map(({ key, value }) => (
                      <tr>
                        <td className="text-label-light-secondary">{key}</td>
                        <td className="text-label-light-primary text-right">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </FundCardContent>
            </div>
          </FundCardBody>
        </div>
      </section>
      <FundPromotion />
    </>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <PrivateMainLayout>{page}</PrivateMainLayout>;
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
      <div className="flex flex-row items-center md:gap-4 gap-2 md:pb-6 pb-4">
        <div className="flex flex-row items-center gap-1">
          <Marker color="brand.black" />
          <p className="uppercase md:text-heading8 text-xsmall text-label-light-primary/60">
            {title}
          </p>
        </div>
        <p className="md:text-body4 text-xsmall text-label-light-secondary/60">
          {date}
        </p>
      </div>
      <div className="flex flex-col md:gap-4 gap-2">{children}</div>
    </div>
  );
};

interface FundCardBodyProps {
  children: React.ReactNode;
  size?: Size;
}

const cardSize: Record<Size, string> = {
  small: '2xl:w-[624px]',
  large: 'w-full',
  medium: '2xl:max-w-[832px] 2xl:min-w-[720px]',
};

const FundCardBody: React.FC<FundCardBodyProps> = ({
  children,
  size = 'small',
}) => {
  return (
    <div
      className={`bg-bg-light-primary shadow-lg ring-1 ring-label-light-tertiary/10 md:px-10 py-6 px-5 md:py-8 rounded-xl ${cardSize[size]}`}
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
  return (
    <p className="md:text-body1 text-small text-label-light-primary">
      {children}
    </p>
  );
};

const FundRegular: React.FC<FundTextProps> = ({ children }) => {
  return (
    <p className="md:text-small text-xsmall text-label-light-secondary">
      {children}
    </p>
  );
};

const FundBody: React.FC<FundTextProps> = ({ children }) => {
  return (
    <p className="md:text-body3 text-small text-label-light-secondary">
      {children}
    </p>
  );
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
