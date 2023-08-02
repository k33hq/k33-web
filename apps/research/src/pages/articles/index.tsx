import { Col, Row, Layout, theme } from 'antd';
import { NextPageWithLayout } from 'platform-js';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure } from 'react-instantsearch-hooks-web';
import { SearchHits, SearchText } from '@/components';
import singletonRouter from 'next/router';
import { createInstantSearchRouterNext } from 'react-instantsearch-hooks-router-nextjs';
import { NextSeo } from 'next-seo';
import { siteUsername } from '@/utils';
import styles from './styles.module.scss';

const { useToken } = theme;

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!
);

const Articles: NextPageWithLayout = () => {
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
        title={'Research - Articles'}
        description={
          'Unlock the secrets to successful digital asset valuation. Leverage data and economic theory to accurately assess the worth of diverse tokens and maximize your investment potential.'
        }
        twitter={{
          handle: siteUsername,
          site: process.env.NEXT_PUBLIC_WEB_DOMAIN,
          cardType: 'summary_large_image',
        }}
        openGraph={{
          title: 'Research - Articles',
          description:
            'Gain a competitive edge in the dynamic digital assets industry. Stay informed about the latest trends and news shaping the future landscape while navigating its intricate landscape with our expert industry insights.',
          url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/articles`,
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
      <InstantSearch
        searchClient={searchClient}
        indexName="articles"
        routing={{ router: createInstantSearchRouterNext({ singletonRouter }) }}
        insights={true}
      >
        <Configure analytics={false} hitsPerPage={40} />
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
                <div id="search-section" className={styles.searchLayout}>
                  <SearchText />
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
              paddingTop: 40,
            }}
          >
            <Row>
              <Col span={22} offset={1} className="default-body">
                <SearchHits />
              </Col>
            </Row>
          </section>
        </Layout>
      </InstantSearch>
    </>
  );
};

export default Articles;
