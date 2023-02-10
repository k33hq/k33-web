import { gql } from 'graphql-request';
import { contentful } from './client';
import { GetAssetByIdResponse } from '@/types';

const GetAssetById = gql`
  query GetAssetById($id: String!) {
    asset(id: $id) {
      url
      title
      description
    }
  }
`;

export const getAssetById = async (id: string) => {
  const { asset } = await contentful.request<GetAssetByIdResponse>(
    GetAssetById,
    { id }
  );
  return asset;
};
