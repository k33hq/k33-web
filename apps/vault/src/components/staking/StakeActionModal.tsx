'use client';

import { BasicButton, Modal } from 'ui';
import React, { ReactElement, useEffect, useState } from 'react';
import {
  getAllowedStakingProviders,
  getStakingConstraints,
  roundDecimalDigits,
  validateStakeAction,
} from '@/utils/stakingRules';
import Big from 'big.js';
import CircleCheckIcon from '../../assets/circle-check-icon.svg';
import Image from 'next/image';
import { vaultApi } from '@/services';
import checkError from '@/utils/api';
import Link from 'next/link';
import { StakingProvider, StakingProviderValidator } from '@/types';
import { RadioGroup } from '@headlessui/react';
import StakingProviderValidatorInfo from './providers/StakingProviderValidatorInfo';

interface StakeActionModalProps {
  stakeAssetId: string;
  available: Big;
  providers: StakingProvider[];
  hide: () => void;
  className?: string;
}

enum StepId {
  order,
  preview,
  confirm,
}

interface Step {
  id: StepId;
  displayIndex: string;
  name: string;
}

const steps: Step[] = [
  { id: StepId.order, displayIndex: '01', name: 'Order' },
  { id: StepId.preview, displayIndex: '02', name: 'Preview' },
  { id: StepId.confirm, displayIndex: '03', name: 'Confirmation' },
];

const StakeActionModal: React.FC<StakeActionModalProps> = ({
  stakeAssetId,
  available,
  providers,
  hide,
  className,
}) => {
  const [stake, stakeResult] = vaultApi.useCreateStakingPositionMutation();
  const [currentStep, setCurrentStep] = useState<StepId>(StepId.order);

  const { minimumStakeAmount, maximumStakeAmount, minimumAvailable } =
    getStakingConstraints(available);
  const [stakeAmount, setStakeAmount] = useState<string>(
    maximumStakeAmount.toFixed()
  );
  const [selectedProviderId, setSelectedProviderId] = useState<
    string | undefined
  >();
  const [allowedStakingProviders, setAllowedStakingProviders] = useState<
    StakingProviderValidator[]
  >([]);

  useEffect(() => {
    const _allowedStakingProviders = getAllowedStakingProviders(
      stakeAssetId,
      Big(stakeAmount),
      providers
    );
    setAllowedStakingProviders(_allowedStakingProviders);
    if (_allowedStakingProviders.length == 1) {
      if (selectedProviderId !== _allowedStakingProviders[0].id) {
        setSelectedProviderId(_allowedStakingProviders[0].id);
      }
    } else if (_allowedStakingProviders.length > 1) {
      if (
        selectedProviderId === undefined ||
        allowedStakingProviders.length <= 1
      ) {
        setSelectedProviderId(_allowedStakingProviders[0].id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stakeAmount, selectedProviderId, stakeAssetId, providers]);

  const {
    balanceAfterStaking,
    stakeAmountError,
    stakeAmountWarning,
    balanceAfterError,
    providerWarning,
    providerError,
  } = validateStakeAction(
    stakeAssetId,
    available,
    Big(stakeAmount),
    selectedProviderId
  );

  const balanceAfterClassName = balanceAfterError
    ? 'border-2 border-brand-light-primary disabled:bg-brand-light-primary text-label-dark-primary'
    : 'border disabled:ui-bg-default-systemGrey-light-2';
  const stakeAmountClassName = stakeAmountError
    ? 'border-brand-light-primary bg-brand-light-primary text-label-dark-primary'
    : stakeAmountWarning
      ? 'border-brand-light-primary bg-brand-light-primary bg-opacity-40 text-label-light-primary'
      : '';

  const invalid = !!balanceAfterError || !!stakeAmountError || !!providerError;

  let stepContent: ReactElement = <></>;
  switch (currentStep) {
    case StepId.order:
      stepContent = (
        <>
          <div className="space-y-12 sm:space-y-16">
            <div>
              <h1 className="block text-label-light-secondary text-[32px]">
                Stake
              </h1>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                Stake your{' '}
                <span className="font-semibold text-[18px]">ETH</span> or{' '}
                <span className="font-bold text-[18px]">SOL</span> assets.
                <br />
                Support to stake{' '}
                <span className="font-bold text-[18px]">MATIC</span> is coming
                soon.
              </p>

              <div className="pt-5">
                <div>
                  <label htmlFor="stakeAssetId" className="font-medium">
                    Cryptocurrency
                  </label>
                </div>
                <div className="p-2">
                  <input
                    id="stakeAssetId"
                    className="border px-1 w-full disabled:ui-bg-default-systemGrey-light-2"
                    type="text"
                    value={stakeAssetId}
                    disabled={true}
                  />
                </div>
                <div>
                  <label htmlFor="availableBalance" className="font-medium">
                    Available Balance
                  </label>
                </div>
                <div className="p-2">
                  <input
                    id="availableBalance"
                    className="border px-1 w-full disabled:ui-bg-default-systemGrey-light-2"
                    type="text"
                    value={available.toString()}
                    disabled={true}
                  />
                </div>
                <div>
                  <label htmlFor="balanceAfterStaking" className="font-medium">
                    Balance after staking
                  </label>{' '}
                  (minimum: {minimumAvailable.toString()})
                </div>
                <div className="p-2">
                  <input
                    id="balanceAfterStaking"
                    className={`px-1 w-full ${balanceAfterClassName}`}
                    type="text"
                    value={balanceAfterStaking.toString()}
                    disabled={true}
                  />
                  <div className="text-brand-light-primary text-[16px]">
                    {balanceAfterError ?? ''}
                  </div>
                </div>
                <div className="pt-4">
                  <label htmlFor="stakeAmount" className="font-medium">
                    Stake Amount
                  </label>{' '}
                  (minimum: {minimumStakeAmount.toString()})
                </div>
                <div className="p-2">
                  <input
                    id="stakeAmount"
                    className={`border-2 px-1 w-full ${stakeAmountClassName}`}
                    type="number"
                    value={stakeAmount.toString()}
                    onChange={(e) => {
                      if (e.target.value === '') {
                        setStakeAmount('0');
                      } else if (Big(e.target.value).eq(Big('0'))) {
                        setStakeAmount(e.target.value);
                      } else {
                        setStakeAmount(roundDecimalDigits(Big(e.target.value)));
                      }
                    }}
                    required={true}
                  />
                  <div className="text-brand-light-primary text-[16px] text-wrap w-[500px]">
                    {stakeAmountError ?? ''}
                    {stakeAmountWarning ?? ''}
                  </div>
                </div>
                <div>
                  <div className="pt-4 font-medium">
                    <label htmlFor="provider" className="font-medium">
                      Provider
                    </label>
                  </div>
                  <div className="p-2">
                    <RadioGroup
                      value={
                        selectedProviderId ??
                        (allowedStakingProviders &&
                        allowedStakingProviders.length > 0 &&
                        allowedStakingProviders[0] !== undefined
                          ? allowedStakingProviders[0].id
                          : null)
                      }
                      onChange={setSelectedProviderId}
                    >
                      {allowedStakingProviders.map((provider) => (
                        <RadioGroup.Option value={provider.id}>
                          <div
                            className={`mb-2 ${selectedProviderId === provider.id ? 'border-2 rounded-xl border-[green]' : ''}`}
                            key={provider.id}
                            onClick={() => setSelectedProviderId(provider.id)}
                          >
                            <StakingProviderValidatorInfo provider={provider} />
                          </div>
                        </RadioGroup.Option>
                      ))}
                    </RadioGroup>
                    <div className="text-brand-light-primary text-[16px] text-wrap w-[500px]">
                      {providerWarning ?? ''}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <h1 className="block text-label-light-secondary text-[24px]">
                  Requirements
                </h1>
              </div>
              <div className="ms-5">
                <ul className="list-disc">
                  <li>
                    <span className="font-normal text-label-light-primary">
                      Minimum stake amount:
                    </span>{' '}
                    <span className="font-mono">
                      {minimumStakeAmount.toString()}
                    </span>
                  </li>
                  <li>
                    <span className="font-normal text-label-light-primary">
                      Minimum balance to be maintained:
                    </span>{' '}
                    <span className="font-mono">
                      {minimumAvailable.toString()}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <BasicButton variant="secondary" size="medium" onClick={hide}>
              Cancel
            </BasicButton>
            <BasicButton
              variant="primary"
              size="medium"
              disabled={invalid}
              onClick={() => setCurrentStep(StepId.preview)}
            >
              Preview
            </BasicButton>
          </div>
        </>
      );
      break;
    case StepId.preview:
      const selectedProvider = allowedStakingProviders.find(
        (provider) => provider.id == selectedProviderId
      );
      if (!selectedProvider) {
        throw new Error('Missing staking provider');
      }
      stepContent = (
        <>
          <div className="space-y-12 sm:space-y-16">
            <div>
              <h1 className="block text-label-light-secondary text-[32px]">
                Stake
              </h1>

              <div className="pt-5">
                <div>
                  <label htmlFor="stakeAssetId" className="font-medium">
                    Cryptocurrency
                  </label>
                </div>
                <div className="p-2">
                  <input
                    id="stakeAssetId"
                    className="border px-1 w-full disabled:ui-bg-default-systemGrey-light-2"
                    type="text"
                    value={stakeAssetId}
                    disabled={true}
                    required={true}
                  />
                </div>
                <div className="pt-4">
                  <label htmlFor="stakeAmount" className="font-medium">
                    Stake Amount
                  </label>
                </div>
                <div className="p-2">
                  <input
                    id="stakeAmount"
                    className="border px-1 w-full disabled:ui-bg-default-systemGrey-light-2"
                    type="number"
                    value={Big(stakeAmount).toFixed(17, Big.roundHalfUp)}
                    required={true}
                    disabled={true}
                  />
                </div>
                <div className="pt-4">
                  <label htmlFor="stakeAmount" className="font-medium">
                    Provider
                  </label>
                </div>
                <div className="p-2">
                  <StakingProviderValidatorInfo provider={selectedProvider} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <BasicButton variant="secondary" size="medium" onClick={hide}>
              Cancel
            </BasicButton>
            <BasicButton
              variant="secondary"
              size="medium"
              onClick={() => setCurrentStep(StepId.order)}
            >
              Back
            </BasicButton>
            <BasicButton
              variant="primary"
              size="medium"
              disabled={invalid}
              onClick={() => {
                if (selectedProviderId) {
                  setCurrentStep(StepId.confirm);
                  stake({
                    vaultAssetId: stakeAssetId,
                    amount: stakeAmount.toString(),
                    providerId: selectedProviderId,
                  });
                }
              }}
            >
              Confirm
            </BasicButton>
          </div>
        </>
      );
      break;
    case StepId.confirm:
      let confirmContent: ReactElement = <></>;
      if (stakeResult.isLoading) {
        confirmContent = (
          <h1 className="block text-label-light-secondary text-[36px] text-center p-8">
            Processing...
          </h1>
        );
      } else if (stakeResult.isError) {
        const errorInfo = checkError(stakeResult);
        if (errorInfo) {
          confirmContent = (
            <h1 className="block text-label-light-secondary text-[32px] text-center p-8">
              {errorInfo.message}
            </h1>
          );
        } else {
          confirmContent = (
            <h1 className="block text-label-light-secondary text-[32px] text-center p-8">
              Error occurred in handling stake request
            </h1>
          );
        }
      } else if (stakeResult.isSuccess) {
        const stakePositionId = stakeResult.data.id;
        confirmContent = (
          <h1 className="block text-[32px] text-center mt-8">
            <div className="text-label-light-secondary">
              Staking Position ID
            </div>
            <Link href={`/staking/positions/${stakePositionId}`}>
              <BasicButton size="medium" variant="secondary">
                {stakePositionId}
              </BasicButton>
            </Link>
          </h1>
        );
      }
      stepContent = (
        <>
          {confirmContent}
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <BasicButton variant="primary" size="medium" onClick={hide}>
              Close
            </BasicButton>
          </div>
        </>
      );
      break;
  }
  return (
    <div className={className}>
      <Modal backdrop={true} open={true} onClose={() => {}} size={'small'}>
        <nav aria-label="Progress">
          <ol
            role="list"
            className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
          >
            {steps.map((step, stepIdx) => (
              <li key={step.name} className="relative md:flex md:flex-1">
                {stepIdx < currentStep ? (
                  <div className="group flex w-full items-center">
                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                        <Image
                          className="h-10 w-10"
                          src={CircleCheckIcon}
                          alt={'Copy'}
                        />
                      </span>
                      <span className="ml-4 text-sm font-medium text-brand-light-secondary">
                        {step.name}
                      </span>
                    </span>
                  </div>
                ) : stepIdx === currentStep ? (
                  <div
                    aria-current="step"
                    className="flex items-center px-6 py-4 text-sm font-medium"
                  >
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-brand-light-primary">
                      <span className="text-brand-light-primary">
                        {step.displayIndex}
                      </span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-brand-light-primary">
                      {step.name}
                    </span>
                  </div>
                ) : (
                  <div className="group flex items-center">
                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-brand-light-tertiary">
                        <span className="text-brand-light-tertiary">
                          {step.displayIndex}
                        </span>
                      </span>
                      <span className="ml-4 text-sm font-medium text-brand-light-tertiary">
                        {step.name}
                      </span>
                    </span>
                  </div>
                )}

                {stepIdx !== steps.length - 1 ? (
                  <>
                    {/* Arrow separator for lg screens and up */}
                    <div
                      aria-hidden="true"
                      className="absolute right-0 top-0 hidden h-full w-5 md:block"
                    >
                      <svg
                        fill="none"
                        viewBox="0 0 22 80"
                        preserveAspectRatio="none"
                        className="h-full w-full text-gray-300"
                      >
                        <path
                          d="M0 -2L20 40L0 82"
                          stroke="currentcolor"
                          vectorEffect="non-scaling-stroke"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </>
                ) : null}
              </li>
            ))}
          </ol>
        </nav>
        {stepContent}
      </Modal>
    </div>
  );
};

export default StakeActionModal;
