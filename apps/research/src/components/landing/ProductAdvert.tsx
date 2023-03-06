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
      className={
        'flex flex-col ring-1 ring-brand-light-tertiary/10 md:w-[512px] w-[328px] rounded-xl shadow-xl overflow-hidden'
      }
    >
      <div
        className={`relative h-[216px] w-full hover:scale-150 transition-all`}
      >
        <Image
          src={product.themeImage.url}
          fill
          alt={product.themeImage.description}
          style={{
            objectFit: 'cover',
          }}
        />
        <div className="m-auto absolute mx-10 top-0 bottom-0 left-0 right-0 hover:scale-50 transition-all">
          <Image src={product.logo.url} alt={product.logo.title} fill />
        </div>
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
