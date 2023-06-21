import * as React from 'react';
import NamedDivider from '../platform/NamedDivider';
import AnalysisLatest from './AnalysisLatest';
import { ArticleSummaryWidget, ArticleWebWidget } from '@/types';

// TODO: gets 4 latest analysis section articles

interface TokenDashboardProps {
  articles: ReadonlyArray<ArticleSummaryWidget>;
}

const TokenDashboard: React.FC<TokenDashboardProps> = ({ articles }) => {
  return (
    <div id="token-valuation-dashboard-summary">
      <NamedDivider label="Token Valuation" />
      <AnalysisLatest articles={articles} />
    </div>
  );
};

export default TokenDashboard;
