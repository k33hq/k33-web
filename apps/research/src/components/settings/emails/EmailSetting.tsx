import { ProductStatus, SupressedGroup } from '@/types';
import { Button, Divider, Switch, Tag, Typography, theme, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import * as React from 'react';
import { useSupressionGroupActions } from '@/hooks';
import styles from './styles.module.scss';

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
      <div className={styles.emailSettings}>
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
            {isPro && <Tag color="black">PRO</Tag>}
            <Typography.Text strong>{name}</Typography.Text>
          </div>
          <Typography.Text
            type="secondary"
            style={{
              fontSize: fontSizeSM,
            }}
          >
            {description}
          </Typography.Text>
        </div>
        {(productStatus === 'active' || !isPro) && (
          <Switch
            defaultChecked={!suppressed}
            checked={!suppressed}
            onChange={switchHandler}
            loading={isLoading}
          />
        )}
        {productStatus === 'ended' && isPro && (
          <Button size="small" onClick={openProductModal}>
            Renew Subscription
          </Button>
        )}
        {productStatus === 'blocked' && isPro && (
          <Button size="small" onClick={openProductModal}>
            Update payment details
          </Button>
        )}
        {productStatus === null && isPro && (
          <Button size="small" onClick={openProductModal}>
            Start 30 day trial
          </Button>
        )}
      </div>
      <Divider style={{ margin: 0 }} />
    </>
  );
};

export default EmailSetting;
