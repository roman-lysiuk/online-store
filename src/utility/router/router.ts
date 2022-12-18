import Error404 from '../../components/error/error' 
import Pdp from '../../components/product-detail-page/pdp';
import Plp from '../../components/product-list-page/plp';
import CartPage from '../../components/cart/cart-page';
import Cart from '../../components/cart/cart';

import products from '../../data/products.json';

class Router {
   error404: Error404;
   pdp: Pdp;
   plp: Plp;
   cartPage: CartPage;
   constructor() {
      this.error404 = new Error404();
      this.pdp = new Pdp();
      this.plp = new Plp();
      this.cartPage = new CartPage();
   }
 
   handleRoute(location: string) {
      const adress: Array<string> = location.split('/');
      console.log(adress);
      switch (adress[1]) {
         case "pdp":
            this.showPdp(adress, location);
            break;
         case "plp":
            this.showPlp(location);
            break;
         case "cart":
            this.showCart(location);
            break;
         default:
            this.showError();
     }
   }
   showPdp (adress: Array<string>, location: string) {
   const item = products.products.filter(el => el.id.toString() === adress[2]);
   if (item[0]) {
      localStorage.setItem('URLSave', location);
      this.pdp.drawPdp(item[0]);
   } else {
      this.showError();
   }
   }

   showPlp (location: string) {
      localStorage.setItem('URLSave', location);
      this.plp.drawAside(products.products);
      this.plp.drawSort();
      this.plp.showAsideMobile();
      this.plp.drawProducts(products.products);
   }

   showCart (location: string) {
      localStorage.setItem('URLSave', location);
      const copyCart = Cart.getInstance();
      this.cartPage.drawCartPage(copyCart.allProductCart);
   }

   showError () {
      this.error404.drawErrorPage();
   }
 }
 export default Router;
