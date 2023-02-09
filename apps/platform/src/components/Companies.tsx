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
      className="flex sm:flex-row flex-col items-center sm:gap-40 gap-8"
    >
      <p className="text-heading8 text-label-light-secondary">{label}</p>
      <div className="flex sm:flex-row flex-col sm:gap-8 gap-6 items-center">
        {companies.map((url, index) => (
          <Image
            src={url}
            key={`companies-${index}`}
            height={47}
            alt="company logo"
          />
        ))}
      </div>
    </div>
  );
};

export default Companies;
