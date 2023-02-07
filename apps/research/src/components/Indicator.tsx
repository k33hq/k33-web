import * as React from 'react';
import { Brand } from '../types';
import { colors } from '../utils';

interface IndicatorProps extends Brand {}

const Indicator: React.FC<IndicatorProps> = ({ color }) => {
  return <div className={'w-auto h-2 ' + colors[color]} />;
};

export default Indicator;
