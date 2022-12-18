import Error404 from '../../components/error/error' 
import Pdp from '../../components/product-detail-page/pdp';
import Plp from '../../components/product-list-page/plp';

import products from '../../data/products.json';

class Router {
   error404: Error404;
   pdp: Pdp;
   plp: Plp;
   constructor() {
      this.error404 = new Error404();
      this.pdp = new Pdp();
      this.plp = new Plp;
   }
 
   handleRoute(location: string) {
      const adress: Array<string> = location.split('/');
      console.log(adress);
      switch (adress[1]) {
         case "pdp":
            this.showPdp(adress);
            break;
         case "plp":
            this.showPlp();
            break;
         case "cart":
            console.log('cart');
            break;
         default:
            this.showError();
     }
   }
   showPdp (adress: Array<string>) {
   const item = products.products.filter(el => el.id.toString() === adress[2]);
   if (item[0]) {
      this.pdp.drawPdp(item[0]);
   } else {
      this.showError();
   }
   }

   showPlp () {
      this.plp.drawAside(products.products);
      this.plp.drawSort();
      this.plp.showAsideMobile();
      this.plp.drawProducts(products.products);
   }

   showCart () {
      
   }

   showError () {
      this.error404.drawError();
   }
 }
 export default Router;