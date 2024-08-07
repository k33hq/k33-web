import { siteUsername } from '@/utils';
import { Col, Layout, Row, Space, theme, Typography } from 'antd';
import { NextSeo } from 'next-seo';
import * as React from 'react';
import styles from './styles.module.scss';
import dynamic from 'next/dynamic';

const { useToken } = theme;
const { Title } = Typography;

const ProPricingTable = dynamic(
  () => import('../components/platform/ProPricingTable'),
  {
    loading: () => <p>Loading...</p>,
  }
);

const PricingTable = dynamic(
  () => import('../components/platform/PricingTable'),
  {
    loading: () => <p>Loading...</p>,
  }
);

const Pricing = () => {
  const {
    token: { colorBgContainer },
  } = useToken();

  return (
    <>
      <NextSeo
        themeColor="#000000"
        robotsProps={{
          maxImagePreview: 'large',
        }}
        title={'Research - Pricing'}
        description={
          'Unlock the secrets to successful digital asset valuation. Leverage data and economic theory to accurately assess the worth of diverse tokens and maximize your investment potential.'
        }
        twitter={{
          handle: siteUsername,
          site: process.env.NEXT_PUBLIC_WEB_DOMAIN,
          cardType: 'summary_large_image',
        }}
        openGraph={{
          title: 'Research - Pricing',
          description:
            'Gain a competitive edge in the dynamic digital assets industry. Stay informed about the latest trends and news shaping the future landscape while navigating its intricate landscape with our expert industry insights.',
          url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/articles`,
          type: 'article:section',
          images: [
            {
              url: 'https://images.ctfassets.net/i0qyt2j9snzb/6JyAj2lOiLECBkMbdcd7R0/b5cf2d56571af27c3e8b882169c59764/socialPreview.svg?fm=png&w=1200&h=621',
              alt: 'k33-logo',
            },
          ],
          siteName: process.env.NEXT_PUBLIC_WEB_DOMAIN + '/research',
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
        }}
      >
        <section
          id="page-title"
          style={{
            maxWidth: 1440,
            alignSelf: 'center',
            width: '100%',
          }}
        >
          <Row>
            <Col span={22} offset={1}>
              <div
                id="page-title"
                style={{
                  display: 'flex',
                  padding: '24px 24px 24px 0px',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-start',
                  gap: 12,
                  alignSelf: 'stretch',
                }}
              >
                <Space direction="vertical" size="small">
                  <Title
                    level={3}
                    style={{
                      margin: 0,
                    }}
                  >
                    Pricing
                  </Title>
                </Space>
              </div>
            </Col>
          </Row>
        </section>
      </div>
      <Layout
        style={{
          display: 'flex',
          backgroundColor: colorBgContainer,
        }}
      >
        <section
          id="page-title"
          style={{
            maxWidth: 1440,
            alignSelf: 'center',
            width: '100%',
          }}
        >
          <Row>
            <Col span={22} offset={1}>
              <div className={styles.pricingPage}>
                <ProPricingTable />
                <PricingTable />
              </div>
            </Col>
          </Row>
        </section>
      </Layout>
    </>
  );
};

export default Pricing;
