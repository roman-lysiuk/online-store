import type { IProduct } from '../../interfaces';

class Cart {
  // патерн singleton
  private static _instance: Cart;
  public allProductCart: Map<number, { item: IProduct; quantity: number }>;
  constructor() {
    this.allProductCart = new Map();
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
      quantity: 1,
    };
    if (this.allProductCart.has(item.id)) {
      this.removeProductFromCart(item);
    } else {
      this.allProductCart.set(item.id, objectProductCart);
    }
  }
  addOneQuantity(item: IProduct): void {
    const inStock = item.stock;
    const currentProduct = this.allProductCart.get(item.id);

    if (currentProduct) {
      const currentQuantityProduct = currentProduct.quantity;
      if (currentQuantityProduct < inStock) currentProduct.quantity += 1;
    }
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
  }
  removeProductFromCart(item: IProduct) {
    if (this.allProductCart.has(item.id)) {
      this.allProductCart.delete(item.id);
    }
  }
  changeButtonAddToCart(e?: Event) {
    const btnAddToCart: HTMLButtonElement | null = e?.target
      ? <HTMLButtonElement>e?.target
      : document.querySelector('.btn-add-cart');

    if (btnAddToCart) {
      if (btnAddToCart.classList.contains('.product-not-cart')) {
        btnAddToCart.textContent = 'Add to Cart';
      } else {
        btnAddToCart.textContent = 'Drop from Cart';
      }
      btnAddToCart.classList.toggle('.product-not-cart');
    }
  }
}
export default Cart;
