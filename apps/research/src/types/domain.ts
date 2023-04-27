import { Document } from '@contentful/rich-text-types';

export type ProductStatus = 'active' | 'ended';
export interface System {
  id: string;
  firstPublishedAt: string;
}

export type CategoryType = 'highlighted' | 'standard';

export type Colors =
  | 'systemRed'
  | 'systemOrange'
  | 'systemYellow'
  | 'systemGreen'
  | 'systemTeal'
  | 'systemBlue'
  | 'systemIndigo'
  | 'systemPurple'
  | 'systemPink';

export interface Brand {
  color: Colors;
}

export interface RichText {
  json: Document;
}

export interface Seo {
  title: string;
  description: string;
  image: Image;
}

export interface Author {
  name: string;
  title: string;
  profilePicture: Image;
}

export interface AuthorSlug {
  authorSlug: string;
}

export interface AuthorPage extends AuthorSlug {
  author: Author;
}

export interface ResearchDocument {
  url: string;
  title: string;
}

export interface Image {
  url: string;
  title: string;
  description: string;
}

export interface Category {
  title: string;
  description: string;
}

export type Categories = ReadonlyArray<Category>;
export interface CategorySlug {
  categorySlug: string;
}

export type CategorySlugs = ReadonlyArray<CategorySlug>;

export interface CategoryElement extends CategorySlug {
  category: Pick<Category, 'title'>;
}

export type CategoryElements = ReadonlyArray<CategoryElement>;

export interface CategoryPage {
  title: string;
  seo: Seo | null;
  category: Category;
  type: CategoryType | null;
  highlightedProductsCollection: {
    items: ReadonlyArray<ProductElementsWithArticleElement>;
  };
}

export type CategoryPages = ReadonlyArray<CategoryPage>;

export interface Product {
  title: string;
  description: string;
  image: Image;
  logo: Image;
  themeImage: Image;
  sys: System;
}

export type Products = ReadonlyArray<Product>;

export interface ProductCoreSlug {
  productSlug: string;
}

interface ProductSlug extends CategorySlug {
  linkedFrom: {
    productWebCollection: {
      items: ReadonlyArray<ProductCoreSlug>;
    };
  };
}

export type ProductSlugs = ReadonlyArray<ProductSlug>;

export interface ProductElement extends ProductCoreSlug {
  branding: Brand;
  categoryWeb: CategorySlug;
  product: Pick<Product, 'description' | 'title'>;
}

export type ProductElements = ReadonlyArray<ProductElement>;

export interface ProductPage {
  title: string;
  seo: Seo | null;
  branding: Brand;
  product: Product;
}

export type ProductPages = ReadonlyArray<ProductPage>;

export interface Article {
  title: string;
  subtitle: string | null;
  image: Image | null;
  body: null | RichText;
  thumbnail: Image;
  coverPicture: Image;
  summary: null | RichText;
  keyPoints: null | ReadonlyArray<string>;
  reportDocument: ResearchDocument;
  authorsCollection: {
    items: ReadonlyArray<Author>;
  };
}

export interface ArticleSlug {
  articleSlug: string;
}

export type ArticleSlugs = ReadonlyArray<ArticleSlug>;

export interface ArticlePageSlug extends ArticleSlug {
  category: CategorySlug;
  product: ProductCoreSlug;
}

export type ArticlePageSlugs = ReadonlyArray<ArticlePageSlug>;

export interface ArticleElement extends ArticleSlug {
  category: CategorySlug;
  article: Pick<Article, 'title' | 'thumbnail' | 'coverPicture'>;
  product: Omit<ProductElement, 'categoryWeb'>;
  publishedDate: string;
}

export interface ArticleCategoryElements extends ArticleSlug {
  category: {
    category: {
      title: string;
    };
  } & CategorySlug;
  article: Pick<Article, 'title' | 'thumbnail' | 'coverPicture' | 'subtitle'>;
  product: Omit<ProductElement, 'categoryWeb'>;
  publishedDate: string;
}

export type ArticleElements = ReadonlyArray<ArticleElement>;

export interface ArticlePage {
  title: string;
  seo: Seo | null;
  product: Omit<ProductElement, 'categoryWeb'>;
  publishedDate: string;
  article: Article;
}

export type ArticlePages = ReadonlyArray<ArticlePage>;

// special types

export interface ProductElementsWithArticleElement extends ProductElement {
  linkedFrom: {
    articleWebCollection: {
      items: ReadonlyArray<Omit<ArticleElement, 'category'>>;
    };
  };
}

export type ProductElementsWithArticleElements =
  ReadonlyArray<ProductElementsWithArticleElement>;

// some fanacy stuff

export interface HomePage {
  seo: Seo | null;
  mainArticle: HomeArticleElement;
  subArticle1: HomeArticleElement;
  subArticle2: HomeArticleElement;
  subArticle3: HomeArticleElement;
  subArticle4: HomeArticleElement;
}

export interface HomeArticleElement extends ArticleSlug {
  category: CategorySlug;
  product: Omit<ProductElement, 'categoryWeb'>;
  publishedDate: string;
  article: Pick<Article, 'title' | 'subtitle' | 'coverPicture'>;
}

export interface CategoryAndArticle extends CategoryElement {
  linkedFrom: {
    articleWebCollection: {
      items: ArticleElements;
    };
  };
}

export type CategoriesAndArticles = ReadonlyArray<CategoryAndArticle>;

export interface CallToAction {}

export interface PromotionElement {
  title: string;
  subtitle: string;
  image: Image;
  points: ReadonlyArray<string>;
}

export interface Subscription {
  stripeProductId: string;
  name: string;
  description: string;
  image: Image;
  features: ReadonlyArray<string>;
  linkedFrom: {
    subscriptionWebCollection: {
      items: SubscriptionWebs;
    };
  };
}

export type Subscriptions = ReadonlyArray<Subscription>;

export interface SubscriptionSlug {
  subscriptionSlug: string;
}

export type SubscriptionSlugs = ReadonlyArray<SubscriptionSlug>;

export interface SubscriptionWeb extends SubscriptionSlug {
  title: string;
  label: string;
}

export type SubscriptionWebs = ReadonlyArray<SubscriptionWeb>;

export interface SubscriptionPage {
  title: string;
  subscription: Omit<Subscription, 'linkedFrom'>;
}

export interface ProductAvert {
  title: string;
  caption: string;
  description: string;
  features: ReadonlyArray<string>;
  sampleReport: ResearchDocument;
  image: Image;
  productImage: Image;
  landingPageImage: Image;
  logo: Image;
  themeImage: Image;
}

// TODO: update this mess later on :sigh:
export interface ProductAdvertElement extends ProductCoreSlug {
  product: ProductAvert;
}

export interface ProductLandingPage extends ProductCoreSlug {
  subscriptionPage: {
    subscriptionSlug: string;
    subscription: Omit<Subscription, 'linkedFrom' | 'image'>;
  };
  seo: Seo | null;
  product: Omit<ProductAvert, 'image'>;
}

export interface LandingPage {
  title: string;
  seo: Seo | null;
  productsCollection: {
    items: ReadonlyArray<ProductAdvertElement>;
  };
}

// archived stuff

export interface ArchivePageSlug {
  slug: string;
}

export type ArchivePageSlugs = ReadonlyArray<ArchivePageSlug>;

export interface Seo {
  name: string;
  title: string;
  description: string;
  keywords: Readonly<string> | null;
}

export interface Tag {
  name: string;
}

export type Tags = ReadonlyArray<Tag>;

export interface ArchivePage extends ArchivePageSlug {
  title: string;
  seo: Seo;
  sys: System;
  content: {
    subtitle: string;
    image: Image;
    publishDate: string;
    tagsCollection: {
      items: Tags;
    };
    authorsCollection: {
      items: ReadonlyArray<{
        name: string;
        slug: string;
        title: string;
        image: Image;
      }>;
    };
    publicSnippet: RichText;
    content: RichText;
    linkToReport: null | ResearchDocument;
  };
}

export interface SubscriptionProductID {
  productId: string;
}

export type SubscriptionProducts = ReadonlyArray<SubscriptionProductID>;
