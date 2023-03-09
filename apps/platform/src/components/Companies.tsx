import Image, { StaticImageData } from 'next/image';
import * as React from 'react';

interface CompaniesProps {
  label: string;
  companies: ReadonlyArray<StaticImageData | string>;
}

const Companies: React.FC<CompaniesProps> = ({ label, companies }) => {
  return (
    <div
      id="k33-companies"
      className="flex md:flex-row flex-col items-center md:gap-40 gap-2"
    >
      <p className="md:text-heading8 text-caption text-label-light-secondary">
        {label}
      </p>
      <div className="flex flex-row-reverse md:flex-row flex-wrap md:gap-8 gap-6 items-center">
        {companies.map((url, index) => (
          <div className="relative">
            <Image
              src={url}
              key={`companies-${index}`}
              alt="company logo"
              className="md:h-[47px] md:min-w-max h-[31px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;
