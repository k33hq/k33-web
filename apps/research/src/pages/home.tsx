import { GetStaticProps } from 'next';
import { CategoriesAndArticles, HomePage } from '@/types';
import { getCategoriesAndTheirArticles, getHomePageElements } from '@/api';
import {
  CategoriesAndArticleElements,
  CoverArticle,
  SubArticle,
} from '@/components';
import { ReactElement, useEffect, useState } from 'react';
import { PrivateLayout } from '@/layouts';
import { NextPageWithLayout } from 'ui';
import { fetcher } from 'core';
import { useAppState } from 'platform-js';
import config from '@/firebase/config';

interface HomeProps extends HomePage {
  articles: CategoriesAndArticles;
}

const Home: NextPageWithLayout<HomeProps> = ({
  mainArticle,
  subArticle1,
  subArticle2,
  subArticle3,
  subArticle4,
  articles,
}) => {
  return (
    <>
      <section className="w-full bg-bg-light-secondary">
        <div className="md:container md:py-16 py-4 flex flex-col md:gap-12 gap-8 px-2">
          {mainArticle ? <CoverArticle {...mainArticle} /> : null}
          <div
            id="secondary-articles-section"
            className="flex md:flex-row flex-col md:flex-wrap md:gap-12 gap-6 md:items-center sm:justify-around md:justify-between"
          >
            {subArticle1 ? <SubArticle {...subArticle1} /> : null}
            {subArticle2 ? <SubArticle {...subArticle2} /> : null}
            {subArticle3 ? <SubArticle {...subArticle3} /> : null}
            {subArticle4 ? <SubArticle {...subArticle4} /> : null}
          </div>
        </div>
      </section>
      {/* <stripe-pricing-table
        pricing-table-id="prctbl_1MbMv0LrfjWYG7W51XRtWX1e"
        publishable-key="pk_test_zKp03y7a9joXn0e0jSrQIimG00rftOWMzH"
      ></stripe-pricing-table> */}
      <section className="md:container md:py-32 px-2" id="category-articles">
        {articles.map((category, index) => (
          <>
            <CategoriesAndArticleElements
              {...category}
              key={category.categorySlug}
            />
          </>
        ))}
      </section>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <PrivateLayout>{page}</PrivateLayout>;
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const { mainArticle, subArticle1, subArticle2, subArticle3, subArticle4 } =
    await getHomePageElements();

  const articles = await getCategoriesAndTheirArticles();

  return {
    props: {
      mainArticle,
      subArticle1,
      subArticle2,
      subArticle3,
      subArticle4,
      articles,
    },
  };
};
