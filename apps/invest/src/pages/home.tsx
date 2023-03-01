import { useFundRedirection } from '@/hooks';
import PrivateLayout from '@/layouts/PrivateLayout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from 'ui';

/**
 *  user-state: [registered, fund-registered]
 * @returns
 */
const Home: NextPageWithLayout = () => {
  const { data, isLoading } = useFundRedirection();
  return <>{isLoading ? 'loading' : <h1>home</h1>}</>;
};

Home.getLayout = (page: ReactElement) => {
  return <PrivateLayout>{page}</PrivateLayout>;
};

export default Home;
