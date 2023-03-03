import { Survey } from '@/components';
import { classificationConfig } from '@/config';
import { useArcaneFlow } from '@/hooks';
import PrivateLayout from '@/layouts/PrivateLayout';
import { ReactElement } from 'react';
import { BasicButton, NextPageWithLayout } from 'ui';

/**
 * user-state: [registered]
 * @returns
 */
const Classification: NextPageWithLayout = () => {
  const { next, previous } = useArcaneFlow(classificationConfig);
  return (
    <div className="md:container px-6 md:px-0 h-screen">
      <Survey prev={previous} next={next} />
    </div>
  );
};

// Classification.getLayout = (page: ReactElement) => {
//   return <PrivateLayout>{page}</PrivateLayout>;
// };

export default Classification;
