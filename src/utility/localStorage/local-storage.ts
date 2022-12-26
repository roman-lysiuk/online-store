import Cart from '../../components/cart/cart';
import { IProduct } from '../../interfaces';

class locStorage {
  copyCart: Cart;
  constructor() {
    this.copyCart = Cart.getInstance();
  }
  setLocalStorage<T>(name: string, value: T): void {
    if (value instanceof Map) {
      const valueArray = Array.from(value);
      localStorage.setItem(name, `${JSON.stringify(valueArray)}`);
    } else {
      localStorage.setItem(name, `${JSON.stringify(value)}`);
    }
  }
  getLocalStorage(name: string) {
    if (localStorage.getItem(name)) {
      switch (name) {
        case 'allProductCart':
          const valueArray: Array<
            [
              number,
              {
                item: IProduct;
                quantity: number;
              }
            ]
          > = JSON.parse(<string>localStorage.getItem(name));
          const mapData: Map<number, { item: IProduct; quantity: number }> = valueArray.reduce((acc, cur) => {
            return acc.set(cur[1].item.id, cur[1]);
          }, new Map());
          this.copyCart.allProductCart = mapData;
          break;
      }
    }
  }
}
export default locStorage;
