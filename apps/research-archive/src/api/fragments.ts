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

export const articleWebWidgetCoverFragment = gql`
  fragment articleWebWidgetCover on ArticleWeb {
    articleSlug
    publishedDate
    article {
      title
      subtitle
      coverPicture {
        ...asset
      }
    }
  }
`;

// TODO: fragment for thumbnail, image and tagCollection

export const articleWebWidgetFragment = gql`
  fragment articleWebWidget on ArticleWeb {
    articleSlug
    publishedDate
    article {
      title
      subtitle
    }
  }
`;