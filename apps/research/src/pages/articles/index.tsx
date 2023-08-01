import { Col, Row, Layout, Typography, theme } from 'antd';
import { NextPageWithLayout } from 'platform-js';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  useInstantSearch,
  Configure,
} from 'react-instantsearch-hooks-web';
import { Asset } from '@/types';
import { ArticleCard, SearchText } from '@/components';
import singletonRouter from 'next/router';
import { createInstantSearchRouterNext } from 'react-instantsearch-hooks-router-nextjs';
import { NextSeo } from 'next-seo';
import { siteUsername } from '@/utils';

const { useToken } = theme;
const { Title, Text } = Typography;

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!
);

interface ResultBoxProps {
  hit: {
    authors: ReadonlyArray<string>;
    image: Omit<Asset, 'description'>;
    objectID: string;
    publishedAt: string;
    publishedDate: string;
    section: string;
    slug: string;
    subtitle: string;
    summary: string;
    tags: ReadonlyArray<string>;
    title: string;
  };
}

// TODO: hooks

const Hit: React.FC<ResultBoxProps> = ({ hit }) => {
  const { status } = useInstantSearch();

  const imageUrl = hit.image ? hit.image.url : '';
  const imageDescription = hit.image ? hit.image.title : '';

  return (
    <>
      {['loading', 'stalled', 'error'].includes(status) ? null : (
        <ArticleCard
          article={{
            subtitle: hit.subtitle,
            title: hit.title,

            thumbnail: { url: imageUrl, description: imageDescription },
            tagsCollection: { items: hit.tags.map((tag) => ({ title: tag })) },
          }}
          publishedDate={hit.publishedDate}
          articleSlug={hit.slug}
        />
      )}
    </>
  );
};

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
                <div
                  id="search-section"
                  style={{
                    margin: 32,
                  }}
                >
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
            }}
          >
            <Row>
              <Col span={22} offset={1} className="default-body">
                <Hits hitComponent={Hit} />
              </Col>
            </Row>
          </section>
        </Layout>
      </InstantSearch>
    </>
  );
};

export default Articles;
