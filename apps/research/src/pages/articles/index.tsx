import { Col, Layout, Row, theme } from 'antd';
import { NextPageWithLayout } from 'platform-js';
import algoliasearch from 'algoliasearch/lite';
import { history } from 'instantsearch.js/es/lib/routers';
import { InstantSearch } from 'react-instantsearch-hooks-web';
import { AuthorCard, SearchHits, SearchText } from '@/components';
import { NextSeo } from 'next-seo';
import { siteUsername } from '@/utils';
import styles from './styles.module.scss';
import { UiState } from 'instantsearch.js';
import { RouterProps } from 'instantsearch.js/es/middlewares';
import { Author } from '@/types';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { getAuthorByName } from '@/api';
import { useAsyncEffect } from 'ahooks';

const { useToken } = theme;

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!
);

// query params
type RouteState = {
  query?: string;
  tags?: string;
  authors?: string;
  page?: number;
};

const Articles: NextPageWithLayout = () => {
  const {
    token: { colorBgContainer },
  } = useToken();
  const routing: RouterProps<UiState, RouteState> = {
    router: history(),
    stateMapping: {
      stateToRoute(uiState: UiState): RouteState {
        const indexUiState = uiState['articles'];
        const routeState: RouteState = {
          query: indexUiState.query,
          page: indexUiState.page,
        };
        const tags = indexUiState.refinementList?.tags?.filter(
          (tag) => tag.length > 0
        );
        const authors = indexUiState.refinementList?.authors?.filter(
          (author) => author.length > 0
        );
        if (tags && tags.length) {
          routeState.tags = tags.length == 1 ? tags[0] : tags?.join(',');
        }
        if (authors && authors.length) {
          routeState.authors =
            authors.length == 1 ? authors[0] : authors?.join(',');
        }
        return routeState;
      },
      routeToState(routeState: RouteState): UiState {
        return {
          ['articles']: {
            query: routeState.query,
            refinementList: {
              tags: (routeState.tags || '').split(','),
              authors: (routeState.authors || '').split(','),
            },
            page: routeState.page,
          },
        };
      },
    },
  };
  const [author, setAuthor] = useState<Author | null>(null);
  const router = useRouter();
  useAsyncEffect(async () => {
    const authors = router.query['authors'];
    if (authors) {
      if (typeof authors == 'string') {
        if (!authors.includes(',')) {
          setAuthor(await getAuthorByName(authors));
        }
      } else if (typeof authors == 'object') {
        if (authors.length == 1) {
          setAuthor(await getAuthorByName(authors[0]));
        }
      }
    }
  }, [router]);
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
        routing={routing}
      >
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
            {author && (
              <Row>
                <Col span={22} offset={1} className="default-body">
                  <AuthorCard {...author} />
                </Col>
              </Row>
            )}
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
