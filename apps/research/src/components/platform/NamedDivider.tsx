import { Divider } from 'antd';
import * as React from 'react';

interface NamedDividerProps {
  label: string;
}

const NamedDivider: React.FC<NamedDividerProps> = ({ label }) => {
  return <Divider orientation="left">{label}</Divider>;
};

export default NamedDivider;
