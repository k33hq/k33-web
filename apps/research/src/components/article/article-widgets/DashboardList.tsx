import { ArticleWebWidget, ArticleSummaryWidget } from '@/types';
import * as React from 'react';
import ArticleCard from './ArticleCard';
import { Col, Divider, Grid, Row } from 'antd';
import { SectionHeader, SectionHeaderProps } from '@/components';

const { useBreakpoint } = Grid;

interface DashboardListProps extends SectionHeaderProps {
  articles: ReadonlyArray<ArticleSummaryWidget>;
  smallScreen?: number;
  hideSection?: boolean;
  column?: number;
  lastDivider?: boolean;
}

const DashboardList: React.FC<DashboardListProps> = ({
  articles,
  smallScreen,
  hideSection = false,
  column = 6,
  lastDivider = true,
  ...section
}) => {
  const { md } = useBreakpoint();

  const isLastDivider = <T extends object>(
    list: ReadonlyArray<T>,
    index: number
  ) => {
    return list.length - 1 == index && !lastDivider;
  };

  const getArticles = () => {
    if (!smallScreen)
      return (
        <>
          {articles.map((article, index) => (
            <>
              <Col xs={24} md={column} key={article.articleSlug}>
                <ArticleCard {...article} />
              </Col>
              {!md && (
                <>
                  {!isLastDivider(articles, index) && (
                    <Col xs={24} md={column} key={article.articleSlug}>
                      <Divider style={{ margin: 0 }} />
                    </Col>
                  )}
                </>
              )}
            </>
          ))}
        </>
      );

    return (
      <>
        {md
          ? articles.map((article) => (
              <Col span={column} key={article.articleSlug}>
                <ArticleCard {...article} />
              </Col>
            ))
          : articles.slice(0, smallScreen).map((article, index) => (
              <>
                <Col span={24} key={article.articleSlug! + index}>
                  <ArticleCard {...article} />
                </Col>
                {!isLastDivider(articles.slice(0, smallScreen), index) && (
                  <Divider style={{ margin: 0 }} />
                )}
              </>
            ))}
      </>
    );
  };

  return (
    <div id="article-dashboard-summary" className="dashboard-article-summary">
      {!hideSection && <SectionHeader {...section} />}
      <Row
        align="stretch"
        gutter={[
          { md: 16, lg: 24, xl: 32 },
          { xs: 56, sm: 48 },
        ]}
      >
        {getArticles()}
      </Row>
    </div>
  );
};

export default DashboardList;
