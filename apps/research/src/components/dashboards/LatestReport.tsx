import { ArticleSummaryWithCover } from '@/types';
import { Button, Card, Grid, Image, Typography, theme } from 'antd';
import Link from 'next/link';
import * as React from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useTraverse } from '@/hooks';
import { motion } from 'framer-motion';

const { Link: AntLink, Text } = Typography;
const { useToken } = theme;
const { useBreakpoint } = Grid;

interface LatestReportProps {
  reports: ReadonlyArray<ArticleSummaryWithCover>;
}

export const variants = {
  show: {
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 1,
    },
  },
  hide: {
    opacity: 0,
  },
};

// TODO: fetch the api on client side
const LatestReport: React.FC<LatestReportProps> = ({ reports }) => {
  const {
    token: { colorBgLayout, fontSize },
  } = useToken();
  const { xl } = useBreakpoint();
  const {
    current: {
      article: {
        subtitle,
        title,
        image: { url, description },
      },
      articleSlug,
    },
    next,
    previous,
    hasNext,
    hasPrevious,
  } = useTraverse(reports.slice().reverse() as Array<ArticleSummaryWithCover>);

  return (
    <Card
      headStyle={{
        backgroundColor: colorBgLayout,
        overflow: 'hidden',
        fontSize: fontSize,
      }}
      bordered
      title="Weekly Report"
      extra={
        <Link href={'/market-insights/weekly-reports'}>
          <AntLink underline>See More</AntLink>
        </Link>
      }
      bodyStyle={{
        minHeight: 114,
      }}
      cover={<Image src={url} alt={description} preview={false} />}
      actions={[
        <Button
          type="text"
          size="large"
          block
          icon={<ArrowLeftOutlined />}
          onClick={previous}
          disabled={!hasPrevious}
        />,
        <Link href={'/articles/' + articleSlug}>
          <Button size="large" block type="text">
            Read Report
          </Button>
        </Link>,
        <Button
          icon={<ArrowRightOutlined />}
          size="large"
          block
          disabled={!hasNext}
          onClick={next}
          type="text"
        />,
      ]}
    >
      <motion.div
        key={articleSlug}
        variants={variants}
        animate={'show'}
        initial="hide"
      >
        <Text type="secondary">{subtitle}</Text>
      </motion.div>
    </Card>
  );
};

export default LatestReport;
