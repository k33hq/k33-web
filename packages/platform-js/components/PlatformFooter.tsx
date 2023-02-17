import * as React from 'react';
import { Footer, Stack } from 'ui';
import { apps } from './AuthHeader';
import { useRouter } from 'next/router';

interface PlatformFooterProps {
  logo: React.ReactNode;
}

const PlatformFooter: React.FC<PlatformFooterProps> = ({ logo }) => {
  const router = useRouter();
  return (
    <Footer logo={logo}>
      <div className="flex flex-col gap-4">
        <p className="text-body1 text-label-light-primary">Products</p>
        {apps.map((app) => (
          <a
            key={app.key}
            href={app.url}
            className={`text-body4 ${
              router.pathname.includes(app.key)
                ? 'text-label-light-primary underline'
                : 'text-label-light-tertiary hover:text-label-light-primary'
            }`}
          >
            {app.name}
          </a>
        ))}
      </div>
    </Footer>
  );
};

export default PlatformFooter;
