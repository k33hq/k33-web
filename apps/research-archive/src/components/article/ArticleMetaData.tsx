import { ArchivePage, ArchivedArticleContent } from '@/types';
import { copyText, getReadingTime } from '@/utils';
import { formatDateAndTime } from '@contentful/f36-datetime';
import { Divider, Space, Typography } from 'antd';
import Link from 'next/link';

import * as React from 'react';
import { SocialSharing } from '../platform';

interface ArticleMetaDataProps
  extends Pick<ArchivePage, 'title'>,
    Pick<ArchivedArticleContent, 'publishDate'> {}

const { Text } = Typography;

const ArticleMetaData: React.FC<ArticleMetaDataProps> = ({
  title,
  publishDate,
}) => {
  return (
    <Space size={4} split={<Divider type="vertical" />}>
      <ReadTime />
      <Text type="secondary">{formatDateAndTime(publishDate, 'day')}</Text>
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
