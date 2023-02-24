import * as React from 'react';
import { Footer, FooterLink, Stack } from 'ui';
import { apps, company, social } from './AuthHeader';
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
      <div className="flex flex-col gap-4">
        <p className="text-body1 text-label-light-primary">Connect</p>
        {social.map((link) => (
          <FooterLink
            name={link.name}
            url={link.url}
            key={link.key}
            active={router.pathname.includes(link.key)}
          />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-body1 text-label-light-primary">Company</p>
        {company.map((link) => (
          <FooterLink
            name={link.name}
            url={link.url}
            key={link.key}
            active={router.pathname.includes(link.key)}
          />
        ))}
      </div>
    </Footer>
  );
};

export default PlatformFooter;
