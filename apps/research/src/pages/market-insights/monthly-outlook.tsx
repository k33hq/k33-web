import { getArticleSummaryWidgets } from '@/api';
import { MarketInsightsLayout } from '@/components';
import { ArticleSummaryWidget } from '@/types';

import { formatDateAndTime } from '@contentful/f36-datetime';
import { Grid, Image, List, Row, Space, Tag, Typography, theme } from 'antd';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { NextPageWithLayout } from 'platform-js';
import styles from './styles.module.scss';
import { siteUsername } from '@/utils';

const { Text } = Typography;
const { useToken } = theme;
const { useBreakpoint } = Grid;

interface MontlyOutlooksProps {
  articles: ReadonlyArray<ArticleSummaryWidget>;
}

const MontlyOutlooks: NextPageWithLayout<MontlyOutlooksProps> = ({
  articles,
}) => {
  const {
    token: { fontSizeSM, fontSizeHeading2, fontSizeHeading4, fontSize },
  } = useToken();

  const { lg } = useBreakpoint();
  return (
    <>
      <NextSeo
        themeColor="#000000"
        robotsProps={{
          maxImagePreview: 'large',
        }}
        title={'Research - Market Insights Monthly Outlooks'}
        description={
          'Unlock the secrets to successful digital asset valuation. Leverage data and economic theory to accurately assess the worth of diverse tokens and maximize your investment potential.'
        }
        twitter={{
          handle: siteUsername,
          site: process.env.NEXT_PUBLIC_WEB_DOMAIN,
          cardType: 'summary_large_image',
        }}
        openGraph={{
          title: 'Research - Market Insights Monthly Outlooks',
          description:
            "Stay ahead of the curve in the digital assets market with our comprehensive market insights. Discover the latest trends and factors influencing prices for tomorrow's gains.",
          url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/market-insights/monthly-outlooks`,
          type: 'article:section',
          images: [
            {
              url: 'https://images.ctfassets.net/i0qyt2j9snzb/3bw9VhMe8k8aI66rUAsGuR/8885288dd10032e9c5bbd287c69b3dd8/Cover_image_research__5_.png?h=250',
              alt: 'k33-logo',
            },
          ],
          siteName: process.env.NEXT_PUBLIC_WEB_DOMAIN + '/research',
        }}
      />
      <Row
        wrap
        gutter={[16, 40]}
        style={{
          width: '100% !important',
        }}
      >
        <List
          size="large"
          className={styles.monthlyOutlookList}
          dataSource={articles.slice()}
          renderItem={(
            {
              title,
              subtitle,
              horizontalThumbnail,
              tagsCollection,
              publishedDate,
              articleSlug,
            },
            index
          ) => (
            <List.Item
              colStyle={{
                flex: 1,
              }}
              key={articleSlug}
              className={styles.monthlyOutlook}
              extra={
                <Link href={'/articles/' + articleSlug}>
                  <Image
                    preview={false}
                    alt={horizontalThumbnail.title}
                    src={horizontalThumbnail.url}
                  />
                </Link>
              }
            >
              <div
                style={{
                  width: '100%',
                }}
              >
                <Space
                  direction="horizontal"
                  align="center"
                  size={16}
                  style={{
                    fontSize: lg ? fontSize : fontSizeSM,
                  }}
                >
                  {/* {index === 0 && (
                    <Badge
                      color="blue"
                      text="New"
                      style={{ fontSize: 'inherit' }}
                    />
                  )} */}
                  <Space>
                    {tagsCollection.items.slice(0, 3).map((tag) => (
                      <Tag key={tag.title} style={{ fontSize: 'inherit' }}>
                        {tag.title}
                      </Tag>
                    ))}
                  </Space>
                  <Text type="secondary" style={{ fontSize: 'inherit' }}>
                    {formatDateAndTime(publishedDate, 'day')}
                  </Text>
                </Space>
                <List.Item.Meta
                  style={{
                    width: '100%',
                  }}
                  title={
                    <Link
                      style={{
                        fontSize: lg ? fontSizeHeading2 : fontSizeHeading4,
                      }}
                      href={'/articles/' + articleSlug}
                    >
                      {title}
                    </Link>
                  }
                  description={
                    <Text
                      style={{
                        fontSize,
                      }}
                    >
                      {subtitle}
                    </Text>
                  }
                />
              </div>
            </List.Item>
          )}
        />
      </Row>
    </>
  );
};

MontlyOutlooks.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <MarketInsightsLayout activeKey="/market-insights/monthly-outlooks">
      {page}
    </MarketInsightsLayout>
  );
};

export const getStaticProps: GetStaticProps<MontlyOutlooksProps> = async () => {
  const articles = await getArticleSummaryWidgets(
    'market-insights/monthly-outlook'
  );
  return {
    props: {
      articles,
    },
  };
};

export default MontlyOutlooks;
