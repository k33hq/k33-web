import React from 'react';
import Image from 'next/image';

interface CryptoIdProps {
  id: string;
  className?: string;
}

const CryptoId: React.FC<CryptoIdProps> = ({ id, className }) => {
  return (
    <div className={`flex ${className}`}>
      <Image
        src={`https://raw.githubusercontent.com/spothq/cryptocurrency-icons/refs/heads/master/svg/icon/${getMainCoinId(id)}.svg`}
        alt="Crypto Logo"
        height={24}
        width={24}
        onError={(event) => {
          // @ts-ignore
          event.target.src =
            'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/refs/heads/master/svg/icon/generic.svg';
        }}
      />
      <span className={`ms-1`}>{id}</span>
    </div>
  );
};

export default CryptoId;

function getMainCoinId(id: string): string {
  if (id === 'AVAXTEST') {
    return 'avax';
  }
  return id.split('_')[0].toLowerCase();
}
