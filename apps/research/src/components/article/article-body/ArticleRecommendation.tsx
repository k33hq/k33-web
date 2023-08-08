import {
  RelatedArticleSummaryLinked,
  RecommendedArticle,
  RelatedArticles,
} from '@/types';
import * as React from 'react';
import { DashboardList } from '../article-widgets';
import { NamedDivider } from '@/components';

interface ArticleRecommendationProps
  extends RecommendedArticle<RelatedArticleSummaryLinked>,
    RelatedArticles<RelatedArticleSummaryLinked> {}

const ArticleRecommendation: React.FC<ArticleRecommendationProps> = ({
  relatedArticlesCollection: { items: relatedArticles },
  recommendedArticlesCollection: { items: articles },
}) => {
  const mergedArticles = [...relatedArticles, ...articles];
  if (mergedArticles.length <= 0) return;

  const uniqueArticles = [...new Set(mergedArticles)]
    .map(
      ({
        ...rest
      }) => {
        return {
          ...rest,
          tagsCollection: { items: [] },
        };
      }
    )
    .splice(0, 3);

  return (
    <div
      id="related-articles"
      style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
    >
      <NamedDivider label="You may also like" />
      <DashboardList
        column={8}
        articles={uniqueArticles}
        title="You may also like"
        isNavigable={false}
        hideSection
        lastDivider={false}
      />
    </div>
  );
};

export default ArticleRecommendation;
