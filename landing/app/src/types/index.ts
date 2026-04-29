export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  categorySlug: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  image: string;
  images: string[];
  sku: string;
  specs: Record<string, string>;
  description: string;
  compatibility: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CarMake {
  name: string;
  models: CarModel[];
}

export interface CarModel {
  name: string;
  years: string[];
}
