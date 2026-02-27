export interface Product {
  name: string;
  image: string;
  url: string | null;
}

export interface ProductData {
  category: string;
  source_url: string;
  total_products: number;
  nsf_products: number;
  other_products: number;
  products: Product[];
  prices_found: number;
  price_samples: string[];
}
