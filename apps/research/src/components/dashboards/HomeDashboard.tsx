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
    token: {
      fontSizeSM,
      fontSizeHeading4,
      fontSizeHeading5,
      fontSizeHeading2,
      colorBgLayout,
      fontSizeLG,
    },
  } = useToken();
  return (
    <Row wrap gutter={32} align="stretch" id="research-home-cover">
      <Col xs={24} md={12} lg={11}>
        <ArticleCard
          article={{
            tagsCollection: { items: [] },
            thumbnail: mainArticle.article.coverPicture,
            ...mainArticle.article,
          }}
          titleHeading={fontSizeHeading2}
          articleSlug={mainArticle.articleSlug}
          publishedDate={mainArticle.publishedDate}
          subtitleHeading={fontSizeHeading4}
          dateLevel={fontSizeLG}
        />
      </Col>
      <Col xs={24} md={12} lg={7}>
        <Row wrap gutter={[0, 12]}>
          <Col span={24}>
            <ArticleCard
              article={{
                tagsCollection: { items: [] },
                thumbnail: coverArticle1.article.coverPicture,
                ...coverArticle1.article,
              }}
              articleSlug={coverArticle1.articleSlug}
              titleHeading={fontSizeHeading4}
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
                <Title level={4} style={{ margin: 0 }}>
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
      <Col xs={0} lg={6}>
        <List
          size="large"
          dataSource={[subArticle1, subArticle2, subArticle3, subArticle4]}
          style={{
            backgroundColor: colorBgLayout,
          }}
          renderItem={({
            article: { title, subtitle },
            articleSlug,
            publishedDate,
          }) => (
            <List.Item
              key={articleSlug}
              style={{ marginBottom: 16, paddingRight: 16, paddingLeft: 16 }}
            >
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
                  title={
                    <Link
                      style={{
                        fontSize: fontSizeHeading5,
                      }}
                      href={'/articles/' + articleSlug}
                    >
                      {title}
                    </Link>
                  }
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
