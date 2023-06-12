import * as React from 'react';
import { Layout } from 'antd';
import { NextPageWithLayout } from 'ui';
import { NextSeo } from 'next-seo';
import { TabLayout, Payments } from '@/components';

const { Content } = Layout;

const Settings: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="K33 - Settings" />
      <Content id="settings-layout" className="settings">
        <Payments />
      </Content>
    </>
  );
};

Settings.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <TabLayout title="Settings" tabs={[{ key: 'payments', label: 'Payments' }]}>
      {page}
    </TabLayout>
  );
};

export default Settings;
