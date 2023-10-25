import { ArticlePage } from '@/types';
import { copyText, getProductSection, getReadingTime } from '@/utils';
import { formatDateAndTime } from '@contentful/f36-datetime';
import { Divider, Space, Typography } from 'antd';
import Link from 'next/link';

import * as React from 'react';
import { SocialSharing } from '../platform';

interface ArticleMetaDataProps
  extends Pick<ArticlePage, 'sectionsCollection' | 'publishedDate' | 'title'> {}

const { Text } = Typography;

// TODO: extract this out

const ArticleMetaData: React.FC<ArticleMetaDataProps> = ({
  sectionsCollection,
  title,
  publishedDate,
}) => {
  const productSection = getProductSection(sectionsCollection);

  return (
    <Space size={4} split={<Divider type="vertical" />}>
      {productSection && productSection.name && (
        <Link href={'/' + productSection.name}>
          {productSection.name
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
