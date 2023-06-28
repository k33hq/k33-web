import { gql } from 'graphql-request';
import { contentful } from './client';
import {
  AssetFragment,
  SeoFragment,
  articleWebWidgetCoverFragment,
  articleWebWidgetFragment,
} from './fragments';
import { GetHomePageResponse } from '@/types';

const GetHomePage = gql`
  query {
    homePage(id: "1ZbMXiefkGuOYeDaIo7WNX") {
      seo {
        ...seo
      }
      mainArticle {
        ...articleWebWidgetCover
      }
      coverArticle1 {
        ...articleWebWidgetCover
      }
      coverArticle2 {
        ...articleWebWidget
      }
      subArticle1 {
        ...articleWebWidget
      }
      subArticle2 {
        ...articleWebWidget
      }
      subArticle3 {
        ...articleWebWidget
      }
      subArticle4 {
        ...articleWebWidget
      }
    }
  }
  ${SeoFragment}
  ${AssetFragment}
  ${articleWebWidgetCoverFragment}
  ${articleWebWidgetFragment}
`;

export const getHomePage = async () => {
  const { homePage } = await contentful.request<GetHomePageResponse>(
    GetHomePage
  );

  return homePage;
};
