import { Asset } from '@/types';
import { Card, Image, theme, Typography } from 'antd';

import * as React from 'react';

interface SpotlightChartProps {
  chart: Asset;
  chartBody?: string;
}
const { useToken } = theme;
const { Text } = Typography;
const SpotlightChart: React.FC<SpotlightChartProps> = ({
  chart,
  chartBody,
}) => {
  const {
    token: { colorBgLayout },
  } = useToken();
  return (
    <Card
      headStyle={{
        backgroundColor: colorBgLayout,
      }}
      style={{
        width: '100%',
        overflow: 'hidden',
      }}
      {...(!chartBody && {
        bodyStyle: {
          margin: 0,
          padding: 0,
        },
      })}
      title="Spotlight Chart"
      cover={<Image src={chart.url} alt={chart.description} preview={false} />}
    >
      {chartBody && <Text type="secondary">{chartBody}</Text>}
    </Card>
  );
};

export default SpotlightChart;
