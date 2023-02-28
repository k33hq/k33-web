import * as React from 'react';

interface PersonalFormProps {
  onPositive: () => void;
}

const CompanyForm: React.FC<PersonalFormProps> = ({ onPositive }) => {
  return <div>Company Form</div>;
};

export default CompanyForm;
