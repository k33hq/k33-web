import * as React from 'react';
import { MainHeaderProps } from './Header.js';

interface MainLayoutProps extends MainHeaderProps {
    children: React.ReactNode;
}
declare const MainLayout: React.FC<MainLayoutProps>;

export { MainLayout };
