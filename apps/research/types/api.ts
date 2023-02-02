import {
  ArticleElements,
  ArticleSlugs,
  ProductElements,
  ProductSlugs,
  ArticlePages,
  CategoryPages,
  CategorySlugs,
  CategoryElements,
  ProductPages,
  ProductElementsWithArticleElements,
  HomePage,
  CategoriesAndArticles,
  ArticlePageSlugs,
} from './domain';

/**
 * category types
 */
export interface GetAllCategorySlugsResponse {
  categoryWebCollection: {
    items: CategorySlugs;
  };
}
export interface GetCategoryElementsResponse {
  categoryWebCollection: {
    items: CategoryElements;
  };
}

export interface GetCategoryPageResponse {
  categoryWebCollection: {
    items: CategoryPages;
  };
}

export interface GetCategoriesAndTheirArticlesResponse {
  categoryWebCollection: {
    items: CategoriesAndArticles;
  };
}

/**
 * product api types
 */
export interface GetProductSlugsByCategoryResponse {
  categoryWebCollection: {
    items: ProductSlugs;
  };
}

export interface GetProductElementsByCategoryResponse {
  productWebCollection: {
    items: ProductElements;
  };
}

export interface GetProductBySlugResponse {
  productWebCollection: {
    items: ProductPages;
  };
}

/**
 * special article elements with product elements right now only getting 2 article elements
 */

export interface GetProductElementsWithArticleElementsByCategoriesResponse {
  productWebCollection: {
    items: ProductElementsWithArticleElements;
  };
}

/**
 * article types
 */
export interface GetArticleSlugsByProductsAndCategoriesResponse {
  articleWebCollection: {
    items: ArticleSlugs;
  };
}

export interface GetArticleElementsByProductAndCategoriesResponse {
  articleWebCollection: {
    items: ArticleElements;
  };
}

export interface GetArticleSlugsResponse {
  articleWebCollection: {
    items: ArticlePageSlugs;
  };
}

export interface GetArticlePageResponse {
  articleWebCollection: {
    items: ArticlePages;
  };
}

export interface GetArticleElementsByCategoriesResponse {
  articleWebCollection: {
    items: ArticleElements;
  };
}

// home page api interfaces

export interface GetHomePageElementsResponse {
  homePage: HomePage;
}
