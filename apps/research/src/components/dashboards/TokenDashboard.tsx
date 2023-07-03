import * as React from 'react';
import { ArticleSummaryWidget } from '@/types';
import Link from 'next/link';
import { Divider, Typography } from 'antd';
import { DashboardList } from '../article';

// TODO: gets 4 latest analysis section articles

const { Link: AntLink, Title } = Typography;

interface TokenDashboardProps {
  articles: ReadonlyArray<ArticleSummaryWidget>;
}

const TokenDashboard: React.FC<TokenDashboardProps> = ({ articles }) => {
  return (
    <div
      id="token-valuation-dashboard-summary"
      className="home-section-summary"
    >
      <div style={{ width: '100%' }}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Title level={4}>Token Analysis</Title>
          <Link href={'/token-valuation/analysis'}>
            <AntLink underline>See More</AntLink>
          </Link>
        </div>
        <Divider style={{ margin: 0 }} />
      </div>

      <DashboardList
        articles={articles}
        title="Analysis"
        hideSection
        smallScreen={2}
        href="/token-valuation/analysis"
      />
    </div>
  );
};

export default TokenDashboard;
