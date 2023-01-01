import Cart from '../components/cart/cart';
import App from '../components/app/app';

describe('Cart', () => {
  const copyCart = Cart.getInstance();
  // const app = new App();
  beforeAll(() => {
    // app.start();
  });
  beforeEach(() => {
    copyCart.allUsedPromoCode = {};
  });

  test('add promo code', () => {
    const promo = ['test', 'promo', 'test2', 'test3'];

    promo.forEach((el) => copyCart.addPromoCode(el));

    expect(Object.keys(copyCart.allUsedPromoCode).length).toBe(promo.length);
  });
  test('is validation promo', () => {
    const promo = ['test', 'promo', 'test2', 'test3'];

    promo.forEach((el) => copyCart.addPromoCode(el));

    expect(copyCart.isValidationPromo('test')).toBe(false);
    expect(copyCart.isValidationPromo('promo')).toBe(true);
    expect(copyCart.isValidationPromo('test2')).toBe(false);
    expect(copyCart.isValidationPromo('test3')).toBe(false);
  });

  test('delete promo code', () => {
    copyCart.addPromoCode('test');
    copyCart.addPromoCode('test2');
    copyCart.addPromoCode('promo');
    copyCart.deletePromoCode('test');
    expect(copyCart.allUsedPromoCode).not.toHaveProperty('test');
    copyCart.deletePromoCode('test2');
    expect(copyCart.allUsedPromoCode).not.toHaveProperty('test2');
    copyCart.deletePromoCode('promo');
    expect(copyCart.allUsedPromoCode).not.toHaveProperty('promo');
  });
});

const product = {
  id: 1,
  title: 'iPhone 9',
  description: 'An apple mobile which is nothing like apple',
  price: 549,
  discountPercentage: 12.96,
  rating: 4.69,
  stock: 94,
  brand: 'Apple',
  category: 'smartphones',
  thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
  images: [
    'https://i.dummyjson.com/data/products/1/1.jpg',
    'https://i.dummyjson.com/data/products/1/3.jpg',
    'https://i.dummyjson.com/data/products/1/4.jpg',
  ],
};

const objectProductCart = {
  item: product,
  quantity: 0,
};

const AllProductCart = new Map();
AllProductCart.set(objectProductCart.item.id, objectProductCart);
