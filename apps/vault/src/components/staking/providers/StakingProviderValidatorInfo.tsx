import { StakingProviderValidator } from '@/types';
import Image from 'next/image';
import ExternalLinkIcon from '../../../assets/arrow-up-right-from-square-icon.svg';
import React from 'react';

interface StakingProviderValidatorInfoProps {
  provider: StakingProviderValidator;
}

const StakingProviderValidatorInfo: React.FC<
  StakingProviderValidatorInfoProps
> = ({ provider }) => {
  return (
    <div className="p-4 rounded-3xl bg-bg-light-secondary flex">
      <Image
        className="rounded-full border-4 border-bg-dark-primary border-opacity-20 basis-1/8"
        src={provider.iconUrl}
        alt={'Provider Icon'}
        width="64"
        height="64"
      />
      <div className="mx-4 text-[36px] text-brand-light-tertiary basis-5/12">
        {provider.providerName}
      </div>
      <div>
        <div>
          Provider Fee:{' '}
          <span className="font-semibold text-[24px] text-brand-light-tertiary">
            {provider.feePercent}
          </span>
          %
        </div>
        <div className="pt-1">
          <a
            className="underline flex"
            href={provider.termsOfServiceUrl}
            target="_blank"
            rel="noreferrer"
          >
            Terms of Service
            <Image
              className="ms-1"
              src={ExternalLinkIcon}
              alt={'External link'}
              width="14"
              height="14"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default StakingProviderValidatorInfo;
