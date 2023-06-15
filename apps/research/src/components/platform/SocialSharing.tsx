import { Button, Dropdown, Space, Typography, message } from 'antd';
import type { ButtonProps, MenuProps } from 'antd';
import {
  ShareAltOutlined,
  LinkOutlined,
  LinkedinFilled,
  TwitterOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import * as React from 'react';
import { copyText, linkedin, twitter } from '@/utils';

const { Text } = Typography;

interface SocialSharingProps {
  title: string;
  type?: 'text' | 'default';
  label?: string | null;
}

const SocialSharing: React.FC<SocialSharingProps> = ({
  title,
  type = 'default',
  label = null,
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Link',
      icon: <LinkOutlined />,
      onClick: () => {
        copyText();
        messageApi.success('Article Link Copied!!');
      },
    },
    {
      key: '2',
      label: 'Twitter',
      icon: <TwitterOutlined />,
      onClick: () => twitter({ text: title, hashtags: [], target: '_blank' }),
    },
    {
      key: '3',
      label: 'LinkedIn',
      icon: <LinkedinFilled />,
      onClick: () => linkedin({ target: '_blank' }),
    },
  ];
  return (
    <>
      {contextHolder}

      <Dropdown menu={{ items }}>
        <Button
          onClick={(e) => e.preventDefault()}
          type={type}
          icon={<ShareAltOutlined />}
        >
          {label ?? label}
        </Button>
      </Dropdown>
    </>
  );
};

export default SocialSharing;
