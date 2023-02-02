import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ProductsWithArticles } from '@/components/products';

interface ProductProps {}

const Product: NextPage<ProductProps> = ({}) => {
  return (
    <div className="flex flex-col gap-10 pt-20 bg-bg-light-secondary"></div>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  return {
    paths: [{ params: { categorySlug: 'reports', productSlug: '1' } }],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
  return {
    props: {},
  };
};

export default Product;
