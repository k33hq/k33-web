import * as React from 'react';
import NamedDivider from '../platform/NamedDivider';
import AnalysisLatest from './AnalysisLatest';
import { ArticleSummaryWidget, ArticleWebWidget } from '@/types';
import Link from 'next/link';
import { Divider, Typography } from 'antd';

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
          <Title level={4}>Token Valuation</Title>
          <Link href={'/token-valuation/analysis'}>
            <AntLink underline>See More</AntLink>
          </Link>
        </div>
        <Divider style={{ margin: 0 }} />
      </div>

      <AnalysisLatest articles={articles} />
    </div>
  );
};

export default TokenDashboard;
