import { Divider, theme } from 'antd';
import * as React from 'react';

const { useToken } = theme;
interface NamedDividerProps {
  label: string;
}

const NamedDivider: React.FC<NamedDividerProps> = ({ label }) => {
  const {
    token: { fontSizeHeading4 },
  } = useToken();
  return (
    <Divider
      orientationMargin={0}
      style={{
        fontSize: fontSizeHeading4,
      }}
      orientation="left"
    >
      {label}
    </Divider>
  );
};

export default NamedDivider;
