import * as React from 'react';
import { Divider, Typography } from 'antd';
import Link from 'next/link';

const { Text, Link: AntLink } = Typography;

export interface SectionHeaderProps {
  title: string;
  href?: string;
  id?: string;
  isNavigable?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  href,
  id = `section-${title.toLowerCase().replace(' ', '-')}`,
  isNavigable = true,
}) => {
  if (!href && isNavigable)
    throw 'href is not defined in SectionHeader but is navigable';

  return (
    <div id={id} className="dashboard-header">
      <div
        id={id + '-title'}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: 8,
          width: '100%',
        }}
      >
        <Text strong>{title}</Text>
        {isNavigable && (
          <Link href={href ?? window.location.href}>
            <AntLink underline>See More</AntLink>
          </Link>
        )}
      </div>
      <Divider style={{ margin: 0 }} />
    </div>
  );
};

export default SectionHeader;
