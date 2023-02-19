import * as React from 'react';

interface FooterProps {
  logo: React.ReactNode;
  children: React.ReactNode;
}

export const Footer: React.FC<FooterProps> = ({ logo, children }) => {
  return (
    <div
      id="k33-footer"
      className="ui-bg-bg-light-tertiary ui-flex ui-flex-col ui-py-6"
    >
      <div
        id="k33-footer-main-content"
        className="ui-flex ui-flex-col md:px-0 md:ui-gap-0 md:ui-flex-row ui-gap-12 px-6 md:ui-container md:ui-pt-8 ui-pt-6 ui-items-center md:ui-items-start md:ui-justify-between"
      >
        {logo}
        <div id="k33-footer links">{children}</div>
      </div>
      <div
        id="footer-end"
        className="ui-flex md:ui-flex-row ui-flex-col ui-items-center ui-justify-center ui-gap-1 md:ui-gap-2 ui-pt-11"
      >
        <p className="ui-text-small ui-text-label-light-tertiary">
          © All rights reserved to K33
        </p>
        <div className="ui-h-1 ui-w-1 ui-rounded-full ui-bg-label-light-secondary ui-hidden md:ui-inline-block" />
        <div className="ui-flex ui-flex-row ui-gap-1 ui-items-center">
          <p className="ui-text-small ui-text-label-light-tertiary">
            Made with
          </p>
          <svg
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.4"
              d="M0 4.80706V4.62581C0 2.44143 1.57875 0.578306 3.73125 0.219556C5.12813 -0.0176314 6.60625 0.446743 7.625 1.46706L8 1.84143L8.34688 1.46706C9.39375 0.446743 10.8438 -0.0176314 12.2688 0.219556C14.4219 0.578306 16 2.44143 16 4.62581V4.80706C16 6.10393 15.4625 7.34456 14.5125 8.22893L8.86563 13.5008C8.63125 13.7196 8.32187 13.8414 8 13.8414C7.67812 13.8414 7.36875 13.7196 7.13438 13.5008L1.48719 8.22893C0.538437 7.34456 9.375e-06 6.10393 9.375e-06 4.80706H0Z"
              fill="#343A40"
              fillOpacity="0.3"
            />
          </svg>
          <p className="ui-text-small ui-text-label-light-tertiary">
            in Oslo, Norway
          </p>
        </div>
      </div>
    </div>
  );
};

interface FooterLinkProps {
  name: string;
  url: string;
  active?: boolean;
}

export const FooterLink: React.FC<FooterLinkProps> = ({
  url,
  name,
  active = false,
}) => {
  return (
    <a
      href={url}
      className={`ui-text-body4 ${
        active
          ? 'ui-text-label-light-primary ui-underline'
          : 'ui-text-label-light-tertiary hover:ui-text-label-light-primary'
      }`}
    >
      {name}
    </a>
  );
};
