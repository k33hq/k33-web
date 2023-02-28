import * as React from 'react';
import SurveyButton from './SurveyButton';

interface TermsProps {
  onPositive: () => void;
}

const Terms: React.FC<TermsProps> = ({ onPositive }) => {
  return (
    <div>
      Terms
      <SurveyButton
        label="I read and agree with K33 Terms and Conditions."
        letter="A"
        onClick={onPositive}
      />
    </div>
  );
};

export default Terms;
