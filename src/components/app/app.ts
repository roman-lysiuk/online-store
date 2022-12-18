import  Router  from '../../utility/router/router'

import CartPage from '../cart/cart-page';

class App {
  router: Router;
  cartPage: CartPage;

  constructor() {
    this.router = new Router();
    this.cartPage = new CartPage();
  }

  start() {
    this.cartPage.showCartPage();
    document.querySelector('header__logo')?.addEventListener('click', () => window.location.hash = '#/plp');
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
    
    document.querySelector('.header__logo')?.addEventListener('click', () => window.location.hash = '#/plp');
  }
}
export default App;
