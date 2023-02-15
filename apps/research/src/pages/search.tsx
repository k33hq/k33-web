import { PrivateLayout } from '@/layouts';
import { ReactElement } from 'react';
import { NextPageWithLayout } from 'ui';

const Search: NextPageWithLayout = () => {
  return <div>Search page</div>;
};

Search.getLayout = function getLayout(page: ReactElement) {
  return <PrivateLayout>{page}</PrivateLayout>;
};

export default Search;
