export interface IProduct {
  id: number;
  title: string;
  category: string;
  rating: number;
  brand: string;
  description: string;
  price: number;
  discountPercentage: number;
  stock: number;
  thumbnail: string;
  images: Array<string>;
}

export interface IFilter {
  categories: string[];
  brands: string[];
  minPrice: string;
  maxPrice: string;
  minStock: string;
  maxStock: string;
  sorting: string;
  search: string;
  view: string;
  cartPageSize: string;
  cartPageNumber: string;
}
export interface IObjectProductCart {
  item: IProduct;
  quantity: number;
}
export type allProductCart = Map<number, IObjectProductCart>;

export interface IAllUsedPromo {
  [key: string]: number;
}
