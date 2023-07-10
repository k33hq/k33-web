import { ArticleSummaryLinked, RecommendedArticle } from '@/types';
import * as React from 'react';
import { DashboardList } from '../article-widgets';

interface ArticleRecommendationProps
  extends RecommendedArticle<ArticleSummaryLinked> {}

const ArticleRecommendation: React.FC<ArticleRecommendationProps> = ({
  recommendedArticlesCollection: { items: articles },
}) => {
  if (!(articles.length > 0)) return;
  return (
    <DashboardList
      column={8}
      articles={articles.map(
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
      )}
      title="You may also like"
      isNavigable={false}
    />
  );
};

export default ArticleRecommendation;
