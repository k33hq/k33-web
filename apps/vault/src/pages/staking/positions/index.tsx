import Head from 'next/head';
import { getTitle, NextPageWithLayout } from 'platform-js';
import React, { ReactElement } from 'react';
import { PrivateMainLayout } from '@/layouts';
import {
  Breadcrumbs,
  StakingPositionInfo,
  StakingPositionsTable,
} from '@/components';
import { useSearchParams } from 'next/navigation';

const StakingPositionsPage: NextPageWithLayout = () => {
  const searchParams = useSearchParams();
  const stakingPositionId = searchParams.get('stakingPositionId');

  let content: ReactElement = <></>;
  const pages = [{ name: 'Staking', href: '/staking', current: false }];
  if (stakingPositionId !== null) {
    content = <StakingPositionInfo stakingPositionId={stakingPositionId} />;
    pages.push(
      {
        name: 'Staking Positions',
        href: '/staking/positions',
        current: false,
      },
      {
        name: stakingPositionId,
        href: `/staking/positions?stakingPositionId=${stakingPositionId}`,
        current: true,
      }
    );
  } else {
    content = <StakingPositionsTable />;
    pages.push({
      name: 'Staking Positions',
      href: '/staking/positions',
      current: true,
    });
  }

  return (
    <>
      <Head>
        <title>{getTitle('Vault', 'Staking', 'Positions')}</title>
      </Head>
      <Breadcrumbs pages={pages} />
      <div className="my-3">{content}</div>
    </>
  );
};

StakingPositionsPage.getLayout = (page: ReactElement) => {
  return <PrivateMainLayout>{page}</PrivateMainLayout>;
};

export default StakingPositionsPage;
