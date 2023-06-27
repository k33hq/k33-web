import { Authors, Tags } from '@/types';
import * as React from 'react';
import styles from './styles.module.scss';
import ArticleAuthor from './ArticleAuthor';
import { Typography, Tag, Space, Grid } from 'antd';

const { Text } = Typography;
const { useBreakpoint } = Grid;

interface ArticleSidebarProps extends React.PropsWithChildren {
  authors: Authors;
  tags: Tags;
}

const ArticleSidebar: React.FC<ArticleSidebarProps> = ({ authors, tags }) => {
  const screens = useBreakpoint();
  return (
    <aside className={styles.sidebar} id="article-sidebar">
      <div
        className={styles.authors}
        id="article-authors"
        style={{
          minWidth: screens.md ? undefined : '100%',
        }}
      >
        <Text type="secondary">Written by</Text>
        {authors.map((author) => (
          <ArticleAuthor key={author.slug} {...author} />
        ))}
      </div>
      <div id="article-tags">
        <Text type="secondary">Related Tags</Text>
        <Space wrap size={[0, 8]}>
          {tags.map((tag) => (
            <Tag key={tag.name}>{tag.name}</Tag>
          ))}
        </Space>
      </div>
    </aside>
  );
};

export default ArticleSidebar;
