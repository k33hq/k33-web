import * as React from 'react';
import { Brand } from '../types';

interface MarkerProps extends Brand {
  size?: 'large' | 'small';
}

export const colors = {
  systemBlue: 'bg-default-systemBlue-light',
  systemRed: 'bg-default-systemRed-light',
  systemOrange: 'bg-default-systemOrange-light',
  systemYellow: 'bg-default-systemYellow-light',
  systemGreen: 'bg-default-systemGreen-light',
  systemTeal: 'bg-default-systemTeal-light',
  systemIndigo: 'bg-default-systemIndigo-light',
  systemPurple: 'bg-default-systemPurple-light',
  systemPink: 'bg-default-systemPink-light',
  'brand.black': 'bg-brand-light-primary',
};

const Marker: React.FC<MarkerProps> = ({
  color = 'systemBlue',
  size = 'large',
}) => (
  <div className={'md:ui-w-1 md:ui-h-4 ui-w-0.5 ui-h-3 ' + colors[color]} />
);

export default Marker;
