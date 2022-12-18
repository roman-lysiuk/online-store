import Plp from '../product-list-page/plp';

import products from '../../data/products.json';

import CartPage from '../cart/cart-page';

class App {
  plp: Plp;
  cartPage: CartPage;

  constructor() {
    this.plp = new Plp();
    this.cartPage = new CartPage();
  }

  start() {
    this.plp.drawAside(products.products);
    this.plp.drawSort();
    this.plp.showAsideMobile();
    this.plp.drawProducts(products.products);
    this.cartPage.showCartPage();
  }
}
export default App;
