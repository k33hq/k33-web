import Image, { StaticImageData } from 'next/image';
import * as React from 'react';

interface CompaniesProps {
  label: string;
  companies: ReadonlyArray<StaticImageData | string>;
}

const Companies: React.FC<CompaniesProps> = ({ label, companies }) => {
  return (
    <div id="k33-companies" className="flex flex-row items-center gap-40">
      <p className="text-heading8 text-label-light-secondary">{label}</p>
      <div className="flex flex-row gap-8 items-center">
        {companies.map((url) => (
          <Image
            src={url}
            key={url.toString()}
            height={47}
            alt="company logo"
          />
        ))}
      </div>
    </div>
  );
};

export default Companies;
