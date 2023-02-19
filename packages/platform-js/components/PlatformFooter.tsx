import * as React from 'react';
import { Footer, FooterLink, Stack } from 'ui';
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
          <FooterLink
            name={app.name}
            url={app.url}
            key={app.key}
            active={router.basePath.includes(app.key)}
          />
        ))}
      </div>
    </Footer>
  );
};

export default PlatformFooter;
