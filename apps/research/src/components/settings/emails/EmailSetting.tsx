import { ProductStatus, SupressedGroup } from '@/types';
import { Divider, Switch, Typography, theme } from 'antd';
import * as React from 'react';

interface EmailSettingProps extends SupressedGroup {
  description: string;
  productStatus: ProductStatus | null | 'loading';
}

const EmailSetting: React.FC<EmailSettingProps> = ({
  id,
  name,
  supressed,
  description,
  productStatus,
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
        <div>
          <Typography.Title level={5}>{name}</Typography.Title>
          <Typography.Text
            style={{
              fontSize: fontSizeSM,
            }}
          >
            {description}
          </Typography.Text>
        </div>
        <Switch
          defaultChecked={supressed}
          checked={supressed}
          onChange={switchHandler}
        />
      </div>
      <Divider style={{ margin: 0 }} />
    </>
  );
};

export default EmailSetting;
