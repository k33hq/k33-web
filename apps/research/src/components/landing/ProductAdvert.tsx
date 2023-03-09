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
      <div className={`relative h-[216px] w-full transition-all`}>
        <Image
          src={product.themeImage.url}
          fill
          alt={product.themeImage.description}
          style={{
            objectFit: 'cover',
          }}
        />
        <div className="m-auto absolute mx-10 top-0 bottom-0 left-0 right-0 hover:scale-75 transition-all">
          <Image src={product.logo.url} alt={product.logo.title} fill />
        </div>
      </div>
      <div className="md:px-8 md:py-8 flex flex-col px-2 py-9 transition-all items-center justify-center md:gap-10 gap-9">
        <p className="text-heading8 text-label-light-secondary text-center w-[296px] md:w-[444px]">
          {product.caption}
        </p>
        <div className="w-[296px] md:w-[448px]">
          <BasicList data={product.features} />
        </div>
        <div className="flex flex-row justify-between w-[296px] md:w-[448px]">
          {product.sampleReport ? (
            <button
              className="text-caption md:text-body1 bg-brand-light-primary px-3 py-[6px] rounded-md drop-shadow-xl text-label-dark-primary hover:bg-brand-light-tertiary hover:text-label-dark-primary md:px-11 md:py-2 md:rounded-lg"
              onClick={() => downloadResource(product.sampleReport.url)}
            >
              Download Sample
            </button>
          ) : null}
          <button
            className="text-caption px-3 py-[6px] rounded-md drop-shadow-xl text-brand-light-primary bg-bg-light-primary border-[1.4px] border-solid md:border-[2px] border-brand-light-primary hover:bg-brand-light-tertiary hover:text-label-dark-primary md:text-body1 md:px-10 md:py-2 md:rounded-lg"
            onClick={() => router.push(getUrl('products', productSlug))}
          >
            Find out More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductAdvert;
