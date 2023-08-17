import { ArticleWebWidget, AuthorCompact, ITagFields } from '@/types';
import * as React from 'react';
import styles from './styles.module.scss';
import ArticleAuthor from './ArticleAuthor';
import { Typography, Tag, Space, Grid, List, theme } from 'antd';
import Link from 'next/link';

const { Text } = Typography;
const { useBreakpoint } = Grid;
const { useToken } = theme;

interface ArticleSidebarProps extends React.PropsWithChildren {
  authors: ReadonlyArray<AuthorCompact>;
  tags: ReadonlyArray<ITagFields>;
  authorArticles: ReadonlyArray<ArticleWebWidget>;
}

const ArticleSidebar: React.FC<ArticleSidebarProps> = ({
  authors,
  tags,
  authorArticles,
}) => {
  const screens = useBreakpoint();
  const {
    token: { fontSizeSM, colorTextTertiary },
  } = useToken();

  return (
    <aside className={styles.sidebar} id="article-sidebar">
      <div
        className={styles.authors}
        id="article-authors"
        style={{
          minWidth: screens.md ? undefined : '100%',
        }}
      >
        <Text
          type="secondary"
          style={{
            fontSize: fontSizeSM,
            color: colorTextTertiary,
          }}
        >
          Written by
        </Text>
        {authors.map((author) => (
          <Link
            key={`${author.name}-link`}
            href={`/articles?authors=${author.name}`}
          >
            <ArticleAuthor key={author.name} {...author} />
          </Link>
        ))}
      </div>
      {tags.length > 0 && (
        <div id="article-tags">
          <Text
            type="secondary"
            style={{
              fontSize: fontSizeSM,
              color: colorTextTertiary,
            }}
          >
            Related Tags
          </Text>
          <Space wrap size={[0, 8]}>
            {tags.map((tag) => (
              <Link
                key={`${tag.title}-link`}
                href={`/articles?tags=${tag.title}`}
              >
                <Tag key={tag.title}>{tag.title}</Tag>
              </Link>
            ))}
          </Space>
        </div>
      )}
      <div
        id="author-articles"
        style={{
          minWidth: screens.md ? 240 : '100%',
        }}
      >
        <Text
          type="secondary"
          style={{
            fontSize: fontSizeSM,
            color: colorTextTertiary,
          }}
        >
          More from Author
        </Text>
        <List
          style={{
            width: '100%',
          }}
          dataSource={authorArticles.slice()}
          itemLayout="horizontal"
          renderItem={(feat) => (
            <>
              <List.Item key={feat.articleSlug} style={{ marginLeft: 0 }}>
                <Link
                  key={`${feat.articleSlug}-author`}
                  href={`/articles/` + feat.articleSlug}
                  style={{
                    width: '100%',
                  }}
                >
                  <List.Item.Meta description={feat.title} />
                </Link>
              </List.Item>
            </>
          )}
        />
      </div>
    </aside>
  );
};

export default ArticleSidebar;
