import { ArticlePage } from '@/types';
import { copyText, getReadingTime } from '@/utils';
import { ShareAltOutlined } from '@ant-design/icons';
import { formatDateAndTime } from '@contentful/f36-datetime';
import { Button, Divider, Space, Tooltip, Typography } from 'antd';

import * as React from 'react';

interface ArticleMetaDataProps
  extends Pick<ArticlePage, 'section' | 'publishedDate'> {}

const { Text } = Typography;

const ArticleMetaData: React.FC<ArticleMetaDataProps> = ({
  section,
  publishedDate,
}) => {
  const shareUrl = () => {
    copyText();
  };
  // TODO: change share to dropdown
  return (
    <Space size={4} split={<Divider type="vertical" />}>
      {/* <Text strong>{section.name.split('/')[0]}</Text> */}
      <Text type="secondary">{formatDateAndTime(publishedDate, 'day')}</Text>
      <ReadTime />
      <Tooltip title="Article Link Copied!" trigger="click">
        <Button onClick={shareUrl} type="text" icon={<ShareAltOutlined />}>
          Share
        </Button>
      </Tooltip>
    </Space>
  );
};

export default ArticleMetaData;

const ReadTime = () => {
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    setTime(getReadingTime());
  }, []);

  if (time === 0) return null;
  return <Text type="secondary">{time} min read</Text>;
};
