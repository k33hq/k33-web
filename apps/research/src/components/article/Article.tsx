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
import { TopPromotion } from '../platform';

interface ArticleProps
  extends Omit<
      ArticleType,
      | 'authorsCollection'
      | 'tagsCollection'
      | 'coverPicture'
      | 'recommendedArticlesCollection'
      | 'relatedArticlesCollection'
    >,
    Pick<ArticlePage, 'sectionsCollection' | 'publishedDate'> {}

// TODO: extract the subscription product call to rtk toolkit soo we have the productID and price in the store when we need them
const Article: React.FC<ArticleProps> = ({
  title,
  subtitle,
  image,
  keyPoints,
  summary,
  body,
  publicSnippet,
  reportDocument,
  ...metadata
}) => {
  return (
    <>
      <ArticleHeader
        title={title}
        reportDocument={reportDocument}
        subtitle={subtitle}
        image={image}
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
        sections={metadata.sectionsCollection}
      >
        <ArticleBody body={body} />
      </PrivateArticle>
    </>
  );
};

export default Article;
