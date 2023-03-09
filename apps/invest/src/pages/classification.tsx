import { Survey } from '@/components';
import { classificationConfig } from '@/config';
import { useArcaneFlow } from '@/hooks';
import PrivateLayout from '@/layouts/PrivateLayout';
import { useGetFundRegistrationQuery } from '@/services';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getTitle } from 'platform-js';
import { ReactElement, useEffect } from 'react';
import { BasicButton, NextPageWithLayout } from 'ui';

/**
 * user-state: [registered]
 * @returns
 */
const Classification: NextPageWithLayout = () => {
  const { next, previous } = useArcaneFlow(classificationConfig);
  const router = useRouter();
  const { error, data, isLoading, isSuccess } = useGetFundRegistrationQuery(
    'k33-assets-i-fund-limited'
  );

  useEffect(() => {
    if (isSuccess) {
      router.push('home');
    }
  }, [router, isSuccess]);

  return (
    <div className="md:container px-6 md:px-0 h-screen">
      <Head>
        <title>{getTitle('Investments', 'Classification')}</title>
      </Head>
      <Survey prev={previous} next={next} />
    </div>
  );
};

Classification.getLayout = (page: ReactElement) => {
  return <PrivateLayout>{page}</PrivateLayout>;
};

export default Classification;
