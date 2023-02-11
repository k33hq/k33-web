import * as React from 'react';

interface StackProps {
  children: React.ReactNode;
}
export const Stack: React.FC<StackProps> = ({ children }) => {
  return (
    <div
      id="stack-k33"
      className="ui-flex ui-flex-col ui-gap-2 ui-items-center ui-justify-center"
    >
      {children}
    </div>
  );
};
