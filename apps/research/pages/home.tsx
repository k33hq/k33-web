import { getHomePageElements } from '@/api/home';
import { GetStaticProps, NextPage } from 'next';
import { CategoriesAndArticles, HomePage } from '../types';
import { CoverArticle, SubArticle } from '@/components/research';
import { getCategoriesAndTheirArticles } from '../api';
import CategoriesAndArticleElements from '@/components/categories/CategoriesAndArticleElements';

interface HomeProps extends HomePage {
  articles: CategoriesAndArticles;
}

const Home: NextPage<HomeProps> = ({
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
        <div className="md:container py-16 flex flex-col gap-12">
          {mainArticle ? <CoverArticle {...mainArticle} /> : null}
          <div
            id="secondary-articles-section"
            className="flex flex-row flex-wrap gap-12 items-center justify-between"
          >
            {subArticle1 ? <SubArticle {...subArticle1} /> : null}
            {subArticle2 ? <SubArticle {...subArticle2} /> : null}
            {subArticle3 ? <SubArticle {...subArticle3} /> : null}
            {subArticle4 ? <SubArticle {...subArticle4} /> : null}
          </div>
        </div>
      </section>
      <section className="md:container pt-32" id="category-articles">
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
