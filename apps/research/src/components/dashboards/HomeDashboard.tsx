import { HomePage } from '@/types';
import { Col, List, Row, Typography, theme } from 'antd';
import * as React from 'react';
import { ArticleCard } from '../article';
import Link from 'next/link';
import { formatDateAndTime } from '@contentful/f36-datetime';
import styles from './styles.module.scss';

const { useToken } = theme;
const { Text } = Typography;

interface HomeDashboardProps extends Omit<HomePage, 'seo'> {}

const HomeDashboard: React.FC<HomeDashboardProps> = ({
  mainArticle,
  subArticle1,
  subArticle2,
  subArticle3,
  subArticle4,
}) => {
  const {
    token: { fontSizeSM },
  } = useToken();
  return (
    <Row wrap gutter={32}>
      <Col xs={24} md={12} lg={12}>
        <ArticleCard
          article={{
            tagsCollection: { items: [] },
            thumbnail: mainArticle.article.coverPicture,
            ...mainArticle.article,
          }}
          articleSlug={mainArticle.articleSlug}
          publishedDate={mainArticle.publishedDate}
          isNew
        />
      </Col>
      <Col xs={24} md={12} lg={6}>
        Hello
      </Col>
      <Col xs={0} lg={6}>
        <List
          size="large"
          dataSource={[subArticle1, subArticle2, subArticle3, subArticle4]}
          renderItem={({
            article: { title, subtitle },
            articleSlug,
            publishedDate,
          }) => (
            <List.Item key={articleSlug}>
              <div
                id="home-list-body"
                style={{
                  width: '100%',
                }}
                className={styles.quickTakeBody}
              >
                <Text
                  type="secondary"
                  style={{
                    fontSize: fontSizeSM,
                  }}
                >
                  {formatDateAndTime(publishedDate, 'day')}
                </Text>
                <List.Item.Meta
                  style={{
                    width: '100%',
                  }}
                  title={<Link href={'/articles/' + articleSlug}>{title}</Link>}
                />
              </div>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};

export default HomeDashboard;
