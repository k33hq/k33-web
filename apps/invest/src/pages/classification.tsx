import { Survey } from '@/components';
import { classificationConfig } from '@/config';
import { Answers, Questions } from '@/config/classification';
import { useArcaneFlow } from '@/hooks';
import ArcaneFlow from 'flow';
import { NextPage } from 'next';

/**
 * user-state: [registered]
 * @returns
 */
const Classification: NextPage = () => {
  // const { next, previous } = ArcaneFlow<Questions, Answers>(
  //   classificationConfig
  // );

  const { next, previous } = useArcaneFlow(classificationConfig);

  return (
    <div className="md:container px-6 md:px-0 md:h-screen md:w-full md:p-20 md:gap-10">
      <Survey next={next} />
    </div>
  );
};

export default Classification;
