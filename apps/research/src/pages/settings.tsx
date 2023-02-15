import { PrivateLayout } from '@/layouts';
import { ReactElement } from 'react';
import { NextPageWithLayout } from 'ui';

const Settings: NextPageWithLayout = () => {
  return <div>settings page</div>;
};

Settings.getLayout = function getLayout(page: ReactElement) {
  return <PrivateLayout>{page}</PrivateLayout>;
};

export default Settings;
