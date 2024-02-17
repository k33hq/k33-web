import { ReactElement, useEffect } from 'react';
import PrivateMainLayout from '@/layouts/PrivateMainLayout';
import Head from 'next/head';
import { getTitle, NextPageWithLayout, useAppState } from 'platform-js';
import { useLazyGetFundRegistrationQuery } from '@/services';
import { useRouter } from 'next/router';
import config from '@/firebase/config';
import { builder, BuilderComponent } from '@builder.io/react';
import { BuilderContent } from '@builder.io/sdk';
import { GetStaticProps } from 'next';

/**
 *  user-state: [registered, fund-registered]
 * @returns
 */

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!!);

interface InvestFundInfoProps {
  builderContent: BuilderContent | null;
}

const Home: NextPageWithLayout<InvestFundInfoProps> = ({ builderContent }) => {
  const router = useRouter();
  const state = useAppState(config);

  // const { error, data, isError, isSuccess } = useGetFundRegistrationQuery(
  //   'k33-assets-i-fund-limited'
  // );

  const [trigger] = useLazyGetFundRegistrationQuery();

  useEffect(() => {
    const getFundRegistration = async () => {
      try {
        const data = await trigger('k33-assets-i-fund-limited').unwrap();
      } catch (error) {
        console.log(error);
        await router.push('/');
      }
    };

    getFundRegistration();
  }, [state, trigger, router]);

  // useEffect(() => {
  //   console.log(isError);
  //   if (isError) {
  //     router.push('/');
  //   }
  // }, [router, isError]);

  return (
    <>
      <Head>
        <title>{getTitle('Investments', 'Home')}</title>
      </Head>
      <BuilderComponent model='page' content={builderContent || undefined} />
    </>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <PrivateMainLayout>{page}</PrivateMainLayout>;
};

export const getStaticProps: GetStaticProps<InvestFundInfoProps> = async () => {
  const builderContent = await builder.get(
    'page', {
      userAttributes: {
        urlPath: "/apps/invest/home",
      },
    }).promise();
  return {
    props: {
      builderContent: builderContent || null,
    },
    // Revalidate the content every 5 seconds
    revalidate: 5,
  };
};

export default Home;
