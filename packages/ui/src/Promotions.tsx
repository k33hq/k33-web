import * as React from 'react';
import { Direction, Variants } from './types';
import { ListIcon } from './components';

interface BasicPromotionProps {
  title: string;
  description: string;
  points: ReadonlyArray<string>;
  callToAction: {
    url: string;
    label: string;
  };
  image: React.ReactNode;
  direction: Direction;
}

export const BasicPromotion: React.FC<BasicPromotionProps> = ({
  image,
  title,
  description,
  direction,
  points,
  callToAction,
}) => {
  return (
    <div className="ui-flex md:ui-flex-row ui-flex-col md:ui-gap-20 ui-gap-8 ui-items-center ui-justify-between">
      {direction === 'left' ? image : null}
      <div className="ui-flex ui-flex-col ui-gap-2 ui-items-center md:ui-items-start">
        <p className="ui-text-heading6 md:ui-text-heading4 ui-text-label-light-primary">
          {title}
        </p>
        <p className="ui-text-body3 md:ui-text-body1 ui-text-label-light-secondary">
          {description}
        </p>
        <div className="ui-flex ui-flex-col ui-gap-3 ui-pt-3 md:ui-gap-9 md:ui-pt-7 ui-justify-center">
          {points.map((point) => (
            <div
              key={point}
              className="ui-flex ui-flex-row ui-items-center ui-gap-2"
            >
              <ListIcon />
              <p className="md:ui-text-heading8 ui-text-body3 ui-text-label-light-secondary">
                {point}
              </p>
            </div>
          ))}
        </div>
        <button className=""></button>
      </div>
      {direction === 'right' ? image : null}
    </div>
  );
};
