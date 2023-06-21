import { ArticleSummaryWithCover } from '@/types';
import { Button, Card, Grid, Image, Typography, theme } from 'antd';
import Link from 'next/link';
import * as React from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useCounter } from '@/hooks';

const { Link: AntLink, Text } = Typography;
const { useToken } = theme;
const { useBreakpoint } = Grid;

interface LatestReportProps {
  reports: ReadonlyArray<ArticleSummaryWithCover>;
}

const LatestReport: React.FC<LatestReportProps> = ({ reports }) => {
  const {
    token: { colorBgLayout },
  } = useToken();
  const { current, next, previous } = useCounter(reports.length - 1);

  return (
    <Card
      headStyle={{
        backgroundColor: colorBgLayout,
        overflow: 'hidden',
      }}
      bordered
      title="Weekly Report"
      extra={
        <Link href={'/'}>
          <AntLink underline>See More</AntLink>
        </Link>
      }
      cover={
        <Image
          src={reports[current].article.image.url}
          alt={reports[current].article.image.description}
          preview={false}
        />
      }
      actions={[
        <Button
          disabled={current <= 0}
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={previous}
        />,
        <Button type="text">Read Report</Button>,
        <Button
          icon={<ArrowRightOutlined />}
          onClick={next}
          disabled={current >= 5}
          type="text"
        />,
      ]}
    >
      <Text type="secondary">{reports[current].article.subtitle}</Text>
    </Card>
  );
};

export default LatestReport;
