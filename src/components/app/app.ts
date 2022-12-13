import Plp from '../product-list-page/plp'

import products from '../../data/products.json';

class App {
   plp: Plp;

   constructor() {
      this.plp = new Plp();
   }

   start() {
      this.plp.markup();
      this.plp.drawAside();
      this.plp.drawSort();
      this.plp.drawProducts(products.products);
   }
}
export default App;