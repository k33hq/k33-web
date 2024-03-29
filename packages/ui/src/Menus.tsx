import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useRef, useState } from 'react';

interface AppDrawerProps {
  children: React.ReactNode;
}

export const AppDrawer: React.FC<AppDrawerProps> = ({ children }) => {
  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button
            className={`ui-rounded-full hover:ui-bg-default-systemGrey-light-5 active:ui-bg-default-systemGrey-light-5 ui-w-10 ui-h-10 ui-inline-flex ui-justify-center ui-content-center ui-items-center ${
              open ? 'ui-bg-default-systemGrey-light-5' : ''
            }`}
          >
            <AppDrawerIcon />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="ui-transition ui-ease-out ui-duration-100"
            enterFrom="ui-transform ui-opacity-0 ui-scale-95"
            enterTo="ui-transform ui-opacity-100 ui-scale-100"
            leave="ui-transition ui-ease-in ui-duration-75"
            leaveFrom="ui-transform ui-opacity-100 ui-scale-100"
            leaveTo="ui-transform ui-opacity-0 ui-scale-95"
          >
            <Menu.Items className="ui-absolute -ui-top-56 ui-translate-y-full -ui-translate-x-40 ui-w-[203px] ui-h-[288px] ui-bg-bg-light-primary ui-z-20 ui-rounded-lg ui-shadow-2xl md:ui-px-4 md:ui-py-4 ui-origin-bottom-left ui-flex ui-flex-row ui-flex-wrap ui-ring-1 ui-ring-brand-light-tertiary/10">
              {children}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

interface AppMenuItemProps {
  children: (active: boolean) => React.ReactNode;
}

export const AppMenuItem: React.FC<AppMenuItemProps> = ({ children }) => {
  return (
    <Menu.Item
      as="div"
      className="ui-w-1/2 ui-h-1/3 ui-flex ui-flex-col ui-items-center ui-content-center ui-justify-center"
    >
      {({ active }) => <>{children(active)}</>}
    </Menu.Item>
  );
};

interface AppItemProps {
  active: boolean;
  name: string;
  url: string;
  children: React.ReactNode;
}

export const AppItem: React.FC<AppItemProps> = ({
  active,
  url,
  name,
  children,
}) => {
  return (
    <a
      href={url}
      className="ui-flex ui-flex-col ui-items-center ui-gap-2 ui-cursor-pointer ui-w-[74px] ui-h-[72px] ui-px-2 ui-py-2 ui-content-end ui-justify-end"
    >
      {children}
      <button
        className={`ui-text-caption ${
          active
            ? 'ui-text-label-light-primary'
            : 'ui-text-label-light-tertiary'
        }`}
      >
        {name}
      </button>
    </a>
  );
};

export const AppDrawerIcon: React.FC = () => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.009 9.49893C10.3379 9.27916 10.7246 9.16187 11.1201 9.16187C11.6506 9.16187 12.1593 9.37258 12.5343 9.74765C12.9094 10.1227 13.1201 10.6314 13.1201 11.1619C13.1201 11.5574 13.0028 11.9441 12.7831 12.273C12.5633 12.6019 12.2509 12.8582 11.8855 13.0096C11.52 13.161 11.1179 13.2006 10.7299 13.1234C10.342 13.0463 9.98561 12.8558 9.7059 12.5761C9.4262 12.2964 9.23572 11.94 9.15855 11.552C9.08138 11.1641 9.12098 10.762 9.27236 10.3965C9.42373 10.031 9.68008 9.71869 10.009 9.49893Z"
        fill="#8E8E93"
        stroke="#8E8E93"
      />
      <path
        d="M10.009 1.49893C10.3379 1.27916 10.7246 1.16187 11.1201 1.16187C11.6506 1.16187 12.1593 1.37258 12.5343 1.74765C12.9094 2.12272 13.1201 2.63143 13.1201 3.16186C13.1201 3.55743 13.0028 3.94411 12.7831 4.27301C12.5633 4.6019 12.2509 4.85825 11.8855 5.00962C11.52 5.161 11.1179 5.20061 10.7299 5.12344C10.342 5.04627 9.98561 4.85578 9.7059 4.57608C9.4262 4.29637 9.23572 3.94001 9.15855 3.55205C9.08138 3.16408 9.12098 2.76195 9.27236 2.3965C9.42373 2.03105 9.68008 1.71869 10.009 1.49893Z"
        fill="#8E8E93"
        stroke="#8E8E93"
      />
      <path
        d="M10.009 17.4989C10.3379 17.2792 10.7246 17.1619 11.1201 17.1619C11.6506 17.1619 12.1593 17.3726 12.5343 17.7477C12.9094 18.1227 13.1201 18.6314 13.1201 19.1619C13.1201 19.5574 13.0028 19.9441 12.7831 20.273C12.5633 20.6019 12.2509 20.8582 11.8855 21.0096C11.52 21.161 11.1179 21.2006 10.7299 21.1234C10.342 21.0463 9.98561 20.8558 9.7059 20.5761C9.4262 20.2964 9.23572 19.94 9.15855 19.552C9.08138 19.1641 9.12098 18.762 9.27236 18.3965C9.42373 18.031 9.68008 17.7187 10.009 17.4989Z"
        fill="#8E8E93"
        stroke="#8E8E93"
      />
      <path
        d="M18.009 9.49893C18.3379 9.27916 18.7246 9.16187 19.1201 9.16187C19.6506 9.16187 20.1593 9.37258 20.5343 9.74765C20.9094 10.1227 21.1201 10.6314 21.1201 11.1619C21.1201 11.5574 21.0028 11.9441 20.7831 12.273C20.5633 12.6019 20.2509 12.8582 19.8855 13.0096C19.52 13.161 19.1179 13.2006 18.7299 13.1234C18.342 13.0463 17.9856 12.8558 17.7059 12.5761C17.4262 12.2964 17.2357 11.94 17.1585 11.552C17.0814 11.1641 17.121 10.762 17.2724 10.3965C17.4237 10.031 17.6801 9.71869 18.009 9.49893Z"
        fill="#8E8E93"
        stroke="#8E8E93"
      />
      <path
        d="M18.009 1.49868C18.3379 1.27892 18.7246 1.16162 19.1201 1.16162C19.6506 1.16162 20.1593 1.37233 20.5343 1.74741C20.9094 2.12248 21.1201 2.63119 21.1201 3.16162C21.1201 3.55718 21.0028 3.94386 20.7831 4.27276C20.5633 4.60166 20.2509 4.858 19.8855 5.00938C19.52 5.16075 19.1179 5.20036 18.7299 5.12319C18.342 5.04602 17.9856 4.85554 17.7059 4.57583C17.4262 4.29613 17.2357 3.93976 17.1585 3.5518C17.0814 3.16384 17.121 2.76171 17.2724 2.39625C17.4237 2.0308 17.6801 1.71844 18.009 1.49868Z"
        fill="#8E8E93"
        stroke="#8E8E93"
      />
      <path
        d="M18.009 17.4989C18.3379 17.2792 18.7246 17.1619 19.1201 17.1619C19.6506 17.1619 20.1593 17.3726 20.5343 17.7477C20.9094 18.1227 21.1201 18.6314 21.1201 19.1619C21.1201 19.5574 21.0028 19.9441 20.7831 20.273C20.5633 20.6019 20.2509 20.8582 19.8855 21.0096C19.52 21.161 19.1179 21.2006 18.7299 21.1234C18.342 21.0463 17.9856 20.8558 17.7059 20.5761C17.4262 20.2964 17.2357 19.94 17.1585 19.552C17.0814 19.1641 17.121 18.762 17.2724 18.3965C17.4237 18.031 17.6801 17.7187 18.009 17.4989Z"
        fill="#8E8E93"
        stroke="#8E8E93"
      />
      <path
        d="M2.00898 9.49893C2.33788 9.27916 2.72456 9.16187 3.12012 9.16187C3.65055 9.16187 4.15926 9.37258 4.53433 9.74765C4.9094 10.1227 5.12012 10.6314 5.12012 11.1619C5.12012 11.5574 5.00282 11.9441 4.78306 12.273C4.56329 12.6019 4.25094 12.8582 3.88548 13.0096C3.52003 13.161 3.1179 13.2006 2.72994 13.1234C2.34198 13.0463 1.98561 12.8558 1.7059 12.5761C1.4262 12.2964 1.23572 11.94 1.15855 11.552C1.08138 11.1641 1.12098 10.762 1.27236 10.3965C1.42373 10.031 1.68008 9.71869 2.00898 9.49893Z"
        fill="#8E8E93"
        stroke="#8E8E93"
      />
      <path
        d="M2.00898 1.49868C2.33788 1.27892 2.72456 1.16162 3.12012 1.16162C3.65055 1.16162 4.15926 1.37233 4.53433 1.74741C4.9094 2.12248 5.12012 2.63119 5.12012 3.16162C5.12012 3.55718 5.00282 3.94386 4.78306 4.27276C4.56329 4.60166 4.25094 4.858 3.88548 5.00938C3.52003 5.16075 3.1179 5.20036 2.72994 5.12319C2.34198 5.04602 1.98561 4.85554 1.7059 4.57583C1.4262 4.29613 1.23572 3.93976 1.15855 3.5518C1.08138 3.16384 1.12098 2.76171 1.27236 2.39625C1.42373 2.0308 1.68008 1.71844 2.00898 1.49868Z"
        fill="#8E8E93"
        stroke="#8E8E93"
      />
      <path
        d="M2.00898 17.4989C2.33788 17.2792 2.72456 17.1619 3.12012 17.1619C3.65055 17.1619 4.15926 17.3726 4.53433 17.7477C4.9094 18.1227 5.12012 18.6314 5.12012 19.1619C5.12012 19.5574 5.00282 19.9441 4.78306 20.273C4.56329 20.6019 4.25094 20.8582 3.88548 21.0096C3.52003 21.161 3.1179 21.2006 2.72994 21.1234C2.34198 21.0463 1.98561 20.8558 1.7059 20.5761C1.4262 20.2964 1.23572 19.94 1.15855 19.552C1.08138 19.1641 1.12098 18.762 1.27236 18.3965C1.42373 18.031 1.68008 17.7187 2.00898 17.4989Z"
        fill="#8E8E93"
        stroke="#8E8E93"
      />
    </svg>
  );
};
