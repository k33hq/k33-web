import { gql } from 'graphql-request';
import { contentful } from './client';
import { AssetFragment } from './fragments';
import { Author, AuthorCollection } from '@/types';

const GetAuthorByName = gql`
  query GetAuthorByName($name: String!) {
    authorCollection(
      where: { name: $name }
      order: [publishedDate_DESC]
      limit: 1
    ) {
      items {
        name
        title
        description
        profilePicture {
          ...asset
        }
      }
    }
  }
  ${AssetFragment}
`;

export const getAuthorByName = async (name: string) => {
  const { authorCollection } = await contentful.request<
    AuthorCollection<Author>
  >(GetAuthorByName, {
    name,
  });
  return authorCollection.items[0];
};
