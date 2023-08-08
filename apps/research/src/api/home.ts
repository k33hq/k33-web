import { gql } from 'graphql-request';
import { contentful } from './client';
import {
  AssetFragment,
  SeoFragment,
  articleWidgetCoverFragment,
  articleWidgetFragment,
} from './fragments';
import { GetHomePageResponse } from '@/types';

const GetHomePage = gql`
  query {
    homePage(id: "1ZbMXiefkGuOYeDaIo7WNX") {
      seo {
        ...seo
      }
      mainArticle {
        ...articleWidgetCover
      }
      coverArticle1 {
        ...articleWidgetCover
      }
      coverArticle2 {
        ...articleWidget
      }
      subArticle1 {
        ...articleWidget
      }
      subArticle2 {
        ...articleWidget
      }
      subArticle3 {
        ...articleWidget
      }
      subArticle4 {
        ...articleWidget
      }
    }
  }
  ${SeoFragment}
  ${AssetFragment}
  ${articleWidgetCoverFragment}
  ${articleWidgetFragment}
`;

export const getHomePage = async () => {
  const { homePage } = await contentful.request<GetHomePageResponse>(
    GetHomePage
  );

  return homePage;
};
