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
