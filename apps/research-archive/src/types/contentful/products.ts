export interface StripeProductPrice {
  stripeProductId: string;
}

export interface SubscriptionProduct
  extends PricesCollection<StripeProductPrice> {
  productId: string;
}

export interface SubscriptionProductCollection<T extends object> {
  subscriptionProductCollection: {
    items: ReadonlyArray<T>;
  };
}

export interface PricesCollection<T extends object> {
  pricesCollection: {
    items: ReadonlyArray<T>;
  };
}
