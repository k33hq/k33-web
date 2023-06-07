import * as React from 'react';
import styles from './styles.module.css';
import { Typography, Space, Tooltip, Button, Divider } from 'antd';
import {
  LinkOutlined,
  LinkedinFilled,
  TwitterOutlined,
} from '@ant-design/icons';
import { copyText, linkedin, twitter } from '@/utils';

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
          <Tooltip title="Share on Twitter">
            <Button
              onClick={() =>
                twitter({ text: title, hashtags: [], target: '_blank' })
              }
              icon={<TwitterOutlined />}
            />
          </Tooltip>
          <Tooltip title="Share on LinkedIn">
            <Button
              onClick={() => linkedin({ target: '_blank' })}
              icon={<LinkedinFilled />}
            />
          </Tooltip>
          <Tooltip title="Copy Article Link">
            <Button onClick={() => copyText()} icon={<LinkOutlined />} />
          </Tooltip>
        </Space>
      </div>
    </div>
  );
};

export default ShareArticle;
