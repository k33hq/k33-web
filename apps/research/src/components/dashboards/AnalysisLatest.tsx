import { ArticleWebWidget } from '@/types';
import * as React from 'react';
import { ArticleCard } from '../article';
import { Col, Divider, Grid, Row, Typography } from 'antd';
import styles from './styles.module.scss';
import Link from 'next/link';

const { Text, Link: AntLink } = Typography;
const { useBreakpoint } = Grid;

interface AnalysisLatestProps {
  articles: ReadonlyArray<ArticleWebWidget>;
}

const AnalysisLatest: React.FC<AnalysisLatestProps> = ({ articles }) => {
  const { md } = useBreakpoint();

  const smallScreenArticles = articles.slice(0, 2);

  return (
    <div id="analysis-dashboard-summary" className={styles.analysisSummary}>
      {/* <div id="analysis-header" className={styles.anlysisHeader}>
        <div id="analysis-title" className={styles.sectionHeader}>
          <Text strong>Analysis</Text>
          <Link href={'/token-valuation/analysis'}>
            <AntLink underline>See More</AntLink>
          </Link>
        </div>
        <Divider style={{ margin: 0 }} />
      </div> */}
      <Row
        align="stretch"
        gutter={[
          { md: 16, lg: 24, xl: 32 },
          { xs: 56, sm: 48 },
        ]}
      >
        {md
          ? articles.map((article) => (
              <Col span={6} key={article.articleSlug}>
                <ArticleCard {...article} />
              </Col>
            ))
          : smallScreenArticles.map((article, index) => (
              <>
                <Col span={24} key={article.articleSlug! + index}>
                  <ArticleCard {...article} />
                </Col>
                <Divider style={{ margin: 0 }} />
              </>
            ))}
      </Row>
    </div>
  );
};

export default AnalysisLatest;
