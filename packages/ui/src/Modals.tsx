import * as React from 'react';

interface ModalProps {
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <div
      id="k33-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="ui-fixed ui-top-0 ui-left-0 ui-right-0 ui-w-full ui-h-full ui-backdrop-blur-sm ui-bg-brand-light-primary/50"
    >
      <div className="ui-bg-brand-dark-primary ui-mx-auto ui-absolute ui-bottom-0 md:ui-relative md:ui-top-20 ui-w-full md:ui-w-[920px] md:ui-px-20 ui-px-10 ui-py-10 md:ui-py-20 md:ui-rounded-[96px] ui-rounded-t-md ui-h-5/6 md:ui-max-h-[600px]">
        {children}
      </div>
    </div>
  );
};

interface PayWallProps extends ModalProps {}

export const PayWall: React.FC<PayWallProps> = ({ children }) => {
  return (
    <div
      id="k33-pay-wall"
      tabIndex={-1}
      className="ui-blur-md ui-select-none ui-pointer-events-none"
    >
      {children}
    </div>
  );
};