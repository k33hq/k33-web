import { isCookie, acceptCookie, denyCookie } from 'core';
import { useRouter } from 'next/router';
import * as React from 'react';
import { CookieModal } from 'ui';

const Cookie: React.FC = () => {
  const router = useRouter();
  const [showCookie, setCookie] = React.useState(false);
  React.useEffect(() => {
    if (!isCookie()) {
      setCookie(true);
    }
  }, [router]);

  return (
    <CookieModal
      acceptCookie={() => {
        setCookie(false);
        acceptCookie();
      }}
      open={showCookie}
      onClose={() => {
        denyCookie();
        setCookie(false);
      }}
    />
  );
};

export default Cookie;
