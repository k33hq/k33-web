import {
  BasicButton,
  Header,
  AppDrawer,
  AppMenuItem,
  AppItem,
  LoadingButton,
} from 'ui';
import * as React from 'react';
import { FirebaseOptions } from 'firebase/app';
import { AppStates, logout, register } from 'core';
import { useAppState } from '../hooks';
import { useRouter } from 'next/router';

interface AuthHeaderProps {
  logo: React.ReactNode;
  firebaseConfig: FirebaseOptions;
  authUrl: string;
  registrationUrl: string;
  transparent?: boolean;
}

const loginText: Record<AppStates, string> = {
  LOADING: 'Sign In',
  SIGNED_OUT: 'Sign In',
  UNREGISTERED: 'Register Now',
  REGISTERED: 'Sign Out',
};

interface LogoProps {
  active?: boolean;
}

export const PlatformLogo: React.FC<LogoProps> = ({ active }) => {
  return (
    <svg
      width="59"
      height="16"
      viewBox="0 0 59 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity={active ? '' : '0.1'}
        d="M19.5282 15.3199L7.74656 7.64457L19.1683 0.319946H14.4892L5.25105 6.42724C4.62718 6.83989 4.48321 7.17002 4.48321 7.62394C4.48321 8.03659 4.57919 8.36671 5.10708 8.71747L14.8731 15.3199H19.5282ZM3.54739 15.3199V0.319946H0.5V15.3199H3.54739Z"
        fill="#343A40"
      />
      <path
        opacity={active ? '' : '0.1'}
        d="M33.0375 15.3199C36.4448 15.3199 38.6524 13.5043 38.6524 10.7807C38.6524 9.02696 37.5006 7.83026 35.9169 7.39698C37.2127 7.04622 38.3165 6.09711 38.3165 4.1989C38.3165 1.64044 36.0849 0.319946 32.7016 0.319946H21.1599V2.91967H32.1017C34.1173 2.91967 35.2451 3.39422 35.2451 4.77662C35.2451 6.07648 34.4292 6.5923 32.7016 6.5923H25.2151V8.8H32.9175C34.6212 8.8 35.557 9.48088 35.557 10.7188C35.557 12.0187 34.2133 12.6996 32.2937 12.6996H21.0879V15.3199H33.0375Z"
        fill="#343A40"
      />
      <path
        opacity={active ? '' : '0.1'}
        d="M52.8851 15.3199C56.2924 15.3199 58.5 13.5043 58.5 10.7807C58.5 9.02696 57.3482 7.83026 55.7645 7.39698C57.0603 7.04622 58.1641 6.09711 58.1641 4.1989C58.1641 1.64044 55.9325 0.319946 52.5492 0.319946H41.0075V2.91967H51.9493C53.9649 2.91967 55.0927 3.39422 55.0927 4.77662C55.0927 6.07648 54.2768 6.5923 52.5492 6.5923H45.0627V8.8H52.7651C54.4688 8.8 55.4046 9.48088 55.4046 10.7188C55.4046 12.0187 54.0609 12.6996 52.1413 12.6996H40.9355V15.3199H52.8851Z"
        fill="#343A40"
      />
    </svg>
  );
};

export const ResearchLogo: React.FC<LogoProps> = ({ active }) => {
  return (
    <svg
      width="33"
      height="32"
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity={active ? '' : '0.2'}
        d="M24.5 0V6H30.5L24.5 0ZM23 32H10C5.86438 32 2.5 28.6375 2.5 24.5V7.5C2.5 6.675 3.17188 6 4 6C4.82812 6 5.5 6.675 5.5 7.5V24.5C5.5 26.9813 7.51875 29 10 29H23C23.8281 29 24.5 29.6719 24.5 30.5C24.5 31.3281 23.8312 32 23 32Z"
        fill="#343A40"
        fillOpacity="0.7"
      />
      <path
        opacity={active ? '0.4' : '0.1'}
        d="M8.5 23V3C8.5 1.34312 9.84375 0 11.5 0H24.5V6H30.5V23C30.5 24.6569 29.1569 26 27.5 26H11.5C9.84375 26 8.5 24.6562 8.5 23Z"
        fill="#343A40"
        fillOpacity="0.7"
      />
    </svg>
  );
};

export const InvestLogo: React.FC<LogoProps> = ({ active }) => {
  return (
    <svg
      width="33"
      height="32"
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1310_1631)">
        <path
          opacity={active ? '' : '0.2'}
          d="M32.0212 2.74446C32.7653 3.60737 32.6277 4.86672 31.7085 5.55704L21.7038 13.5052C21.0473 14.1305 20.0405 14.1492 19.3089 13.599L12.5432 8.52782L3.75096 15.5061C2.88805 16.2502 1.62871 16.1127 0.938568 15.1935C0.248179 14.3868 0.38812 13.13 1.25103 12.4359L11.2551 4.43276C11.968 3.86312 12.9747 3.84748 13.7063 4.39462L20.472 9.46576L29.2636 2.43182C30.1266 1.74149 31.3834 1.88156 32.0212 2.74446Z"
          fill="#343A40"
          fillOpacity="0.7"
        />
        <path
          opacity={active ? '0.4' : '0.1'}
          d="M14.5076 16.0002V28.0058C14.5076 29.1126 13.6135 30.0068 12.5067 30.0068C11.3999 30.0068 10.5057 29.1126 10.5057 28.0058V16.0002C10.5057 14.8934 11.3999 13.9992 12.5067 13.9992C13.6135 13.9992 14.5076 14.8934 14.5076 16.0002ZM6.50384 22.003V28.0058C6.50384 29.1126 5.6078 30.0068 4.5029 30.0068C3.398 30.0068 2.50195 29.1126 2.50195 28.0058V22.003C2.50195 20.8962 3.398 20.002 4.5029 20.002C5.6078 20.002 6.50384 20.8962 6.50384 22.003ZM18.5095 20.002C18.5095 18.8953 19.4037 18.0011 20.5105 18.0011C21.6172 18.0011 22.5114 18.8953 22.5114 20.002V28.0058C22.5114 29.1126 21.6172 30.0068 20.5105 30.0068C19.4037 30.0068 18.5095 29.1126 18.5095 28.0058V20.002ZM30.5152 16.0002V28.0058C30.5152 29.1126 29.621 30.0068 28.5142 30.0068C27.4075 30.0068 26.5133 29.1126 26.5133 28.0058V16.0002C26.5133 14.8934 27.4075 13.9992 28.5142 13.9992C29.621 13.9992 30.5152 14.8934 30.5152 16.0002Z"
          fill="#343A40"
          fillOpacity="0.7"
        />
      </g>
      <defs>
        <clipPath id="clip0_1310_1631">
          <rect
            width="32"
            height="32"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export const MarketsLogo: React.FC<LogoProps> = ({ active = false }) => {
  return (
    <svg
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1310_1676)">
        <path
          opacity={active ? '' : '0.2'}
          d="M2 11.64H25.175L21.5887 15.2263C20.8075 16.0075 20.8075 17.2731 21.5887 18.0544C21.975 18.4463 22.4875 18.64 23 18.64C23.5125 18.64 24.0237 18.4447 24.4137 18.0541L31.4137 11.0541C32.195 10.2728 32.195 9.0072 31.4137 8.22595L24.4137 1.22595C23.6325 0.444702 22.3669 0.444702 21.5856 1.22595C20.8044 2.0072 20.8044 3.27283 21.5856 4.05408L25.175 7.64001H2C0.894375 7.64001 0 8.53439 0 9.64001C0 10.7456 0.894375 11.64 2 11.64Z"
          fill="#343A40"
        />
        <path
          opacity={active ? '0.4' : '0.1'}
          d="M30.0005 21.64H6.83172L10.418 18.0538C11.1992 17.2725 11.1992 16.0069 10.418 15.2256C9.63671 14.4444 8.37109 14.4444 7.58984 15.2256L0.589844 22.2256C-0.191406 23.0069 -0.191406 24.2725 0.589844 25.0538L7.58984 32.0538C7.97547 32.4463 8.48797 32.64 9.00047 32.64C9.51297 32.64 10.0242 32.4447 10.4142 32.0541C11.1955 31.2728 11.1955 30.0072 10.4142 29.226L6.83172 25.64H30.0005C31.1061 25.64 32.0005 24.7456 32.0005 23.64C32.0005 22.5344 31.1067 21.64 30.0005 21.64Z"
          fill="#343A40"
        />
      </g>
      <defs>
        <clipPath id="clip0_1310_1676">
          <rect
            width="32"
            height="32"
            fill="white"
            transform="translate(0 0.640015)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export const VaultLogo: React.FC<LogoProps> = ({ active = false }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity={active ? '' : '0.2'}
        d="M10.6662 7.55528C10.6662 10.0108 8.67734 11.9997 6.22179 11.9997C3.76623 11.9997 1.77734 10.0108 1.77734 7.55528C1.77734 5.09973 3.76623 3.11084 6.22179 3.11084C8.67734 3.11084 10.6662 5.09973 10.6662 7.55528ZM6.22179 5.33306C4.99401 5.33306 3.99957 6.32751 3.99957 7.55528C3.99957 8.78306 4.99401 9.77751 6.22179 9.77751C7.44957 9.77751 8.44401 8.78306 8.44401 7.55528C8.44401 6.32751 7.44957 5.33306 6.22179 5.33306ZM14.2218 5.77751C14.2218 6.35806 13.8496 6.85251 13.3329 7.03584V10.222C13.3329 10.4664 13.1329 10.6664 12.8885 10.6664C12.644 10.6664 12.444 10.4664 12.444 10.222V7.03584C11.9273 6.85251 11.5551 6.35806 11.5551 5.77751C11.5551 5.0414 12.1523 4.44417 12.8885 4.44417C13.6246 4.44417 14.2218 5.0414 14.2218 5.77751Z"
        fill="#090A0B"
      />
      <path
        opacity={active ? '0.4' : '0.1'}
        d="M14.2222 0.888672C15.2028 0.888672 16 1.68451 16 2.66645V12.4442C16 13.4248 15.2028 14.222 14.2222 14.222H13.7778L13.3333 15.1109H11.5556L11.1111 14.222H4.88889L4.44444 15.1109H2.66667L2.22222 14.222H1.77778C0.795833 14.222 0 13.4248 0 12.4442V2.66645C0 1.68451 0.795833 0.888672 1.77778 0.888672H14.2222ZM6.22222 3.11089C3.76667 3.11089 1.77778 5.09978 1.77778 7.55534C1.77778 10.0109 3.76667 11.9998 6.22222 11.9998C8.67778 11.9998 10.6667 10.0109 10.6667 7.55534C10.6667 5.09978 8.67778 3.11089 6.22222 3.11089ZM13.3333 7.03589C13.85 6.85256 14.2222 6.35812 14.2222 5.77756C14.2222 5.04145 13.625 4.44423 12.8889 4.44423C12.1528 4.44423 11.5556 5.04145 11.5556 5.77756C11.5556 6.35812 11.9278 6.85256 12.4444 7.03589V10.222C12.4444 10.4664 12.6444 10.6664 12.8889 10.6664C13.1333 10.6664 13.3333 10.4664 13.3333 10.222V7.03589Z"
        fill="#090A0B"
      />
    </svg>
  );
};

export const LoansLogo: React.FC<LogoProps> = ({ active = false }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_413_1195)">
        <path
          opacity={active ? '' : '0.2'}
          d="M7.76025 5.74951C7.5491 5.71895 7.27127 5.61893 7.02678 5.53003L6.89064 5.4828C6.54335 5.33554 6.16272 5.54114 6.04047 5.86343C5.91823 6.18571 6.0994 6.59135 6.44583 6.7147L6.57516 6.76071C6.81093 6.84576 7.07192 6.93005 7.33614 6.99165V7.33316C7.33614 7.70129 7.63426 7.99996 8.00238 7.99996C8.37051 7.99996 8.66918 7.70129 8.66918 7.33316V7.04421C9.37126 6.88521 9.86052 6.43715 9.94999 5.77396C10.1914 4.38341 8.8695 4.00528 8.16019 3.80274L8.01308 3.7519C7.28238 3.54464 7.32406 3.45518 7.3435 3.34099C7.37562 3.15301 7.76859 3.06149 8.2384 3.13564C8.3756 3.15735 8.5543 3.20641 8.78434 3.28628C9.13247 3.40522 9.51254 3.22205 9.63229 2.87398C9.75203 2.52591 9.56813 2.14634 9.21998 2.02576C9.00877 1.95277 8.83324 1.90468 8.66932 1.86681V1.55425C8.66932 1.18612 8.37065 0.887451 8.00252 0.887451C7.63439 0.887451 7.33628 1.18612 7.33628 1.55425V1.84653C6.63503 2.00517 6.14327 2.45026 6.00435 3.11372C5.79042 4.48816 7.13235 4.88268 7.63801 5.03271L7.81854 5.0848C8.69816 5.33657 8.68399 5.41514 8.66148 5.54711C8.62987 5.73562 8.23812 5.82731 7.76025 5.74951Z"
          fill="#090A0B"
        />
        <path
          opacity={active ? '0.4' : '0.1'}
          d="M15.7864 10.2309C15.4219 9.73607 14.7268 9.62911 14.2325 9.9956L10.9069 12.4452H7.5562C7.31315 12.4452 7.13668 12.2438 7.13668 12.001C7.13668 11.7579 7.3381 11.5565 7.5562 11.5565H9.73024C10.1498 11.5565 10.5846 11.2542 10.6574 10.8169C10.7477 10.2612 10.3206 9.77833 9.77886 9.77833H5.30937C4.58423 9.77833 3.83353 10.0353 3.25008 10.5076L1.95816 11.5562L0.419527 11.5311C0.201456 11.5311 0 11.759 0 12.0007V14.6673C0 14.9124 0.201456 15.1124 0.419527 15.1124H10.0353C10.6474 15.1124 11.2555 14.9127 11.7495 14.5492L15.503 11.7843C16.0448 11.42 16.1504 10.7254 15.7864 10.2309Z"
          fill="#090A0B"
        />
      </g>
      <defs>
        <clipPath id="clip0_413_1195">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const apps = [
  {
    name: 'Research',
    url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/home`,
    Logo: ResearchLogo,
    key: 'research',
  },
  {
    name: 'Investments',
    url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/apps/invest`,
    Logo: InvestLogo,
    key: 'invest',
  },
  {
    name: 'Markets',
    url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/markets`,
    Logo: MarketsLogo,
    key: 'markets',
  },
  {
    name: 'Vault',
    url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/apps/vault`,
    Logo: VaultLogo,
    key: 'vault',
  },
  {
    name: 'Loans',
    url: `https://loans.k33.com/`,
    Logo: LoansLogo,
    key: 'loans',
  },
];

export const company = [
  {
    name: 'About',
    url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/about`,
    key: 'about',
  },
  {
    name: 'T&C',
    url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/terms-and-conditions`,
    key: 'terms-and-conditions',
  },
  {
    name: 'Privacy',
    url: `https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/privacy`,
    key: 'privacy',
  },
];

export const social = [
  {
    name: 'Twitter',
    url: 'https://twitter.com/K33HQ?ref_src=twsrc%5Etfw',
    key: 'twitter',
  },
  {
    name: 'Email',
    url: 'mailto:contact@k33.com',
    key: 'email',
  },
];

const AuthHeader: React.FC<AuthHeaderProps> = ({
  logo,
  firebaseConfig,
  authUrl,
  registrationUrl,
  transparent = false,
}) => {
  const state = useAppState(firebaseConfig);
  const router = useRouter();

  const isHome =
    !router.basePath.includes('research') &&
    !router.basePath.includes('apps/invest') &&
    !router.basePath.includes('apps/vault');

  React.useEffect(() => {
    if (state === 'UNREGISTERED') {
      register().then((state) => router.reload());
    }
  }, [router, state]);

  return (
    <Header logo={logo} transparent={transparent}>
      <AppDrawer>
        <AppMenuItem>
          {(active) => (
            <AppItem
              active={active || isHome}
              name="Home"
              url={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}`}
            >
              <PlatformLogo active={active || isHome} />
            </AppItem>
          )}
        </AppMenuItem>
        {apps.map(({ key, Logo, name, url }) => (
          <AppMenuItem key={key}>
            {(active) => (
              <AppItem
                active={active || router.basePath.includes(key)}
                name={name}
                url={url}
              >
                <Logo active={active || router.basePath.includes(key)} />
              </AppItem>
            )}
          </AppMenuItem>
        ))}
      </AppDrawer>
      {state === 'LOADING' ? (
        <LoadingButton />
      ) : (
        <BasicButton
          variant="secondary"
          size="medium"
          onClick={() => {
            switch (state) {
              case 'SIGNED_OUT':
                if (authUrl.includes('https://')) {
                  window.location.href = authUrl;
                } else {
                  router.push('/services/auth');
                }
                break;
              case 'UNREGISTERED':
                register().then((state) => router.reload());
                break;
              case 'REGISTERED':
                logout(
                  () => {
                    router.reload();
                  },
                  (err) => console.log(err)
                );
                break;
              default:
                router.push('/services/auth');
                break;
            }
          }}
        >
          {loginText[state]}
        </BasicButton>
      )}
    </Header>
  );
};

export default AuthHeader;
