import * as React from 'react';
import { Dot } from 'ui';
import { QuestionContent } from './Survey';
import SurveyButton from './SurveyButton';

interface QuestionProp {
  question: QuestionContent | undefined;

  onPositive: () => void;
  onNegative: () => void;
}

// TODO: refactor these buttons and put them in ui package
const Question: React.FC<QuestionProp> = ({
  question,
  onPositive,
  onNegative,
}) => {
  if (!question) return <></>;
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h5 className="text-heading8 text-label-light-primary">
          {question.title}
        </h5>
        <div className="text-body3 text-label-light-secondary flex flex-col gap-2">
          {question.description.map((d) => (
            <div className="flex flex-row gap-2 items-center" key={d}>
              <Dot />
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:gap-2 w-20">
        <SurveyButton letter="A" label="Yes" onClick={onPositive} />
        <SurveyButton letter="B" label="No" onClick={onNegative} />
      </div>
    </div>
  );
};

export default Question;
