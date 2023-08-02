import * as React from 'react';
import { Asset } from '@/types';
import { useHits } from 'react-instantsearch-hooks-web';
import { ArticleCard } from '@/components';
import { Col, Row } from 'antd';

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

const SearchHits: React.FC = () => {
  const { results } = useHits<{
    authors: ReadonlyArray<string>;
    horizontalThumbnail: Omit<Asset, 'description'>;
    objectID: string;
    publishedAt: string;
    publishedDate: string;
    section: string;
    slug: string;
    subtitle: string;
    summary: string;
    tags: ReadonlyArray<string>;
    title: string;
  }>();

  if (results!.__isArtificial && results!.nbHits === 0) {
    return (
      <div>
        No results found for <strong>{results!.query}</strong>.
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 32,
      }}
    >
      <Row wrap gutter={[32, 56]} align="stretch">
        {results?.hits.map((hit) => {
          const imageUrl = hit.horizontalThumbnail
            ? hit.horizontalThumbnail.url
            : '';
          const imageDescription = hit.horizontalThumbnail
            ? hit.horizontalThumbnail.title
            : '';
          return (
            <Col xs={24} sm={24} md={6} key={hit.objectID}>
              <ArticleCard
                article={{
                  subtitle: hit.subtitle,
                  title: hit.title,

                  thumbnail: { url: imageUrl, description: imageDescription },
                  tagsCollection: {
                    items: hit.tags.map((tag) => ({ title: tag })),
                  },
                }}
                publishedDate={hit.publishedDate}
                articleSlug={hit.slug}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default SearchHits;
