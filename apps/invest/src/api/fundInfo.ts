import { gql } from 'graphql-request';
import { contentful } from './client';
import { GetFundInfoResponse } from '@/types';
import { FundInfo } from './types';

const GetFundInfo = gql`
  query GetFundInfo($id: String!) {
    fundInfoCollection(where: { id: $id }, limit: 1) {
      items {
        strategy {
          title
          subtitle
          description
          description2
        }
        position {
          title
          subtitle
          description
          description2
        }
        performance {
          title
          subtitle
          dataCollection {
            items {
              duration
              k33
              btc
            }
          }
        }
        summary {
          title
          description
        }
        facts {
          title
          dataCollection {
            items {
              key
              value
            }
          }
        }
        terms {
          title
          label {
            key
            value
            value2
          }
          dataCollection {
            items {
              key
              value
              value2
            }
          }
        }
        providers {
          title
          dataCollection {
            items {
              key
              value
            }
          }
        }
      }
    }
  }
`;

export const getFundInfo = async (id: string): Promise<FundInfo> => {
  const response = await contentful.request<GetFundInfoResponse>(GetFundInfo, {
    id,
  });
  const fundInfo = response.fundInfoCollection.items[0];
  return {
    strategy: {
      title: fundInfo.strategy.title,
      subtitle: fundInfo.strategy.subtitle,
      description: [
        fundInfo.strategy.description,
        fundInfo.strategy.description2,
      ],
    },
    position: {
      title: fundInfo.position.title,
      subtitle: fundInfo.position.subtitle,
      description: [
        fundInfo.position.description,
        fundInfo.position.description2,
      ],
    },
    performance: {
      title: fundInfo.performance.title,
      subtitle: fundInfo.performance.subtitle,
      data: fundInfo.performance.dataCollection.items,
    },
    summary: {
      title: fundInfo.summary.title,
      subtitle: '',
      description: [fundInfo.summary.description],
    },
    facts: {
      title: fundInfo.facts.title,
      data: fundInfo.facts.dataCollection.items,
    },
    terms: {
      title: fundInfo.terms.title,
      label: fundInfo.terms.label,
      data: fundInfo.terms.dataCollection.items,
    },
    providers: {
      title: fundInfo.providers.title,
      data: fundInfo.providers.dataCollection.items,
    },
  };
};
