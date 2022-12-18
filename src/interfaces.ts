export interface IProduct {
  id: number;
  title: string;
  category: string;
  rating: number;
  brand: string;
  description: string;
  price: number;
  stock: number;
  thumbnail: string;
  images: Array<string>;
}
