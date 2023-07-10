import { ArticlePage, Article as ArticleType } from '@/types';
import * as React from 'react';
import styles from './styles.module.css';
import { ArticleHeader } from './article-header';
import {
  ArticleBody,
  ArticleInShorts,
  ArticleTakeAways,
  PrivateArticle,
  ArticleRecommendations,
} from './article-body';
import { Divider } from 'antd';

interface ArticleProps
  extends Omit<
      ArticleType,
      'authorsCollection' | 'tagsCollection' | 'coverPicture'
    >,
    Pick<ArticlePage, 'sections' | 'publishedDate'> {
  productId: string;
  priceId: string;
}

// TODO: extract the subscription product call to rtk toolkit soo we have the productID and price in the store when we need them
const Article: React.FC<ArticleProps> = ({
  title,
  subtitle,
  image,
  keyPoints,
  summary,
  body,
  publicSnippet,
  productId,
  priceId,
  reportDocument,
  recommendedArticlesCollection,
  ...metadata
}) => {
  return (
    <>
      <ArticleHeader
        title={title}
        reportDocument={reportDocument}
        subtitle={subtitle}
        image={image}
        productId={productId}
        {...metadata}
      />
      {keyPoints || summary ? (
        <div id="article-summary" className={styles.articleSummary}>
          <ArticleInShorts summary={summary} />
          <ArticleTakeAways keyPoints={keyPoints} />
          <Divider
            style={{
              margin: 0,
            }}
          />
        </div>
      ) : null}
      <PrivateArticle
        isReport={!!reportDocument}
        publicSnippet={publicSnippet}
        priceId={priceId}
        productId={productId}
      >
        <ArticleBody body={body} />
      </PrivateArticle>
      <ArticleRecommendations
        recommendedArticlesCollection={recommendedArticlesCollection}
      />
    </>
  );
};

export default Article;
