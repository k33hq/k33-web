'use client';

import { Doughnut } from 'react-chartjs-2';
import * as React from 'react';
import {
  ArcElement,
  Chart,
  ChartData,
  Colors,
  Legend,
  Title,
  Tooltip,
  TooltipItem,
} from 'chart.js';
import { Amount } from '@/types';
import { formatCurrency, formatPercent } from './formatters';

interface DonutChartProps {
  currency: string;
  amounts: Amount[];
  className?: string;
}

Chart.register(ArcElement, Colors, Legend, Title, Tooltip);

const DonutChart: React.FC<DonutChartProps> = ({
  amounts,
  currency,
  className,
}) => {
  const sum = amounts.reduce((sum, amount) => sum + amount.value, 0);
  const chartData: ChartData<'doughnut', number[], unknown> = {
    labels: [...amounts.map((amount) => amount.currency)],
    datasets: [
      {
        data: [...amounts.map((amount) => amount.value)],
      },
    ],
  };
  return (
    <Doughnut
      className={className}
      options={{
        cutout: '70%',
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'start',
          },
          title: {
            display: true,
            text: 'Value share',
          },
          tooltip: {
            callbacks: {
              label(
                tooltipItem: TooltipItem<'doughnut'>
              ): string | string[] | void {
                return `${formatCurrency({
                  value: tooltipItem.parsed,
                  currency: currency,
                })} : ${formatPercent(tooltipItem.parsed / sum)}`;
              },
            },
          },
        },
      }}
      data={chartData}
    />
  );
};

export default DonutChart;
