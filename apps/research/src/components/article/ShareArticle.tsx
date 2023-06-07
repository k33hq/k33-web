import * as React from 'react';
import styles from './styles.module.css';
import { Typography, Space, Tooltip, Button, Divider } from 'antd';
import {
  LinkOutlined,
  LinkedinFilled,
  TwitterOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

const ShareArticle: React.FC = () => {
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
            <Button icon={<TwitterOutlined />} />
          </Tooltip>
          <Tooltip title="Share on LinkedIn">
            <Button icon={<LinkedinFilled />} />
          </Tooltip>
          <Tooltip title="Copy Article Link">
            <Button icon={<LinkOutlined />} />
          </Tooltip>
        </Space>
      </div>
    </div>
  );
};

export default ShareArticle;
