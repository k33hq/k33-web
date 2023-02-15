import { Document } from '@contentful/rich-text-types';
import React from 'react';

export interface System {
  id: string;
  firstPublishedAt: string;
}

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

export interface Author {
  name: string;
  title: string;
  profilePicture: Image;
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
  category: Category;
}

export type CategoryPages = ReadonlyArray<CategoryPage>;

export interface Product {
  title: string;
  description: string;
  image: Image;
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
  sys: Pick<System, 'firstPublishedAt'>;
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
  article: Pick<Article, 'title' | 'sys' | 'thumbnail' | 'coverPicture'>;
  product: Omit<ProductElement, 'categoryWeb'>;
}

export type ArticleElements = ReadonlyArray<ArticleElement>;

export interface ArticlePage {
  title: string;
  product: Omit<ProductElement, 'categoryWeb'>;
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
  mainArticle: HomeArticleElement;
  subArticle1: HomeArticleElement;
  subArticle2: HomeArticleElement;
  subArticle3: HomeArticleElement;
  subArticle4: HomeArticleElement;
}

export interface HomeArticleElement extends ArticleSlug {
  category: CategorySlug;
  product: Omit<ProductElement, 'categoryWeb'>;
  article: Pick<Article, 'title' | 'subtitle' | 'sys' | 'coverPicture'>;
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
