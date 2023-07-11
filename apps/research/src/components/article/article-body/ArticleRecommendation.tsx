import {
  ArticleSummaryLinked,
  RecommendedArticle,
  RelatedArticles,
} from '@/types';
import * as React from 'react';
import { DashboardList } from '../article-widgets';
import { NamedDivider } from '@/components';

interface ArticleRecommendationProps
  extends RecommendedArticle<ArticleSummaryLinked>,
    RelatedArticles<ArticleSummaryLinked> {}

const ArticleRecommendation: React.FC<ArticleRecommendationProps> = ({
  recommendedArticlesCollection: { items: articles },
  relatedArticlesCollection: { items: relatedArticles },
}) => {
  const mergedArticles = [...relatedArticles, ...articles]
    .map(
      ({
        linkedFrom: {
          articleWebCollection: { items },
        },
        ...rest
      }) => ({
        article: {
          ...rest,
          tagsCollection: { items: [] },
        },
        articleSlug: items[0].articleSlug,
        publishedDate: items[0].publishedDate,
      })
    )
    .splice(0, 3);

  if (mergedArticles.length <= 0) return;
  return (
    <div
      id="related-articles"
      style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
    >
      <NamedDivider label="You may also like" />
      <DashboardList
        column={8}
        articles={mergedArticles}
        title="You may also like"
        isNavigable={false}
        hideSection
        lastDivider={false}
      />
    </div>
  );
};

export default ArticleRecommendation;
