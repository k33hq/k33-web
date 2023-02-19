import * as React from 'react';
import coindesk from '../../assets/coindesk.png';
import forbes from '../../assets/forbes.png';
import reuters from '../../assets/reuters.png';
import financialTimes from '../../assets/ft.png';
import bloomberg from '../../assets/bloomberg.png';
import Image from 'next/image';

const CitedBy: React.FC = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center items-center md:gap-8 gap-4 transition-all pb-4">
      <p className="text-label-dark-secondary md:text-body1 md:mr-10 text-caption">
        Regularly cited by
      </p>
      <Image
        src={financialTimes}
        width={189}
        height={24}
        alt="financial times"
      />
      <Image src={bloomberg} width={129} height={29} alt="bloomberg" />
      <Image src={reuters} width={109} height={31} alt="reuters" />
      <Image src={coindesk} width={148} height={25} alt="coindesk" />
      <Image src={forbes} width={94} height={25} alt="forbes" />
    </div>
  );
};

export default CitedBy;
