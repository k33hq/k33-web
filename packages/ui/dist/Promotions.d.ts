import * as React from 'react';
import { D as Direction } from './types.d-6b624513.js';

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
declare const BasicPromotion: React.FC<BasicPromotionProps>;

export { BasicPromotion };
