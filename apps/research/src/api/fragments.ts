import { gql } from 'graphql-request';

export const SeoFragment = gql`
  fragment seo on SeoMetadata {
    title
    description
    image {
      ...asset
    }
  }
`;

export const PublicSnippetFragment = gql`
  fragment publicSnippet on ArticlePublicSnippet {
    json
    links {
      assets {
        block {
          url
          description
          title
          sys {
            id
          }
        }
      }
    }
  }
`;

export const ArticleBodyFragment = gql`
  fragment articleBody on ArticleBody {
    json
    links {
      assets {
        block {
          url
          description
          title
          sys {
            id
          }
        }
      }
    }
  }
`;

export const AssetFragment = gql`
  fragment asset on Asset {
    url
    title
    description
  }
`;

// Various Article Widget Queries

export const articleWidgetCoverFragment = gql`
  fragment articleWidgetCover on Article {
    articleSlug
    title
    subtitle
    publishedDate
    coverPicture {
      ...asset
    }
  }
`;

// TODO: fragment for thumbnail, image and tagCollection

export const articleWidgetFragment = gql`
  fragment articleWidget on Article {
    articleSlug
    title
    subtitle
    publishedDate
  }
`;

// TODO: migration fragment to remove article-web

export const IndexTableArticleFragment = gql`
  fragment tableArticle on Article {
    publishedDate
    articleSlug
  }
`;

export const ArticleSummaryLinkedFragment = gql`
  fragment articleSummaryLinked on Article {
    horizontalThumbnail {
      ...asset
    }
    title
    subtitle
    publishedDate
    articleSlug
  }
`;
