import Error404 from '../../components/error/error';
import Pdp from '../../components/product-detail-page/pdp';
import Plp from '../../components/product-list-page/plp';
import CartPage from '../../components/cart/cart-page';
import Cart from '../../components/cart/cart';
import QueryAnalizer from '../queryAnalizer/queryAnalizer';

import products from '../../data/products.json';

import { IFilter, IProduct } from '../../interfaces';

class Router {
  error404: Error404;
  pdp: Pdp;
  plp: Plp;
  cartPage: CartPage;
  queryAnalizer: QueryAnalizer;
  constructor() {
    this.error404 = new Error404();
    this.pdp = new Pdp();
    this.plp = new Plp();
    this.cartPage = new CartPage();
    this.queryAnalizer = new QueryAnalizer();
  }
  handleRoute(location: string): void {
    const urlString: Array<string> = location.split('?');
    const adress: Array<string> = urlString[0].split('/');
    let query: Array<string> = [];
    if (urlString[1]) {
      query = urlString[1].split('&');
    }
    switch (adress[1]) {
      case 'pdp':
        this.showPdp(adress, location);
        break;
      case 'plp':
        this.showPlp(location, query);
        break;
      case 'cart':
        this.showCart(location, query);
        break;
      default:
        this.showError();
    }
  }
  showPdp(adress: Array<string>, location: string): void {
    const item = products.products.filter((el) => el.id.toString() === adress[2]);
    if (item[0]) {
      localStorage.setItem('URLSave', location);
      this.pdp.drawPdp(item[0]);
    } else {
      this.showError();
    }
  }
  showPlp(location: string, query: string[] | undefined): void {
    localStorage.setItem('URLSave', location);
    if (query?.length) {
      const choosedFilters: IFilter = this.queryAnalizer.handleQuery(query);
      const filteredProducts: IProduct[] = this.queryAnalizer.applyQuery(products.products, choosedFilters);
      this.plp.drawPlp(filteredProducts, choosedFilters);
    } else {
      this.plp.drawPlp(products.products);
    }
  }
  showCart(location: string, query: string[] | undefined): void {
    localStorage.setItem('URLSave', location);
    const copyCart: Cart = Cart.getInstance();
    if (query?.length) {
      const choosedFilters: IFilter = this.queryAnalizer.handleQuery(query);
      this.cartPage.drawCartPage(copyCart.allProductCart, choosedFilters);
    } else {
      this.cartPage.drawCartPage(copyCart.allProductCart);
    }
  }
  showError(): void {
    this.error404.drawErrorPage();
  }
}

export default Router;
