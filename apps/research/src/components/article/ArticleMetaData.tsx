import { ArticlePage } from '@/types';
import { copyText, getReadingTime } from '@/utils';
import { ShareAltOutlined } from '@ant-design/icons';
import { formatDateAndTime } from '@contentful/f36-datetime';
import { Button, Divider, Space, Tooltip, Typography } from 'antd';

import * as React from 'react';
import { SocialSharing } from '../platform';

interface ArticleMetaDataProps
  extends Pick<ArticlePage, 'section' | 'publishedDate' | 'title'> {}

const { Text } = Typography;

const ArticleMetaData: React.FC<ArticleMetaDataProps> = ({
  section,
  title,
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
      <SocialSharing title={title} label="Share" type="text" />
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
