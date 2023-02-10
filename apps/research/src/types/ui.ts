import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

export type Size = 'large' | 'small';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
