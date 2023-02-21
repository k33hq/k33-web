import { ProductAdvertElement } from '@/types';
import Image from 'next/image';
import * as React from 'react';
import { BasicButton, BasicList } from 'ui';
import { ReportsDownload } from '../articles';
import { useRouter } from 'next/router';
import { downloadResource, getUrl } from '@/utils';

interface ProductAdvertProps extends ProductAdvertElement {}

const ProductAdvert: React.FC<ProductAdvertProps> = ({
  product,
  productSlug,
}) => {
  const router = useRouter();
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
        <div className="flex flex-row gap-2 md:gap-4 items-center">
          {product.sampleReport ? (
            <BasicButton
              size="medium"
              onClick={() => downloadResource(product.sampleReport.url)}
            >
              Download Sample
            </BasicButton>
          ) : null}
          <BasicButton
            variant="secondary"
            size="medium"
            onClick={() => router.push(getUrl('products', productSlug))}
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
