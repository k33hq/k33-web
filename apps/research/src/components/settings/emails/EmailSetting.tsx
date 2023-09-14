import { ProductStatus, SupressedGroup } from '@/types';
import { Button, Divider, Switch, Tag, Typography, theme } from 'antd';
import * as React from 'react';

interface EmailSettingProps extends SupressedGroup {
  description: string;
  productStatus: ProductStatus | null | 'loading';
  isPro?: boolean;
}

const EmailSetting: React.FC<EmailSettingProps> = ({
  id,
  name,
  supressed,
  description,
  productStatus,
  isPro = false,
}) => {
  const [showProduct, setProduct] = React.useState(false);

  const {
    token: { fontSizeSM },
  } = theme.useToken();

  const switchHandler = (checked: boolean) => {
    // TODO: check whether product status is ex sub or not a sub then on click show dialog
    console.log(checked);
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
            {isPro && <Tag>Pro</Tag>}
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
        {productStatus === 'active' && (
          <Switch
            defaultChecked={!supressed}
            checked={!supressed}
            onChange={switchHandler}
          />
        )}
        {productStatus === 'ended' && <Button>Renew Subscription</Button>}
        {productStatus === 'blocked' && <Button>Update payment details</Button>}
        {productStatus === null && <Button>Start 30 day trial</Button>}
      </div>
      <Divider style={{ margin: 0 }} />
    </>
  );
};

export default EmailSetting;
