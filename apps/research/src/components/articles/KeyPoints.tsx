import * as React from 'react';
import { Dot } from 'ui';

interface KeyPointsProps {
  points: ReadonlyArray<string> | null;
}

const KeyPoints: React.FC<KeyPointsProps> = ({ points }) => {
  if (!points) return <></>;
  return (
    <div className="flex flex-wrap gap-6">
      <div className="flex-grow basis-28">
        <p className="text-body1 text-label-light-primary">Insights</p>
      </div>
      <div className="flex flex-col basis-0 grow-[999]">
        {points.map((point) => (
          <div className="flex flex-row gap-4 items-center" key={point.trim()}>
            <Dot />
            <p className="text-body2 text-label-light-secondary">{point}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyPoints;
