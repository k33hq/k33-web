export { MainLayout } from './Layouts.js';
export { MainHeaderProps } from './Header.js';
export { Hero } from './Heros.js';
import { D as Direction } from './Cards-1b511bb9.js';
export { B as BasicCards } from './Cards-1b511bb9.js';
export { Dot, HorizontleDivider } from './Dividers.js';
import * as React from 'react';

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
