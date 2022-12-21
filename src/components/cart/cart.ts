import Plp from '../product-list-page/plp';

import type { IProduct } from '../../interfaces';

class Cart {
  // патерн singleton
  private static _instance: Cart;
  public allProductCart: Map<number, { item: IProduct; quantity: number }>;
  public allUsedPromoCode: { [key: string]: number };
  plp: Plp;
  constructor() {
    this.plp = new Plp();
    this.allProductCart = new Map();
    this.allUsedPromoCode = {};
  }

  public static getInstance(): Cart {
    if (!Cart._instance) {
      Cart._instance = new Cart();
    }

    return Cart._instance;
  }

  addToCart(item: IProduct): void {
    const objectProductCart = {
      item: item,
      quantity: 0,
    };
    if (this.allProductCart.has(item.id)) {
      this.removeProductFromCart(item);
    } else {
      this.allProductCart.set(item.id, objectProductCart);
      this.addOneQuantity(item);
    }
  }
  addOneQuantity(item: IProduct): void {
    const inStock = item.stock;
    const currentProduct = this.allProductCart.get(item.id);

    if (currentProduct) {
      const currentQuantityProduct = currentProduct.quantity;
      if (currentQuantityProduct < inStock) currentProduct.quantity += 1;
    }
    this.plp.showTotalItemCart();
    this.plp.showTotalCartMoney();
  }
  removeOneQuantity(item: IProduct): void {
    const currentProduct = this.allProductCart.get(item.id);
    if (currentProduct) {
      if (currentProduct.quantity === 1) {
        this.removeProductFromCart(item);
      } else {
        currentProduct.quantity -= 1;
      }
    }
    this.plp.showTotalItemCart();
    this.plp.showTotalCartMoney();
  }
  removeProductFromCart(item: IProduct) {
    if (this.allProductCart.has(item.id)) {
      this.allProductCart.delete(item.id);
      this.plp.showTotalItemCart();
      this.plp.showTotalCartMoney();
    }
  }

  changeButtonAddToCart(e?: Event) {
    const btnAddToCart: HTMLButtonElement | null = e?.target
      ? <HTMLButtonElement>e?.target
      : document.querySelector('.btn-add-cart');

    if (btnAddToCart) {
      btnAddToCart.classList.toggle('product-not-cart');
      if (btnAddToCart.classList.contains('product-not-cart')) {
        btnAddToCart.textContent = 'Add to Cart';
      } else {
        btnAddToCart.textContent = 'Drop from Cart';
      }
    }
  }
  inCart(item: IProduct): boolean {
    const result = [];
    this.allProductCart.forEach((el) => {
      if (el.item.id === item.id) result.push(item);
    });
    return result.length > 0 ? true : false;
  }
  totalCartItem(): number {
    let totalItem = 0;
    this.allProductCart.forEach((item) => (totalItem += item.quantity));
    return totalItem;
  }
  totalCartMoney(): number {
    let totalMoney = 0;
    this.allProductCart.forEach((item) => (totalMoney += item.item.price * item.quantity));
    return +totalMoney.toFixed(2);
  }
  totalCartMoneyUsedPromo(): number {
    let totalMoney = 0;
    let totalDiscountPercent = 0;

    for (const key in this.allUsedPromoCode) {
      if (Object.prototype.hasOwnProperty.call(this.allUsedPromoCode, key)) {
        totalDiscountPercent += this.allUsedPromoCode[key];
      }
    }

    this.allProductCart.forEach((item) => (totalMoney += item.item.price * item.quantity));

    const totalDiscountMoney = totalMoney * (totalDiscountPercent / 100);
    return totalDiscountPercent > 0 ? totalMoney - totalDiscountMoney : totalMoney;
  }
  isValidationPromo(promo: string): boolean {
    switch (promo.toLowerCase()) {
      case 'promo':
        return true;
      case 'sale':
        return true;

      default:
        return false;
    }
  }
  addPromoCode(promo: string) {
    this.allUsedPromoCode[promo] = 15;
  }
  deletePromoCode(promo: string) {
    delete this.allUsedPromoCode[promo];
  }
  clearCart(): void {
    this.allProductCart = new Map();
    this.plp.showTotalItemCart();
  }
}
export default Cart;
