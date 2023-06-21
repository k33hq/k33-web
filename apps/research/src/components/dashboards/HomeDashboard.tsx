import { HomePage } from '@/types';
import { Col, Divider, List, Row, Typography, theme } from 'antd';
import * as React from 'react';
import { ArticleCard } from '../article';
import Link from 'next/link';
import { formatDateAndTime } from '@contentful/f36-datetime';
import styles from './styles.module.scss';
import { EllipsisConfig } from 'antd/es/typography/Base';

const { useToken } = theme;
const { Text, Link: AntLink, Title, Paragraph } = Typography;

interface HomeDashboardProps extends Omit<HomePage, 'seo'> {}

const HomeDashboard: React.FC<HomeDashboardProps> = ({
  mainArticle,
  subArticle1,
  subArticle2,
  subArticle3,
  subArticle4,
  coverArticle1,
  coverArticle2,
}) => {
  const {
    token: { fontSizeSM },
  } = useToken();
  return (
    <Row wrap gutter={32} align="stretch" id="research-home-cover">
      <Col xs={24} md={12} lg={10}>
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
      <Col xs={24} md={12} lg={7}>
        <Row wrap gutter={[0, 24]}>
          <Col span={24}>
            <ArticleCard
              article={{
                tagsCollection: { items: [] },
                thumbnail: coverArticle1.article.coverPicture,
                ...coverArticle1.article,
              }}
              articleSlug={coverArticle1.articleSlug}
              publishedDate={coverArticle1.publishedDate}
            />
            <Divider
              style={{
                margin: 0,
              }}
            />
          </Col>
          <Col span={24}>
            <div id="cover-article-2">
              <Text
                type="secondary"
                style={{
                  fontSize: fontSizeSM,
                }}
              >
                {formatDateAndTime(coverArticle2.publishedDate, 'day')}
              </Text>
              <Link href={'/articles/' + coverArticle2.articleSlug}>
                <Title level={5} style={{ margin: 0 }}>
                  {coverArticle2.article.title}
                </Title>
              </Link>
              <Paragraph
                type="secondary"
                ellipsis={
                  {
                    rows: 2,
                    expandable: true,
                    symbol: 'more',
                  } as EllipsisConfig
                }
              >
                {coverArticle2.article.subtitle}
              </Paragraph>
            </div>
          </Col>
        </Row>
      </Col>
      <Col xs={0} lg={7}>
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
