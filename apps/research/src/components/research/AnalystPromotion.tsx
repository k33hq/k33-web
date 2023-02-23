import * as React from 'react';
import Image from 'next/image';
import network from '../../assets/network.svg';
import rightNetwork from '../../assets/right-network.svg';
import bendik from '../../assets/bendik.png';
import anders from '../../assets/anders.png';
import vetle from '../../assets/vetle.png';

const AnalystPromotion: React.FC = () => {
  return (
    <div
      id="analyst-promotion-box"
      className="bg-default-systemGrey-light-5 relative"
    >
      <div id="analyst-promotion" className="md:container flex-row flex">
        <div
          id="analyst-information"
          className="m-auto flex-col gap-2 text-label-light-primary"
        >
          <h5 className="md:text-heading5 text-heading7">
            Talk to our analysts
          </h5>
          <p className="text-body2">
            Book a call 1-1 with us. Let us help you understand the digital
            assets industry.
          </p>
        </div>
      </div>
      <div
        id="right-image"
        className="md:absolute md:h-[240px] h-[408px] md:w-[732px] md:left-0"
      >
        <Image
          fill
          src={network}
          alt="analyst"
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      <div
        id="right-image"
        className="md:absolute md:h-[240px] h-[408px] md:w-[632px] md:right-0"
      >
        <Image
          fill
          src={rightNetwork}
          alt="analyst"
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
};

export default AnalystPromotion;
