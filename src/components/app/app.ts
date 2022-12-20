import Router from '../../utility/router/router';
import BuyNowModal from '../buy-now-modal/buy-now-modal';

import CartPage from '../cart/cart-page';

class App {
  router: Router;
  cartPage: CartPage;
  buyNowModal: BuyNowModal;

  constructor() {
    this.router = new Router();
    this.cartPage = new CartPage();
    this.buyNowModal = new BuyNowModal();
  }

  start() {
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
  }
}
export default App;
