import { Card, Image, Space, Typography, theme, Grid } from 'antd';
import { EllipsisConfig } from 'antd/es/typography/Base';
import Link from 'next/link';
import * as React from 'react';

const { Link: AntLink, Text, Paragraph } = Typography;
const { useToken } = theme;
const { useBreakpoint } = Grid;

const OutlookCard: React.FC = () => {
  const {
    token: { fontSizeSM, fontSizeLG, colorBgLayout, fontSize },
  } = useToken();
  const { sm } = useBreakpoint();
  return (
    <Card
      style={{
        width: '100%',
      }}
      bordered
      headStyle={{
        backgroundColor: colorBgLayout,
        fontSize: fontSize,
      }}
      bodyStyle={{
        padding: '16px 24px 16px 24px',
      }}
      title="Monthly Outlook"
      extra={
        <Link href={'/market-insights/monthly-outlooks'}>
          <AntLink underline>Read More</AntLink>
        </Link>
      }
    >
      <Space direction="horizontal" size={24} align="start">
        <Space direction="vertical" size={8}>
          <Paragraph
            type="secondary"
            ellipsis={
              { rows: 4, expandable: true, symbol: 'more' } as EllipsisConfig
            }
            style={{
              fontSize: fontSizeLG,
              margin: 0,
            }}
          >
            The resurgence of the U.S. ETF race represents a monumental change
            to bitcoin, with all ingredients in place for a spicy market in the
            coming nine months in favor of more aggressive positioning in BTC.
            Significant momentum should erupt ahead of the first deadline in
            late August to early September, while the final ETF deadline is
            itching closer to BTC’s 2024 halving, creating two potential
            cyclical coinciding cyclical tailwinds.
          </Paragraph>
          <Text
            type="secondary"
            style={{
              fontSize: fontSizeSM,
            }}
          >
            Vetle Lunde
          </Text>
        </Space>
        {sm && (
          <div
            style={{
              width: 137,
            }}
          >
            <Image
              style={{
                objectFit: 'cover',
              }}
              preview={false}
              src="https://images.ctfassets.net/i0qyt2j9snzb/6gBriVpMjMZz1yVWK78dCi/d8ff1379c586c28dc1314fe0f43e97b0/vetle.png"
              alt="Vetle Lunde"
            />
          </div>
        )}
      </Space>
    </Card>
  );
};

export default OutlookCard;
