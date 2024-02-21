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
      key={vaultAssetAddress.assetId}
      className={`flex flex-col ${index % 2 == 0 ? 'bg-bg-light-primary' : 'bg-bg-light-secondary'}`}
    >
      <div
        className={
          'flex flex-wrap basis-1 text-label-light-primary text-nowrap p-2'
        }
      >
        <span className={'text-label-light-secondary'}>Currency: </span>
        <span className={'mx-2'}>{vaultAssetAddress.assetId}</span>
      </div>
      {vaultAssetAddress.addressFormat ? (
        <div
          className={
            'flex flex-wrap basis-1 text-label-light-primary text-nowrap p-2'
          }
        >
          <span className={'text-label-light-secondary'}>Address Format: </span>
          <span className={'mx-2'}>{vaultAssetAddress.addressFormat}</span>
        </div>
      ) : (
        ''
      )}
      <div className={'flex flex-wrap p-2'}>
        <span className={'text-label-light-secondary'}>Address: </span>
        <div className={'mx-2 flex flex-row outline rounded p-1'}>
          <span data-icon={CopyIcon}>{vaultAssetAddress.address}</span>
          <Image
            className={'ps-2 w-8'}
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
        <div className={'flex flex-wrap p-2'}>
          <span className={'text-label-light-secondary'}>Tag: </span>
          <div className={'mx-2 flex flex-row outline rounded p-1'}>
            <span className={'font-mono'}>{vaultAssetAddress.tag}</span>
            <div>
              <Image
                className={'ps-2 w-8'}
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
        </div>
      ) : (
        ''
      )}
    </div>
  ));
  return (
    <div className={className}>
      <Modal backdrop={true} open={visible} onClose={() => {}} size={'small'}>
        <div className={'font-bold text-center'}>Addresses</div>
        <div className={'flex flex-col pt-8'}>{addressRows}</div>
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
