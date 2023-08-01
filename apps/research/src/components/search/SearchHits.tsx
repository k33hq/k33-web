import * as React from 'react';
import { Asset } from '@/types';
import { useInstantSearch, Hits } from 'react-instantsearch-hooks-web';
import { ArticleCard } from '@/components';

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

const SearchHits: React.FC = () => {
  return (
    <div>
      <Hits hitComponent={Hit} />
    </div>
  );
};

export default SearchHits;
