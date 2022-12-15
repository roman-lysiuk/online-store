import Plp from '../product-list-page/plp';

import products from '../../data/products.json';

class App {
  plp: Plp;

  constructor() {
    this.plp = new Plp();
  }

  start() {
    this.plp.drawAside(products.products);
    this.plp.drawSort();
    this.plp.showAsideMobile();
    this.plp.drawProducts(products.products);
  }
}
export default App;
