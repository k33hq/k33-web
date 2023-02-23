import * as React from 'react';
import Image from 'next/image';
import network from '../../assets/network.svg';
import rightNetwork from '../../assets/right-network.svg';
import analyst from '../../assets/analyst.png';
import { HiOutlineMail } from 'react-icons/hi';

const AnalystPromotion: React.FC = () => {
  return (
    <div
      id="analyst-promotion-box"
      className="bg-default-systemGrey-light-5 relative md:w-full bg-[url('../assets/network.svg')] bg-scroll bg-no-repeat bg-cover md:bg-contain transition-all"
    >
      <div
        id="analyst-promotion"
        className="md:container flex items-end md:flex-row flex-col-reverse justify-around md:gap-0 md:px-0 px-6"
      >
        <Image
          src={analyst}
          width={375}
          height={250}
          alt=""
          className="md:mt-5"
        />
        <div
          id="analyst-information"
          className="flex-col gap-2 text-label-light-primary self-center py-10"
        >
          <h5 className="md:text-heading5 text-heading7">
            Talk to our analysts
          </h5>
          <p className="text-body2">
            Book a call 1-1 with us. Let us help you understand the digital
            assets industry.
          </p>
          <button className="flex flex-row items-center border-2 rounded-md px-2 py-1 gap-2 hover:bg-brand-light-tertiary hover:text-label-dark-primary md:mt-2">
            <p>Set up a Call</p>
            <HiOutlineMail />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalystPromotion;
