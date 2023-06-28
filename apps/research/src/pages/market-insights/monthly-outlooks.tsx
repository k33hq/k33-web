import { getArticleSummaryWidgets } from '@/api';
import { ArticleSummary, TabLayout } from '@/components';
import { ArticleSummaryWidget } from '@/types';
import { getLevelTwos } from '@/utils';
import { formatDateAndTime } from '@contentful/f36-datetime';
import {
  Badge,
  Grid,
  Image,
  List,
  Row,
  Space,
  Tag,
  Typography,
  theme,
} from 'antd';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { NextPageWithLayout } from 'platform-js';
import styles from './styles.module.scss';

const { Text } = Typography;
const { useToken } = theme;
const { useBreakpoint } = Grid;

interface MontlyOutlooksProps {
  articles: ReadonlyArray<ArticleSummaryWidget>;
}

const MontlyOutlooks: NextPageWithLayout<MontlyOutlooksProps> = ({
  articles,
}) => {
  const {
    token: { fontSizeSM, fontSizeHeading2, fontSizeHeading4, fontSize },
  } = useToken();

  const { lg } = useBreakpoint();
  return (
    <>
      <NextSeo title="Research - Market Insights" />
      <Row
        wrap
        gutter={[16, 40]}
        style={{
          width: '100% !important',
        }}
      >
        {/* {articles.map((article, index) => (
          <ArticleSummary
            key={article.publishedDate}
            {...article}
            isNew={index === 0 ? true : false}
          />
        ))} */}
        <List
          size="large"
          className={styles.monthlyOutlookList}
          dataSource={articles.slice()}
          renderItem={(
            {
              article: { title, subtitle, thumbnail, tagsCollection },
              articleSlug,
              publishedDate,
            },
            index
          ) => (
            <List.Item
              colStyle={{
                flex: 1,
              }}
              key={articleSlug}
              className={styles.monthlyOutlook}
              extra={
                <Link href={'/articles/' + articleSlug}>
                  <Image
                    preview={false}
                    alt={thumbnail.title}
                    src={thumbnail.url}
                  />
                </Link>
              }
            >
              <div
                style={{
                  width: '100%',
                }}
              >
                <Space
                  direction="horizontal"
                  align="center"
                  size={16}
                  style={{
                    fontSize: lg ? fontSize : fontSizeSM,
                  }}
                >
                  {/* {index === 0 && (
                    <Badge
                      color="blue"
                      text="New"
                      style={{ fontSize: 'inherit' }}
                    />
                  )} */}
                  <Space>
                    {tagsCollection.items.slice(0, 3).map((tag) => (
                      <Tag key={tag.title} style={{ fontSize: 'inherit' }}>
                        {tag.title}
                      </Tag>
                    ))}
                  </Space>
                  <Text type="secondary" style={{ fontSize: 'inherit' }}>
                    {formatDateAndTime(publishedDate, 'day')}
                  </Text>
                </Space>
                <List.Item.Meta
                  style={{
                    width: '100%',
                  }}
                  title={
                    <Link
                      style={{
                        fontSize: lg ? fontSizeHeading2 : fontSizeHeading4,
                      }}
                      href={'/articles/' + articleSlug}
                    >
                      {title}
                    </Link>
                  }
                  description={
                    <Text
                      style={{
                        fontSize,
                      }}
                    >
                      {subtitle}
                    </Text>
                  }
                />
              </div>
            </List.Item>
          )}
        />
      </Row>
    </>
  );
};

MontlyOutlooks.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TabLayout
      activeKey="monthly-outlooks"
      title="Market Insights"
      tabs={getLevelTwos('market-insights')}
    >
      {page}
    </TabLayout>
  );
};

export const getStaticProps: GetStaticProps<MontlyOutlooksProps> = async () => {
  const articles = await getArticleSummaryWidgets(
    'market-insights/monthly-outlook'
  );
  return {
    props: {
      articles,
    },
  };
};

export default MontlyOutlooks;
