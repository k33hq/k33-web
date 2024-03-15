import React from 'react';
import CircleCheckIcon from '../../assets/circle-check-icon.png';
import XMarkIcon from '../../assets/x-mark-icon.png';
import Image from 'next/image';

interface InfoAlertProps {
  show: boolean;
  hide: () => void;
  alertText: string;
  className: string;
}

const InfoAlert: React.FC<InfoAlertProps> = ({
  show,
  hide,
  alertText,
  className,
}) => {
  return (
    <div
      className={`${className} rounded-md bg-bg-light-secondary p-4 ${show ? '' : 'hidden'}`}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Image
            className="h-5 w-5"
            aria-hidden="true"
            src={CircleCheckIcon}
            alt={'check'}
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-label-light-secondary">
            {alertText}
          </p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className="inline-flex rounded-md p-1.5 hover:bg-bg-light-tertiary focus:outline-none focus:ring-2 focus:ring-brand-light-tertiary focus:ring-offset-2"
              onClick={hide}
            >
              <span className="sr-only">Dismiss</span>
              <Image
                className="h-5 w-5"
                aria-hidden="true"
                src={XMarkIcon}
                alt={'Dismiss'}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoAlert;
