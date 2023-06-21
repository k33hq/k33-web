import {
  ArticleSlug,
  ArticlePage,
  ArticleWebCollection,
  ArticleSeo,
  SubscriptionProductCollection,
  SubscriptionProduct,
  ArticleWebWidget,
  ArticleSummaryWidget,
  ArticleSummaryWithCover,
  HomePage,
} from './contentful';
import { SeoData } from './contentful/Seo';
import { ProductStatus } from './payments';

export type GetArticleSlugsResponse = ArticleWebCollection<ArticleSlug>;
export type GetArticleSeoResponse = ArticleWebCollection<ArticleSeo>;
export type GetArticlePageResponse = ArticleWebCollection<ArticlePage>;
export type GetSubscriptionProductResponse =
  SubscriptionProductCollection<SubscriptionProduct>;

// payments

export interface CheckOutSessionRequest {
  price_id: string;
  success_url: string;
  cancel_url: string;
}

export interface CheckoutSessionResponse {
  url: string;
  expires_at: string;
}

export interface CustomerPortalSessionRequest {
  return_url: string;
}

export interface CustomerPortalSessionResponse {
  url: string;
  return_url: string;
}

export interface GetProductsResponse {
  subscribedProducts: ReadonlyArray<string>;
}

export interface GetProductInfoResponse {
  product_id: string;
  status: ProductStatus;
}

//market insight

export type GetArticleWebWidgetsResponse =
  ArticleWebCollection<ArticleWebWidget>;

export type GetArticleSummaryWidgetResponse =
  ArticleWebCollection<ArticleSummaryWidget>;

export type GetArticleSummaryWithCoverResponse =
  ArticleWebCollection<ArticleSummaryWithCover>;

export interface GetHomePageResponse {
  homePage: HomePage;
}
