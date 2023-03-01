import { Survey } from '@/components';
import { classificationConfig } from '@/config';
import { useArcaneFlow } from '@/hooks';
import PrivateLayout from '@/layouts/PrivateLayout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from 'ui';

/**
 * user-state: [registered]
 * @returns
 */
const Classification: NextPageWithLayout = () => {
  const { next, previous } = useArcaneFlow(classificationConfig);
  return (
    <div className="md:container px-6 md:px-0 md:h-screen md:w-full md:p-20 md:gap-10">
      <Survey next={next} />
    </div>
  );
};

Classification.getLayout = (page: ReactElement) => {
  return <PrivateLayout>{page}</PrivateLayout>;
};

export default Classification;
