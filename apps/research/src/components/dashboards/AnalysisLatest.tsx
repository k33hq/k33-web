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
    <div id="analysis-dashboard-summary">
      <div id="analysis-header" className={styles.sectionHeader}>
        <Text strong>Analysis</Text>
        <Link href={'/token-valuation/analysis'}>
          <AntLink underline>See More</AntLink>
        </Link>
      </div>
      <Divider />
      <Row align="middle" gutter={16}>
        {md
          ? articles.map((article) => (
              <Col span={6} key={article.articleSlug}>
                <ArticleCard {...article} />
              </Col>
            ))
          : smallScreenArticles.map((article) => (
              <Col span={24} key={article.articleSlug}>
                <ArticleCard {...article} />
                <Divider />
              </Col>
            ))}
      </Row>
    </div>
  );
};

export default AnalysisLatest;
