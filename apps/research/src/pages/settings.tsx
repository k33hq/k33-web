import { PrivateLayout } from '@/layouts';
import { SubscriberType } from '@/types';
import { fetcher } from 'core';
import { ReactElement, useEffect, useState } from 'react';
import {
  NextPageWithLayout,
  TabMenu,
  TabPanel,
  TabMenuList,
  TabItem,
  TabMenuPanel,
  BasicList,
} from 'ui';

// TODO: refactor it later and put it in a hook or something
const Settings: NextPageWithLayout = () => {
  const [subscriber, setSubscriber] = useState<null | SubscriberType>(null);

  useEffect(() => {
    // fetcher(
    //   `${process.env.NEXT_PUBLIC_K33_BACKEND_URL}payment/subscribed-products`
    // )
    //   .catch((data) => setSubscriber('free'))
    //   .then((data) => setSubscriber('pro'));

    const getSubscriber = async () => {
      try {
        const data = await fetcher(
          `${process.env.NEXT_PUBLIC_K33_BACKEND_URL}payment/subscribed-products`
        );

        if (data.status === 404) {
          setSubscriber('free');
        } else {
          setSubscriber('pro');
        }
      } catch (err) {
        setSubscriber('free');
      }
    };

    getSubscriber();
  }, [subscriber]);

  return (
    <>
      <div className="flex flex-col md:gap-10 md:py-20 gap-4 pt-10 px-6 md:px-0 bg-bg-light-secondary">
        <div
          className="flex flex-col md:gap-4 gap-2 md:container"
          id="research-category-banner"
        >
          <p className="md:text-heading5 text-heading6 text-label-light-primary">
            Settings
          </p>
        </div>
      </div>
      <div className="md:container md:py-10 py-5 px-6 md:px-0">
        <TabMenu>
          <TabMenuList>
            <TabItem name="Plan" />
          </TabMenuList>
          <TabMenuPanel>
            <TabPanel>
              {subscriber ? (
                <Plan
                  type={subscriber}
                  features={[
                    'Our Friday newsletter delivered to your inbox',
                    'Restricted access to certain free analysis, reports and webinars',
                  ]}
                />
              ) : null}
            </TabPanel>
          </TabMenuPanel>
        </TabMenu>
      </div>
    </>
  );
};

interface PlanProps {
  type: 'free' | 'pro';
  features: ReadonlyArray<string>;
}

const Plan: React.FC<PlanProps> = ({ type, features }) => {
  return (
    <div
      id="stripe-product-panel"
      className="bg-bg-light-primary rounded-xl shadow-lg md:px-8 md:py-6 flex flex-row ring-1 ring-brand-light-tertiary ring-opacity-10 items-start justify-between"
    >
      <div className="flex flex-col md:gap-9">
        <div className="flex flex-col md:gap-2">
          <p className="text-body1 text-label-light-primary">Current Plan</p>
          <p className="text-small text-label-light-secondary">
            Access to our Quick Takes and free Reports
          </p>
        </div>
        <div id="feature-list">
          <BasicList data={features} />
        </div>
      </div>
      <div className="flex flex-col">
        {type === 'free' ? (
          <p className="text-heading4 text-label-light-primary">Free</p>
        ) : (
          <p className="text-heading4 text-label-light-primary">Pro</p>
        )}
      </div>
    </div>
  );
};

Settings.getLayout = function getLayout(page: ReactElement) {
  return <PrivateLayout>{page}</PrivateLayout>;
};

export default Settings;
