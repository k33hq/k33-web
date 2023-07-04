import { Typography, Divider } from 'antd';
import Link from 'next/link';
import * as React from 'react';

const { Text, Link: AntLink } = Typography;

interface SectionDescriptionHeaderProps {
  name: string;
  description: string;
  href?: string;
}

const SectionDescriptionHeader: React.FC<SectionDescriptionHeaderProps> = ({
  name,
  description,
  href,
}) => {
  return (
    <div id="k33-vinter-index-table-description" className="stack">
      <div
        id="title"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Text strong>{name}</Text>
        {href && (
          <Link href={href}>
            <AntLink underline>See More</AntLink>
          </Link>
        )}
      </div>
      <Text strong type="secondary">
        {description}
      </Text>
      <Divider style={{ margin: 0 }} />
    </div>
  );
};

export default SectionDescriptionHeader;
