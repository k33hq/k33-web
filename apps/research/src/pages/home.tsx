import { GetStaticProps } from 'next';
import { CategoriesAndArticles, HomePage, SubscriptionPage } from '@/types';
import {
  getCategoriesAndTheirArticles,
  getHomePageElements,
  getSubscriptionBySlug,
} from '@/api';
import {
  AnalystPromotion,
  CategoriesAndArticleElements,
  CoverArticle,
  SubArticle,
} from '@/components';
import { ReactElement, useEffect, useState } from 'react';
import { PrivateLayout } from '@/layouts';
import { BasicButton, NextPageWithLayout } from 'ui';
import { fetcher } from 'core';
import { useAppState } from 'platform-js';
import config from '@/firebase/config';
import Link from 'next/link';
import { getUrl } from '@/utils';

interface HomeProps extends HomePage {
  articles: CategoriesAndArticles;
  subscription: SubscriptionPage;
}

const Home: NextPageWithLayout<HomeProps> = ({
  mainArticle,
  subArticle1,
  subArticle2,
  subArticle3,
  subArticle4,
  articles,
  subscription,
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
      <section id="promotion-section" className="bg-bg-dark-elevated-tertiary">
        <div
          id="promotion-section"
          className="md:container md:px-0 px-6 flex md:flex-row flex-col py-10 items-center md:py-8 md:justify-between gap-10"
        >
          <div id="promotion-action" className="flex flex-col gap-4">
            <div id="promotion-information" className="flex flex-col gap-2">
              <div className="flex flex-row gap-1">
                <p className="text-body3 text-label-dark-secondary">
                  Upgrade to
                </p>
                <p className="text-body1 text-label-dark-primary">
                  K33 Research Pro
                </p>
              </div>
              <p className="text-label-dark-primary text-heading7">
                Get real insight from industry experts
              </p>
            </div>
            <div>
              <Link
                href={getUrl(
                  'subscription',
                  'professional-k33-research-subscription'
                )}
              >
                <BasicButton variant="secondary" size="medium">
                  Start 30-day Free trial
                </BasicButton>
              </Link>
            </div>
          </div>
          <div
            id="promotion-features"
            className="md:px-8 md:py-7 py-2 px-4 rounded-[40px] flex flex-col sm:h-full sm:w-full md:flex-wrap gap-2 bg-default-systemGrey-dark-2 md:h-[176px] md:max-w-[762px]"
          >
            {subscription.subscription.features.map((feature) => (
              <div
                key={feature}
                className="flex flex-row md:items-center items-start md:gap-2 gap-6 justify-start"
              >
                <div className="h-[19px] w-[19.19px] md:w-[35px] md:h-[33px]">
                  <svg
                    width="36"
                    height="33"
                    viewBox="0 0 36 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.9607 8.25762C17.8367 8.41036 21.9499 11.9532 23.4783 16.9821C25.0298 22.0868 23.8977 27.8889 19.884 31.0369C15.8998 34.1617 10.5961 33.3017 6.56634 30.2464C2.24972 26.9736 -1.19211 21.7097 0.392951 16.259C2.00934 10.7005 7.59369 8.08951 12.9607 8.25762Z"
                      fill="#AEAEB2"
                    />
                    <g clip-path="url(#clip0_5458_2250)">
                      <path
                        d="M35.1897 5.67634C35.4125 5.92077 35.4125 6.30269 35.1897 6.54712L15.6439 27.3237C15.4139 27.5605 15.0546 27.5605 14.8247 27.3237L4.47973 16.3243C4.25545 16.0799 4.25545 15.698 4.47973 15.4535C4.70465 15.2167 5.06826 15.2167 5.29318 15.4535L15.1696 26.0251L34.3705 5.67634C34.6005 5.43955 34.9598 5.43955 35.1897 5.67634Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_5458_2250">
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
                <p className="text-label-dark-primary text-body2">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        className="md:container md:py-32 py-12 md:px-0 px-6"
        id="category-articles"
      >
        {articles
          .filter((c) => !['opinion', 'analysis'].includes(c.categorySlug))
          .map((category, index) => (
            <>
              <CategoriesAndArticleElements
                {...category}
                key={category.categorySlug}
              />
            </>
          ))}
      </section>
      <AnalystPromotion />
    </>
  );
};

// Home.getLayout = function getLayout(page: ReactElement) {
//   return <PrivateLayout>{page}</PrivateLayout>;
// };

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const { mainArticle, subArticle1, subArticle2, subArticle3, subArticle4 } =
    await getHomePageElements();

  const articles = await getCategoriesAndTheirArticles();
  // TODO: update this and move any promotion to home page content model in contentful
  // TODO: also move subscription pitch to home page
  const subscription = await getSubscriptionBySlug(
    'professional-k33-research-subscription'
  );

  return {
    props: {
      mainArticle,
      subArticle1,
      subArticle2,
      subArticle3,
      subArticle4,
      subscription,
      articles,
    },
  };
};
