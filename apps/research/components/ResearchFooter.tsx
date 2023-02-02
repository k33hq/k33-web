'use client';
import * as React from 'react';
import SecondaryFooter, { SecondaryFooterProps } from './SecondaryFooter';
import Image from 'next/image';
import logo from '../assets/logo.svg';
import Dot from './Dot';

interface ResearchFooterProps extends SecondaryFooterProps {}

const ResearchFooter: React.FC<ResearchFooterProps> = ({ categories }) => {
  return (
    <>
      <SecondaryFooter categories={categories} />
      <div id="k33-footer" className="bg-bg-light-tertiary flex flex-col py-6">
        <div
          id="k33-footer-main-content"
          className="flex flex-row md:container pt-8 items-center justify-between"
        >
          <Image src={logo} width={90} height={24} alt="logo" />
          <div id="k33-footer links"></div>
        </div>
        <div
          id="footer-end"
          className="flex flex-row items-center justify-center gap-2"
        >
          <p className="text-small text-label-light-tertiary">
            © All rights reserved to K33
          </p>
          <Dot />
          <p className="text-small text-label-light-tertiary">Made with</p>
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

          <p className="text-small text-label-light-tertiary">
            in Oslo, Norway
          </p>
        </div>
      </div>
    </>
  );
};

export default ResearchFooter;
