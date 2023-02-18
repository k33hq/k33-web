import { ProductAdvertElement } from '@/types';
import Image from 'next/image';
import * as React from 'react';
import { BasicButton, BasicList } from 'ui';
import { ReportsDownload } from '../articles';

interface ProductAdvertProps extends ProductAdvertElement {}

const ProductAdvert: React.FC<ProductAdvertProps> = ({
  product,
  productSlug,
}) => {
  return (
    <div
      id={productSlug}
      className="flex flex-col md:w-[512px] w-[328px] rounded-xl shadow-xl overflow-hidden"
    >
      <div className="relative h-[216px] w-full">
        <Image
          src={product.image.url}
          fill
          alt={product.image.description}
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      <div className="md:px-8 md:py-8 flex flex-col px-2 py-2 transition-all items-center justify-center md:gap-10 gap-6">
        <p className="text-heading8 text-label-light-secondary text-center">
          {product.caption}
        </p>
        <BasicList data={product.features} />
        <div>
          {product.sampleReport ? (
            <ReportsDownload
              url={product.sampleReport.url}
              title="Download Sample"
            />
          ) : null}
          <BasicButton
            variant="secondary"
            size="medium"
            fullWidth={!product.sampleReport}
          >
            Find out More
          </BasicButton>
        </div>
      </div>
    </div>
  );
};

export default ProductAdvert;
