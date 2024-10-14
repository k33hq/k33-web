import { StakingProvider } from '@/types';
import Image from 'next/image';
import ExternalLinkIcon from '../../../assets/arrow-up-right-from-square-icon.svg';
import React from 'react';
import Link from 'next/link';
import { CryptoId } from '@/components';

interface StakingProviderInfoProps {
  stakingProvider: StakingProvider;
}

const StakingProviderInfo: React.FC<StakingProviderInfoProps> = ({
  stakingProvider,
}) => {
  return (
    <div className="mt-8">
      <div className="mx-0 sm:mx-4 px-4 sm:px-0">
        <div className="flex">
          <Link
            href={`/staking/providers?stakingProviderId=${stakingProvider.id}`}
          >
            <Image
              className="rounded-full border-4 border-bg-dark-primary border-opacity-20"
              src={stakingProvider.iconUrl}
              alt={'Provider Icon'}
              width="48"
              height="48"
            />
          </Link>
          <div className="ml-3">
            <Link
              href={`/staking/providers?stakingProviderId=${stakingProvider.id}`}
            >
              <h1 className="my-1 max-w-2xl text-[32px] leading-6 text-label-light-primary">
                {stakingProvider.providerName}
              </h1>
            </Link>
            <a
              href={stakingProvider.termsOfServiceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex">
                <span className="text-brand-light-tertiary underline">
                  Terms of service
                </span>
                <Image
                  src={ExternalLinkIcon}
                  alt={'External link'}
                  className="mx-1"
                  width="14"
                  height="14"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="mx-5">
        <h3 className="pt-5 font-semibold text-label-light-primary">Fees</h3>
        <dl className="pt-5 flex flex-row flex-wrap gap-5">
          {stakingProvider.validators.map((validator) => (
            <div
              key={validator.chainDescriptor}
              className="overflow-hidden rounded-lg bg-white px-6 py-4 min-w-32 shadow grow-0 shrink-0 bg-bg-light-secondary"
            >
              <dt className="truncate">
                <CryptoId
                  id={validator.chainDescriptor}
                  className="text-sm font-medium text-brand-light-tertiary"
                />
              </dt>
              <dd className="mt-1 tracking-tight text-right">
                <span className="text-[32px] font-semibold text-label-light-primary">
                  {validator.feePercent}
                </span>
                <span className="text-[21px] font-semibold text-brand-light-tertiary">
                  %
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default StakingProviderInfo;
