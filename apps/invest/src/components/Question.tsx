import { QuestionContent } from '@/pages/classification';
import * as React from 'react';

interface QuestionProp {
  question: QuestionContent;
}

const Question: React.FC<QuestionProp> = ({ question }) => {
  return (
    <div className="flex flex-col gap-4">
      <h5 className="md:text-heading5 text-heading8 text-label-light-primary">
        {question.title}
      </h5>
      <p className="md:text-heading8 text-body1 text-label-light-secondary">
        {question.description}
      </p>
    </div>
  );
};

export default Question;
