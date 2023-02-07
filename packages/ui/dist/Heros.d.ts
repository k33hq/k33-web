import * as React from 'react';

interface HeroProps {
    title: string;
    subtitle: string;
    bigImage: React.ReactNode;
    children: React.ReactNode;
}
declare const Hero: React.FC<HeroProps>;

export { Hero };
