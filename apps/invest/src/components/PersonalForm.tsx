import * as React from 'react';

interface PersonalFormProps {
  onPositive: () => void;
}

const PersonalForm: React.FC<PersonalFormProps> = ({ onPositive }) => {
  return <div>personal</div>;
};

export default PersonalForm;
