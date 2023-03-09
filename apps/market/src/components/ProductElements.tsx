import { StaticImageData } from 'next/image';
import * as React from 'react';
import Image from 'next/image';

interface ProductElementsProps {
  logo: StaticImageData | string;
  title: string;
  description: string;
  comingSoon?: boolean;
  features?: string[];
  action?: {
    label: string;
    href: string;
  };
}

const ProductElements: React.FC<ProductElementsProps> = ({
  logo,
  title,
  description,
  features,
  action,
  comingSoon = true,
}) => {
  return (
    <div className="shadow-md px-6 py-10 md:w-[369px] w-[327px] flex flex-col items-center md:gap-12 rounded-xl ring-1 ring-brand-light-tertiary/20">
      {comingSoon && (
        <div className="bg-default-systemGrey-light-4 px-2 py-1 rounded-lg">
          <p className="text-body2 text-label-light-primary">Coming Soon</p>
        </div>
      )}
      <Image src={logo} alt={`${title}-logo`} />
      <div className="flex flex-col text-center text-heading8 gap-2">
        <p className="text-label-light-primary">{title}</p>
        <p className="text-label-light-secondary">{description}</p>
      </div>
      {features && (
        <div className="flex flex-col gap-6">
          {features.map((f) => (
            <div className="flex flex-row items-start gap-2">
              <div className="w-[35px] h-[33px]">
                <svg
                  width="36"
                  height="33"
                  viewBox="0 0 36 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.9607 8.25762C17.8367 8.41036 21.9499 11.9532 23.4783 16.9821C25.0298 22.0868 23.8977 27.8889 19.884 31.0369C15.8998 34.1617 10.5961 33.3017 6.56634 30.2464C2.24972 26.9736 -1.19211 21.7097 0.392951 16.259C2.00934 10.7005 7.59369 8.08951 12.9607 8.25762Z"
                    fill="#AEAEB2"
                  />
                  <g clipPath="url(#clip0_3945_1746)">
                    <path
                      d="M35.1897 5.67637C35.4125 5.9208 35.4125 6.30272 35.1897 6.54715L15.6439 27.3237C15.4139 27.5605 15.0546 27.5605 14.8247 27.3237L4.47973 16.3243C4.25545 16.0799 4.25545 15.698 4.47973 15.4536C4.70465 15.2168 5.06826 15.2168 5.29318 15.4536L15.1696 26.0252L34.3705 5.67637C34.6005 5.43958 34.9598 5.43958 35.1897 5.67637Z"
                      fill="#090A0B"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3945_1746">
                      <rect
                        width="31.0453"
                        height="33"
                        fill="white"
                        transform="translate(4.31152)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <p className="text-body2 text-label-light-secondary" key={f}>
                {f}
              </p>
            </div>
          ))}
        </div>
      )}
      {action && (
        <a href={action.href}>
          <button className="text-body1 text-label-light-primary py-2 px-20 md:px-28 ring-2 ring-brand-light-primary drop-shadow-xl rounded-lg hover:text-label-dark-primary hover:bg-brand-light-tertiary hover:ring-brand-light-tertiary">
            {action.label}
          </button>
        </a>
      )}
    </div>
  );
};

export default ProductElements;
