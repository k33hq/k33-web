import Big from 'big.js';
import { StakingProviderValidator, StakingProvider } from '@/types';

Big.strict = true;
Big.DP = 17;
const bigRoundMode = Big.roundHalfEven;
Big.RM = bigRoundMode;

const minimumStakeAmount = Big('0.01');
const minimumAvailable = Big('0.1');

interface StakingConstraints {
  minimumStakeAmount: Big;
  maximumStakeAmount: Big;
  minimumAvailable: Big;
}

export function getStakingConstraints(available: Big): StakingConstraints {
  const maximumStakeAmount = available.minus(minimumAvailable);
  return {
    minimumStakeAmount,
    maximumStakeAmount,
    minimumAvailable,
  };
}

interface ValidateStakeActionResult {
  balanceAfterStaking: Big;
  stakeAmountError?: string;
  stakeAmountWarning?: string;
  balanceAfterError?: string;
  providerWarning?: string;
  providerError?: string;
}

export function validateStakeAction(
  assetId: string,
  available: Big,
  stakedAmount: Big,
  providerId?: string
): ValidateStakeActionResult {
  const { minimumStakeAmount, maximumStakeAmount, minimumAvailable } =
    getStakingConstraints(available);
  const balanceAfterStaking = available.minus(stakedAmount);
  let result: ValidateStakeActionResult = { balanceAfterStaking };
  if (assetId.startsWith('ETH')) {
    if (
      stakedAmount.gte(Big('32')) &&
      !stakedAmount.mod(Big('32')).eq(Big('0'))
    ) {
      result = {
        ...result,
        stakeAmountWarning:
          'You earn less rewards when you stake ETH more than 32, but is not multiple of 32.',
      };
    }
    if (providerId === 'lido') {
      result = {
        ...result,
        providerWarning:
          'Lido adds staking amount to existing staking position. This staking position cannot be unstaked partially.',
      };
    }
  }
  if (maximumStakeAmount.lt(minimumStakeAmount)) {
    result = {
      ...result,
      balanceAfterError: 'Insufficient balance',
    };
  }
  if (balanceAfterStaking.lt(minimumAvailable)) {
    result = {
      ...result,
      balanceAfterError: 'Maintain minimum balance after staking',
    };
  }
  if (stakedAmount.lt(minimumStakeAmount)) {
    result = {
      ...result,
      stakeAmountError: 'Less than minimum stake amount',
    };
  }
  if (providerId === undefined) {
    result = {
      ...result,
      providerError: 'Missing provider',
    };
  }
  return result;
}

function getAllowedStakingProviderIds(stakeAssetId: string, stakeAmount: Big) {
  if (stakeAmount.lt(minimumStakeAmount)) {
    return [];
  }
  if (stakeAssetId.startsWith('ETH')) {
    if (stakeAmount.mod(Big('32')).eq(Big('0'))) {
      return ['figment', 'lido'];
    } else {
      return ['lido'];
    }
  } else if (stakeAssetId.startsWith('SOL')) {
    return ['figment'];
  }
  return [];
}

export function getAllowedStakingProviders(
  stakeAssetId: string,
  stakeAmount: Big,
  providers: StakingProvider[]
): StakingProviderValidator[] {
  if (stakeAmount.lt(minimumStakeAmount)) {
    return [];
  }
  const allowedStakingProviderIds = getAllowedStakingProviderIds(
    stakeAssetId,
    stakeAmount
  );
  if (allowedStakingProviderIds.length === 0) {
    return [];
  }
  return providers
    .filter((provider) => allowedStakingProviderIds.includes(provider.id))
    .flatMap((provider) => {
      const validator = provider.validators.find(
        (validator) => validator.chainDescriptor === stakeAssetId
      );
      if (!validator) {
        return [];
      }
      return [
        {
          ...provider,
          feePercent: validator.feePercent,
        },
      ];
    });
}

export function roundDecimalDigits(big: Big): string {
  return Big(big.toFixed(Big.DP, bigRoundMode)).toString();
}
