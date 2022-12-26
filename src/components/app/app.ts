import locStorage from '../../utility/localStorage/local-storage';
import Router from '../../utility/router/router';
import BuyNowModal from '../buy-now-modal/buy-now-modal';
import Cart from '../cart/cart';

import CartPage from '../cart/cart-page';
import Plp from '../product-list-page/plp';

class App {
  router: Router;
  cartPage: CartPage;
  buyNowModal: BuyNowModal;
  copyCart: Cart;
  locStorage: locStorage;

  constructor() {
    this.router = new Router();
    this.cartPage = new CartPage();
    this.buyNowModal = new BuyNowModal();
    this.copyCart = Cart.getInstance();
    this.locStorage = new locStorage();
  }

  start() {
    window.addEventListener('load', () => this.locStorage.getLocalStorage('allProductCart'));
    this.cartPage.showCartPage();
    this.buyNowModal.drawBuyNowModal();
    document.querySelector('header__logo')?.addEventListener('click', () => (window.location.hash = '#/plp'));
    const URLSave = localStorage.getItem('URLSave');
    if (URLSave) {
      window.location.hash = URLSave;
    } else {
      window.location.hash = `#/plp`;
    }

    window.addEventListener('load', () => {
      const location = window.location.hash;

      if (location) {
        this.router.handleRoute(location);
      }
    });

    window.addEventListener('hashchange', () => {
      const location = window.location.hash;

      if (location) {
        this.router.handleRoute(location);
      }
    });

    document.querySelector('.header__logo')?.addEventListener('click', () => (window.location.hash = '#/plp'));
    window.addEventListener('beforeunload', () =>
      this.locStorage.setLocalStorage('allProductCart', this.copyCart.allProductCart)
    );
  }
}
export default App;
