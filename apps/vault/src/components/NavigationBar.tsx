import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const tabs = [
  { name: 'Home', href: '/' },
  { name: 'Staking', href: '/staking' },
  { name: 'Staking positions', href: '/staking/positions' },
  { name: 'Staking providers', href: '/staking/providers' },
  { name: 'Transactions', href: '/transactions' },
  { name: 'Settings', href: '/settings' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const NavigationBar: React.FC = () => {
  const router = useRouter();
  const currentTab = tabs.find((tab) => tab.href === router.pathname);
  const tabName = currentTab ? currentTab.name : undefined;
  return (
    <div>
      <div className="border-b border-gray-200">
        <nav aria-label="Tabs" className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              aria-current={tab.name == tabName ? 'page' : undefined}
              className={classNames(
                tab.name == tabName
                  ? 'text-label-dark-primary border-b-2 border-brand-light-primary'
                  : 'text-label-dark-secondary',
                'whitespace-nowrap h-10 p-2 text-sm font-medium'
              )}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default NavigationBar;
