import * as React from 'react';
import { NextPageWithLayout } from 'ui';
import { Layout, Typography } from 'antd';
import { SimpleLayout } from '@/components';
import { NextSeo } from 'next-seo';

const { Content } = Layout;

const Home: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="K33 - Research" />
      <Typography.Text>Home</Typography.Text>
    </>
  );
};

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <SimpleLayout>{page}</SimpleLayout>;
};

export default Home;
