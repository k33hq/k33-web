import { Author } from '@/types';
import { Card, theme, Typography, Space, Image, Grid } from 'antd';
import { EllipsisConfig } from 'antd/es/typography/Base';

const { useToken } = theme;
const { Paragraph } = Typography;
const { useBreakpoint } = Grid;

interface AuthorCardProps extends Author {}

const AuthorCard: React.FC<AuthorCardProps> = ({
  title,
  profilePicture,
  description,
  name,
}) => {
  const {
    token: { fontSizeLG, colorBgLayout, fontSize },
  } = useToken();
  const { sm } = useBreakpoint();
  return (
    <Card
      style={{
        width: '100%',
      }}
      bordered
      headStyle={{
        backgroundColor: colorBgLayout,
        fontSize: fontSize,
      }}
      bodyStyle={{
        padding: '16px 24px 16px 24px',
      }}
      title={name}
    >
      <Space direction="horizontal" size={24} align="start">
        <Space direction="vertical" size={8}>
          <Paragraph
            type="secondary"
            ellipsis={
              { rows: 4, expandable: true, symbol: 'more' } as EllipsisConfig
            }
            style={{
              fontSize: fontSizeLG,
              margin: 0,
            }}
          >
            {description}
          </Paragraph>
        </Space>
        {sm && (
          <div
            style={{
              width: 137,
            }}
          >
            <Image
              style={{
                objectFit: 'cover',
              }}
              preview={false}
              src={profilePicture.url}
              alt={profilePicture.title ?? name}
            />
          </div>
        )}
      </Space>
    </Card>
  );
};

export default AuthorCard;
