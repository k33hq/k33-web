import { Col, Row, Layout, Typography, theme } from 'antd';
import { NextPageWithLayout } from 'platform-js';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
  useInstantSearch,
  Configure,
} from 'react-instantsearch-hooks-web';
import { Asset } from '@/types';
import { ArticleCard, ArticleSummary } from '@/components';
import singletonRouter from 'next/router';
import { createInstantSearchRouterNext } from 'react-instantsearch-hooks-router-nextjs';

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
              <div id="search-section">
                <SearchBox placeholder="Search" autoFocus />
                <RefinementList attribute="tags" />
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
  );
};

export default Articles;
