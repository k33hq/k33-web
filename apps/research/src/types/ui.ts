import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

export type Size = 'large' | 'small';

import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export type SubscriberType = 'free' | 'pro';
