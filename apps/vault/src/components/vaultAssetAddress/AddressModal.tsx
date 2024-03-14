import React from 'react';
import { BasicButton, Modal } from 'ui';
import { VaultAssetAddress } from '@/types';
import Image from 'next/image';
import CopyIcon from '../../assets/copy-icon.png';

interface AddressModalProps {
  vaultAssetAddresses: VaultAssetAddress[];
  visible: boolean;
  setVisible: (visible: boolean) => void;
  className?: string;
}

const AddressModal: React.FC<AddressModalProps> = ({
  vaultAssetAddresses,
  visible,
  setVisible,
  className,
}) => {
  const addressRows = vaultAssetAddresses.map((vaultAssetAddress, index) => (
    <div
      className={`grid grid-cols-subgrid md:col-span-2 gap-2 p-2 ${index % 2 == 0 ? 'bg-bg-light-primary' : 'bg-bg-light-secondary'}`}
    >
      <div className={`text-label-light-secondary size-fit`}>Currency:</div>
      <div className={'text-label-light-primary text-nowrap'}>
        {vaultAssetAddress.assetId}
      </div>
      {vaultAssetAddress.addressFormat ? (
        <>
          <div className={'text-label-light-secondary'}>Address Format:</div>
          <div className={'text-label-light-primary'}>
            {vaultAssetAddress.addressFormat}
          </div>
        </>
      ) : (
        ''
      )}
      <div className={'text-label-light-secondary'}>Address:</div>
      <div className={'flex flex-row'}>
        <div className={'grow-0 outline rounded p-1'}>
          <span className={'font-mono'} data-icon={CopyIcon}>
            {vaultAssetAddress.address}
          </span>
          <Image
            className={'inline ps-2 w-8'}
            src={CopyIcon}
            alt={'Copy'}
            onClick={() =>
              navigator.clipboard
                .writeText(vaultAssetAddress.address)
                .then(() => alert('Address copied'))
            }
          />
        </div>
      </div>

      {vaultAssetAddress.tag ? (
        <>
          <div className={'text-label-light-secondary'}>Tag:</div>
          <div className={'flex flex-row no-wrap'}>
            <div className={'grow-0 outline rounded p-1'}>
              <span className={'font-mono'}>{vaultAssetAddress.tag}</span>
              <Image
                className={'ps-2 w-8 inline'}
                src={CopyIcon}
                alt={'Copy'}
                onClick={() =>
                  navigator.clipboard
                    .writeText(vaultAssetAddress.tag || '')
                    .then(() => alert('Tag copied'))
                }
              />
            </div>
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  ));
  return (
    <div className={className}>
      <Modal backdrop={true} open={visible} onClose={() => {}} size={'small'}>
        <div className={'font-bold text-center'}>Addresses</div>
        <div className={'grid grid-cols-1 gap-2 md:grid-cols-[auto_auto] pt-8'}>
          {addressRows}
        </div>
        <div className={'text-center pt-8'}>
          <BasicButton
            className={''}
            variant={'secondary'}
            size={'medium'}
            onClick={() => setVisible(false)}
          >
            Close
          </BasicButton>
        </div>
      </Modal>
    </div>
  );
};

export default AddressModal;
