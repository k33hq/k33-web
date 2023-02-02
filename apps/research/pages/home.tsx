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
          <CoverArticle {...mainArticle} />
          <div
            id="secondary-articles-section"
            className="flex flex-row flex-wrap gap-12 items-center justify-between"
          >
            <SubArticle {...subArticle1} />
            <SubArticle {...subArticle2} />
            <SubArticle {...subArticle3} />
            <SubArticle {...subArticle4} />
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
