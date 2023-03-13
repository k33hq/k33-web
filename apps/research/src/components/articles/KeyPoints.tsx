import * as React from 'react';
import { Dot } from 'ui';

interface KeyPointsProps {
  points: ReadonlyArray<string> | null;
}

const KeyPoints: React.FC<KeyPointsProps> = ({ points }) => {
  if (!points) return <></>;
  return (
    <div className="flex md:flex-wrap flex-col md:flex-row md:gap-6 gap-2 transition-all ease-in-out">
      <div className="md:flex-grow md:basis-28">
        <p className="text-body1 text-label-light-primary">Takeaways</p>
      </div>
      <div className="flex flex-col md:basis-0 md:grow-[999]">
        {points.map((point) => (
          <div
            className="flex flex-row md:gap-4 gap-2 md:items-center items-baseline"
            key={point.trim()}
          >
            <Dot />
            <p className="text-body2 text-label-light-primary">{point}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyPoints;
