import * as React from 'react';
import { Size } from './types';
import { BasicButton } from './Buttons';
import { Toggle } from './Inputs';
import { Dialog, Transition } from '@headlessui/react';

interface ModalProps {
  children: React.ReactNode;
  backdrop?: boolean;
  size?: Size;
  open: boolean;
  onClose: () => void;
}

const modal: Record<Size, string> = {
  large:
    'md:ui-w-[920px] md:ui-rounded-[96px] md:ui-max-h-[600px] md:ui-px-20 md:ui-py-20',
  small: '',
  medium:
    'md:ui-w-[482px] md:ui-rounded-xl md:ui-min-h-[288px] md:ui-max-h-[328px] ui-m-auto md:ui-py-8 md:ui-px-11',
};

export const Modal: React.FC<ModalProps> = ({
  children,
  backdrop = true,
  size = 'large',
  open,
}) => {
  return (
    <Transition appear show={open} as={React.Fragment}>
      <Dialog as="div" className={`ui-relative ui-z-10`} onClose={() => {}}>
        <Transition.Child
          as={React.Fragment}
          enter="ui-ease-out ui-duration-300"
          enterFrom="ui-opacity-0"
          enterTo="ui-opacity-100"
          leave="ui-ease-in ui-duration-200"
          leaveFrom="ui-opacity-100"
          leaveTo="ui-opacity-0"
        >
          <div className="ui-fixed ui-inset-0 ui-backdrop-blur-sm ui-bg-brand-light-primary/50" />
        </Transition.Child>

        <div className="ui-fixed ui-inset-0 ui-overflow-y-auto ">
          <div className="ui-flex ui-min-h-full ui-items-center ui-justify-center ui-p-4 ui-text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ui-ease-out ui-duration-300"
              enterFrom="ui-opacity-0 ui-scale-95"
              enterTo="ui-opacity-100 ui-scale-100"
              leave="ui-ease-in ui-duration-200"
              leaveFrom="ui-opacity-100 ui-scale-100"
              leaveTo="ui-opacity-0 ui-scale-95"
            >
              <Dialog.Panel
                className={`${modal[size]} ui-transform ui-overflow-hidden ui-rounded-xl ui-bg-bg-light-primary ui-p-6 ui-text-left ui-align-middle ui-shadow-xl ui-transition-all`}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
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

{
  /* <div
id="k33-modal"
tabIndex={-1}
aria-hidden="true"
className={`ui-fixed ui-top-0 ui-left-0 ui-right-0 ui-w-full ui-h-full flex h-screen ${
  backdrop
    ? 'ui-backdrop-blur-sm ui-bg-brand-light-primary/50'
    : 'ui-backdrop-blur-0 ui-bg-brand-light-primary/30'
}`}
>
<div
  className={`ui-bg-brand-dark-primary md:ui-m-auto ui-w-full ui-rounded-t-md ui-mt-auto ui-h-1/2 ${modal[size]}`}
>
  {children}
</div>
</div> */
}

interface CookieModalProps {
  acceptCookie: () => void;
  open: boolean;
  onClose: () => void;
}

export const CookieModal: React.FC<CookieModalProps> = ({
  acceptCookie,
  open,
  onClose,
}) => {
  const [showManageCookies, setManageCookies] = React.useState(false);
  const [enabled, setEnabled] = React.useState(true);

  const toggleManageCookies = () => {
    setManageCookies((state) => !state);
  };

  return (
    <Transition appear show={open} as={React.Fragment}>
      <Dialog as="div" className="ui-relative ui-z-10" onClose={() => {}}>
        <Transition.Child
          as={React.Fragment}
          enter="ui-ease-out ui-duration-300"
          enterFrom="ui-opacity-0"
          enterTo="ui-opacity-100"
          leave="ui-ease-in ui-duration-200"
          leaveFrom="ui-opacity-100"
          leaveTo="ui-opacity-0"
        >
          <div className="ui-fixed ui-inset-0 ui-bg-black ui-bg-opacity-25" />
        </Transition.Child>

        <div className="ui-fixed ui-inset-0 ui-overflow-y-auto">
          <div className="ui-flex ui-min-h-full ui-items-center ui-justify-center ui-p-4 ui-text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ui-ease-out ui-duration-300"
              enterFrom="ui-opacity-0 ui-scale-95"
              enterTo="ui-opacity-100 ui-scale-100"
              leave="ui-ease-in ui-duration-200"
              leaveFrom="ui-opacity-100 ui-scale-100"
              leaveTo="ui-opacity-0 ui-scale-95"
            >
              <Dialog.Panel className="ui-w-full ui-max-w-md ui-transform ui-overflow-hidden ui-rounded-xl ui-bg-bg-light-primary ui-p-6 ui-text-left ui-align-middle ui-shadow-xl ui-transition-all">
                <Dialog.Title
                  as="h3"
                  className="ui-flex ui-flex-row ui-gap-4 ui-items-center"
                >
                  {showManageCookies ? (
                    <BasicButton size="small" variant="tertiary">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_3640_5358)">
                          <path
                            d="M13.7417 29.742C13.1556 29.742 12.5693 29.5184 12.1227 29.071L0.670998 17.6193C-0.223666 16.7247 -0.223666 15.2753 0.670998 14.3806L12.1227 2.92893C13.0174 2.03427 14.4667 2.03427 15.3614 2.92893C16.2561 3.8236 16.2561 5.27295 15.3614 6.16762L5.52867 16L15.3628 25.8341C16.2575 26.7288 16.2575 28.1782 15.3628 29.0728C14.9155 29.5202 14.3286 29.742 13.7417 29.742Z"
                            fill="#090A0B"
                          />
                          <path
                            opacity="0.4"
                            d="M32.001 15.9999C32.001 17.2668 31.0419 18.2903 29.775 18.2903H7.82354L5.5332 15.9999L7.82354 13.7096H29.775C31.0419 13.7096 32.001 14.7331 32.001 15.9999Z"
                            fill="#090A0B"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_3640_5358">
                            <rect width="32" height="32" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </BasicButton>
                  ) : (
                    <div className="ui-h-6 ui-w-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 32 32"
                      >
                        <g fill="#090A0B" clipPath="url(#a)">
                          <path d="M10.67 19.14c-1.18 0-2.14.96-2.14 2.07 0 1.12.96 2.08 2.14 2.08 1.17 0 2.13-.96 2.13-2.08 0-1.11-.96-2.07-2.13-2.07Zm2.13-10.6c-1.18 0-2.13.95-2.13 2.07 0 1.11.95 2.07 2.13 2.07 1.17 0 2.13-.96 2.13-2.07 0-1.12-.96-2.08-2.13-2.08ZM23.47 17c-1.18 0-2.14.96-2.14 2.07 0 1.12.96 2.07 2.14 2.07 1.17 0 2.13-.95 2.13-2.07 0-1.11-.96-2.07-2.13-2.07Z" />
                          <path
                            d="M31.9 16A8 8 0 0 1 24 8a7.99 7.99 0 0 1-8-7.9 8.2 8.2 0 0 0-4.98.8L6.7 3.1a8.33 8.33 0 0 0-3.6 3.6L.92 11a8.29 8.29 0 0 0-.8 5.07l.75 4.76a8.27 8.27 0 0 0 2.32 4.56l3.42 3.42a8.2 8.2 0 0 0 4.55 2.32l4.79.76a8.26 8.26 0 0 0 5.03-.8l4.33-2.2a8.22 8.22 0 0 0 3.6-3.61l2.2-4.3a8.25 8.25 0 0 0 .8-5Zm-21.23 7.4a2.13 2.13 0 0 1-2.14-2.07c0-1.11.96-2.07 2.14-2.07 1.17 0 2.13.96 2.13 2.07 0 1.12-.96 2.08-2.13 2.08Zm2.13-10.6a2.13 2.13 0 0 1-2.13-2.07c0-1.12.95-2.08 2.13-2.08 1.17 0 2.13.96 2.13 2.08 0 1.11-.96 2.07-2.13 2.07Zm10.67 8.47a2.13 2.13 0 0 1-2.14-2.07c0-1.11.96-2.07 2.14-2.07 1.17 0 2.13.96 2.13 2.07 0 1.12-.96 2.07-2.13 2.07Z"
                            opacity=".4"
                          />
                        </g>
                        <defs>
                          <clipPath id="a">
                            <path fill="#fff" d="M0 0h32v32H0z" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  )}

                  <p className="ui-text-heading7 ui-text-label-light-primary">
                    Cookie Settings
                  </p>
                </Dialog.Title>
                <div className="ui-mt-2">
                  {showManageCookies ? (
                    <div className="ui-flex ui-flex-col ui-gap-6">
                      <div className="ui-flex ui-flex-row">
                        <div className="ui-flex ui-flex-col">
                          <p className="ui-text-body1 ui-text-label-light-secondary">
                            Strictly Necessary
                          </p>
                          <p className="ui-text-body4 ui-text-label-light-secondary">
                            These cookies are necessary for our platform to
                            function properly and can’r be disabled.
                          </p>
                        </div>
                        <Toggle disabled />
                      </div>
                      <div className="ui-flex ui-flex-row">
                        <div className="ui-flex ui-flex-col">
                          <p className="ui-text-body1 ui-text-label-light-secondary">
                            Product Development
                          </p>
                          <p className="ui-text-body4 ui-text-label-light-secondary">
                            These cookies help us to understand the use of our
                            platform helping us making it better.
                          </p>
                        </div>
                        <Toggle
                          enabled={enabled}
                          setEnabled={() => setEnabled((state) => !state)}
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="ui-text-body1 ui-text-label-light-secondary ui-flex-1">
                      We use cookies in order to give you the best experience
                      possible while using our platform. Some of them are
                      essential, others are optional. We won’t turn them on
                      unless you accept.
                    </p>
                  )}
                </div>

                <div className="ui-flex ui-flex-row ui-justify-between ui-items-center ui-pt-4">
                  {showManageCookies ? (
                    <BasicButton
                      size="small"
                      variant="tertiary"
                      onClick={onClose}
                    >
                      Cancel
                    </BasicButton>
                  ) : (
                    <BasicButton
                      size="small"
                      variant="tertiary"
                      onClick={toggleManageCookies}
                    >
                      Manage Cookies
                    </BasicButton>
                  )}

                  <BasicButton size="medium" onClick={acceptCookie}>
                    Allow Cookies
                  </BasicButton>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
