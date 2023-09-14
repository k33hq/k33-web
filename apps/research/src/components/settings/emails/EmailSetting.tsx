import { ProductStatus, SupressedGroup } from '@/types';
import { Button, Divider, Switch, Tag, Typography, theme, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import * as React from 'react';
import { useSupressionGroupActions } from '@/hooks';

interface EmailSettingProps extends SupressedGroup {
  description: string;
  productStatus: ProductStatus | null | 'loading';
  isPro?: boolean;
  openProductModal: () => void;
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const EmailSetting: React.FC<EmailSettingProps> = ({
  id,
  name,
  suppressed,
  description,
  productStatus,
  openProductModal,
  isPro = false,
}) => {
  const {
    token: { fontSizeSM },
  } = theme.useToken();

  const { putGroupInSupression, deleteGroupInSupression, isLoading } =
    useSupressionGroupActions(String(id));

  const switchHandler = (checked: boolean) => {
    if (!checked) {
      putGroupInSupression();
    } else {
      deleteGroupInSupression();
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 16,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 4,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
              alignSelf: 'stretch',
            }}
          >
            {isPro && <Tag color="black">Pro</Tag>}
            <Typography.Title level={5} style={{ margin: 0 }}>
              {name}
            </Typography.Title>
          </div>
          <Typography.Text
            style={{
              fontSize: fontSizeSM,
            }}
          >
            {description}
          </Typography.Text>
        </div>
        {(productStatus === 'active' || !isPro) && (
          <div style={{ display: 'flex', gap: 2 }}>
            <Switch
              defaultChecked={!suppressed}
              checked={!suppressed}
              onChange={switchHandler}
            />
            {isLoading && <Spin indicator={antIcon} />}
          </div>
        )}
        {productStatus === 'ended' && isPro && (
          <Button onClick={openProductModal}>Renew Subscription</Button>
        )}
        {productStatus === 'blocked' && isPro && (
          <Button onClick={openProductModal}>Update payment details</Button>
        )}
        {productStatus === null && isPro && (
          <Button onClick={openProductModal}>Start 30 day trial</Button>
        )}
      </div>
      <Divider style={{ margin: 0 }} />
    </>
  );
};

export default EmailSetting;
