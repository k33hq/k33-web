// declare module '*.svg' {
//   const content: any;
//   export default content;
// }

import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

export type Direction = 'right' | 'left';
export type Variants = 'primary' | 'secondary';
export type Variant = 'primary' | 'secondary' | 'tertiary';
export type Size = 'large' | 'medium' | 'small';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
