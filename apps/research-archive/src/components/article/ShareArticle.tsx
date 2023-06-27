import * as React from 'react';
import styles from './styles.module.css';
import { Typography, Space, Divider } from 'antd';
import { SocialSharing } from '../platform';

const { Title } = Typography;

interface ShareArticleProps {
  title: string;
}

const ShareArticle: React.FC<ShareArticleProps> = ({ title }) => {
  return (
    <div className={styles.articleShare}>
      <Divider />
      <div id="share-article">
        <Title
          level={5}
          editable={false}
          style={{
            flex: 2,
          }}
        >
          Share this article
        </Title>
        <Space>
          <SocialSharing title={title} />
        </Space>
      </div>
    </div>
  );
};

export default ShareArticle;
