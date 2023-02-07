import * as React from 'react';

// declare module '*.svg' {
//   const content: any;
//   export default content;
// }

type Direction = 'right' | 'left';
type Variants = 'primary' | 'secondary';

interface BasicCardsProps {
    logo: React.ReactNode;
    title: string;
    description: string;
    variant?: Variants;
}
declare const BasicCards: React.FC<BasicCardsProps>;

export { BasicCards as B, Direction as D };
