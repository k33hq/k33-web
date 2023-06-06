import { Col, Row, Grid } from 'antd';
import * as React from 'react';
const { useBreakpoint } = Grid;

const ArticleBodyLayout: React.FC = () => {
  const screen = useBreakpoint();
  return (
    <Row>
      <Col xs={24} xl={4} order={screen.xl ? 0 : 2}>
        Author Side bar
      </Col>
      <Col xs={24} xl={18}>
        Main Article
      </Col>
      <Col xs={0} xl={2}></Col>
    </Row>
  );
};

export default ArticleBodyLayout;
