import {
  ArticleSlug,
  ArticlePage,
  ArticleCollection,
  SubscriptionProductCollection,
  SubscriptionProduct,
  ArticleWebWidget,
  ArticleSummaryWidget,
  ArticleSummaryWithCover,
  HomePage,
  News,
} from './contentful';
import { SeoData } from './contentful/Seo';
import {
  IndexHome,
  IndexWebCollection,
  TokenValuationIndex,
} from './contentful/indexes';
import { ProductStatus } from './payments';

export type GetArticleSlugsResponse = ArticleCollection<ArticleSlug>;
export type GetArticlePageResponse = ArticleCollection<ArticlePage>;
export type GetSubscriptionProductResponse =
  SubscriptionProductCollection<SubscriptionProduct>;

// payments

export interface CheckOutSessionRequest {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutSessionResponse {
  url: string;
  expiresAt: string;
}

export interface CustomerPortalSessionRequest {
  returnUrl: string;
}

export interface CustomerPortalSessionResponse {
  url: string;
  returnUrl: string;
}

export interface GetProductsResponse {
  subscribedProducts: ReadonlyArray<string>;
}

export interface GetProductInfoResponse {
  productId: string;
  status: ProductStatus;
  priceId: string;
}

//market insight

export type GetArticleWidgetsResponse = ArticleCollection<ArticleWebWidget>;

export type GetArticleSummaryWidgetResponse =
  ArticleCollection<ArticleSummaryWidget>;

export type GetArticleSummaryWithCoverResponse =
  ArticleCollection<ArticleSummaryWithCover>;

export interface GetHomePageResponse {
  homePage: HomePage;
}

export interface NewsResponse {
  news: News;
}

// index

export type GetIndexesResponse = IndexWebCollection<IndexHome>;
export type GetIndexesSummaryResponse = IndexWebCollection<TokenValuationIndex>;

// supression group

export type SupressionGroupResponse = Array<{
  id: number;
  name: string;
  supressed: boolean;
}>;
