import * as React from 'react';
import { ListIcon } from './components';

interface BasicListProps {
  data: ReadonlyArray<string>;
}

export const BasicList: React.FC<BasicListProps> = ({ data }) => {
  return (
    <div className="ui-flex ui-flex-col ui-gap-3 md:ui-gap-4 ui-justify-center">
      {data.map((point) => (
        <div
          key={point}
          className="ui-flex ui-flex-row ui-items-center ui-gap-2"
        >
          <ListIcon />
          <p className="ui-text-body2 ui-text-label-light-secondary">{point}</p>
        </div>
      ))}
    </div>
  );
};
