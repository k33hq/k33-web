import * as React from 'react';
import { NextPageWithLayout } from 'ui';
import { Typography } from 'antd';
import { SimpleLayout } from '@/components';
import { NextSeo } from 'next-seo';
import { BuilderComponent, builder } from '@builder.io/react';
import { GetStaticProps } from 'next';

builder.init(process.env.BUILDER_API_KEY!);

interface HomePageProps {
  homepage: any;
}

const Home: NextPageWithLayout<HomePageProps> = ({ homepage }) => {
  return (
    <>
      <NextSeo title="K33 - Research" />
      <BuilderComponent model="homepage" content={homepage} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const homepage = await builder.get('homepage').toPromise();

  // api call
  return {
    props: {
      homepage: homepage || null,
    },
  };
};

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <SimpleLayout>{page}</SimpleLayout>;
};

export default Home;
