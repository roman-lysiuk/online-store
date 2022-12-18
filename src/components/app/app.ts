import  Router  from '../../utility/router/router'

import CartPage from '../cart/cart-page';

class App {
  router: Router;

  constructor() {
    this.router = new Router();
  }

  start() {
    window.location.hash = `#/plp`;


    window.addEventListener('load', () => {
      const location = window.location.hash;
      console.log('location', location);

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
    
  }
}
export default App;
