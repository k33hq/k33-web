import {
  ArticleSlug,
  ArticlePage,
  ArticleWebCollection,
  ArticleSeo,
} from './contentful';
import { ProductStatus } from './payments';

export type GetArticleSlugsResponse = ArticleWebCollection<ArticleSlug>;
export type GetArticleSeoResponse = ArticleWebCollection<ArticleSeo>;
export type GetArticlePageResponse = ArticleWebCollection<ArticlePage>;

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
