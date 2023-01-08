import Cart from '../components/cart/cart';
import { IObjectProductCart, IProduct } from '../interfaces';

const copyCart = Cart.getInstance();

class Product implements IProduct {
  constructor(id: number) {
    this.id = id;
  }
  id: number;
  title = 'Title';
  category = 'category';
  rating = 4;
  brand = 'brand';
  description = 'description';
  price = 10;
  discountPercentage = 12;
  stock = 5;
  thumbnail = '';
  images: string[] = [];
}
const product1 = new Product(1);
const product2 = new Product(2);
const product3 = new Product(3);

const objectProductCart: IObjectProductCart = {
  item: product1,
  quantity: 1,
};

describe('Promo code ', () => {
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

describe('Cart ', () => {
  beforeEach(() => {
    copyCart.clearCart();
  });
  test('is Map', () => {
    expect(copyCart.allProductCart).toBeInstanceOf(Map);
  });

  test('add to one product', () => {
    const result = new Map();
    result.set(product1.id, objectProductCart);

    copyCart.addToCart(product1);

    expect(copyCart.allProductCart).toEqual(result);
  });
  test('add five quantity product in cart', () => {
    copyCart.addToCart(product1);
    copyCart.addOneQuantity(product1);
    copyCart.addOneQuantity(product1);
    copyCart.addOneQuantity(product1);
    copyCart.addOneQuantity(product1);
    const productQuantity = copyCart.allProductCart.get(product1.id)?.quantity;
    expect(productQuantity).toEqual(5);
  });
  test('remove two quantity product in cart', () => {
    copyCart.addToCart(product1);
    copyCart.addOneQuantity(product1);
    copyCart.addOneQuantity(product1);
    copyCart.addOneQuantity(product1);
    copyCart.addOneQuantity(product1);
    copyCart.removeOneQuantity(product1);
    copyCart.removeOneQuantity(product1);
    const productQuantity = copyCart.allProductCart.get(product1.id)?.quantity;
    expect(productQuantity).toEqual(3);
  });
  test('remove one product in cart', () => {
    copyCart.addToCart(product1);
    copyCart.addToCart(product2);
    copyCart.addToCart(product3);
    expect(copyCart.allProductCart.size).toEqual(3);
    copyCart.removeProductFromCart(product2);
    expect(copyCart.allProductCart.size).toEqual(2);
    expect(copyCart.allProductCart).not.toEqual(product2.id);
  });
  test('checking if a product is in the cart', () => {
    copyCart.addToCart(product1);
    copyCart.addToCart(product3);
    expect(copyCart.inCart(product1)).toBe(true);
    expect(copyCart.inCart(product2)).toBe(false);
    expect(copyCart.inCart(product3)).toBe(true);
  });
  test('total Item in the cart', () => {
    copyCart.addToCart(product1);
    copyCart.addOneQuantity(product1);
    copyCart.addOneQuantity(product1);
    copyCart.addOneQuantity(product1);
    copyCart.addOneQuantity(product1);
    expect(copyCart.totalCartItem()).toBe(5);
    copyCart.addToCart(product3);
    copyCart.addOneQuantity(product3);
    copyCart.addOneQuantity(product3);
    copyCart.addOneQuantity(product3);
    copyCart.addOneQuantity(product3);
    expect(copyCart.totalCartItem()).toBe(10);
    copyCart.removeProductFromCart(product3);
    expect(copyCart.totalCartItem()).toBe(5);
  });
  test('total Money in the cart', () => {
    copyCart.addToCart(product1);
    copyCart.addOneQuantity(product1);
    copyCart.addOneQuantity(product1);
    copyCart.addOneQuantity(product1);
    copyCart.addOneQuantity(product1);
    expect(copyCart.totalCartMoney()).toBe(50);
    copyCart.addToCart(product3);
    copyCart.addOneQuantity(product3);
    copyCart.addOneQuantity(product3);
    copyCart.addOneQuantity(product3);
    copyCart.addOneQuantity(product3);
    expect(copyCart.totalCartMoney()).toBe(100);
    copyCart.removeProductFromCart(product3);
    expect(copyCart.totalCartMoney()).toBe(50);
  });
  test('clear Cart', () => {
    copyCart.addToCart(product1);
    copyCart.addToCart(product2);
    copyCart.addOneQuantity(product1);
    copyCart.addOneQuantity(product1);
    copyCart.addOneQuantity(product1);
    copyCart.addToCart(product3);
    copyCart.addOneQuantity(product3);
    copyCart.addOneQuantity(product3);
    copyCart.clearCart();
    expect(copyCart.allProductCart).toBeInstanceOf(Map);
    expect(copyCart.allProductCart.size).toBe(0);
  });
});
