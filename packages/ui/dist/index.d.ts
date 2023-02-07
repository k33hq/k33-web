export { MainLayout } from './Layouts.js';
export { MainHeaderProps } from './Header.js';
import * as React from 'react';

interface HeroProps {
    title: string;
    subtitle: string;
    bigImage: React.ReactNode;
    children: React.ReactNode;
}
declare const Hero: React.FC<HeroProps>;

interface BasicCardsProps {
    logo: React.ReactNode;
    title: string;
    description: string;
}
declare const BasicCards: React.FC<BasicCardsProps>;

declare const HorizontleDivider: React.FC;

export { BasicCards, Hero, HorizontleDivider };
