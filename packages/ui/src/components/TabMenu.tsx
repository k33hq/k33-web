import * as React from 'react';
import { Tab } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface TabMenuProps {
  children: React.ReactNode;
}
export const TabMenu: React.FC<TabMenuProps> = ({ children }) => {
  return <Tab.Group>{children}</Tab.Group>;
};

interface TabItemProps {
  name: string;
}
export const TabItem: React.FC<TabItemProps> = ({ name }) => {
  return (
    <Tab
      className={({ selected }) =>
        classNames(
          selected
            ? 'ui-text-heading8 ui-text-label-light-primary ui-border-b-2'
            : 'ui-text-body3 ui-text-label-light-secondary'
        )
      }
    >
      {name}
    </Tab>
  );
};

interface TabPanelProps {
  children: React.ReactNode;
}

export const TabPanel: React.FC<TabPanelProps> = ({ children }) => {
  return <Tab.Panel>{children}</Tab.Panel>;
};

interface TabMenuProps {
  children: React.ReactNode;
}

export const TabMenuList: React.FC<TabMenuProps> = ({ children }) => {
  return (
    <Tab.List className="ui-border-b-[1px] ui-border-b-default-systemGrey-light-2">
      {children}
    </Tab.List>
  );
};

interface TabMenuPanelProps {
  children: React.ReactNode;
}

export const TabMenuPanel: React.FC<TabMenuPanelProps> = ({ children }) => {
  return <Tab.Panels className="md:ui-py-16">{children}</Tab.Panels>;
};
