import { ArticlePage } from '@/types';
import { copyText, getReadingTime } from '@/utils';
import { formatDateAndTime } from '@contentful/f36-datetime';
import { Divider, Space, Typography } from 'antd';
import Link from 'next/link';

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
  return (
    <Space size={4} split={<Divider type="vertical" />}>
      {section && (
        <Link href={'/' + section.name}>
          {section.name
            .split('/')[1]
            .split('-')
            .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
            .join(' ')}
        </Link>
      )}
      <Text type="secondary">{formatDateAndTime(publishedDate, 'day')}</Text>
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
