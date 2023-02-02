import * as React from 'react';
import { Brand } from '../types';
import { colors } from 'utils';

interface MarkerProps extends Brand {
  size?: 'large' | 'small';
}

const Marker: React.FC<MarkerProps> = ({
  color = 'systemBlue',
  size = 'large',
}) => (
  <div
    className={`${size == 'large' ? 'w-1' : 'w-0.5'} h-4 ` + colors[color]}
  />
);

export default Marker;
