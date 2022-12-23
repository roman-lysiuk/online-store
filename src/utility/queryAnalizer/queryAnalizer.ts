import type { IProduct } from '../../interfaces';
import Error404 from '../../components/error/error' 


// cat = category
// br = brand
// prmin = minimal price
// prmax = maximum price
// stmin = minimum stock
// stmax = maximum stock
// so = sorting
// se = searching
// vi = viewing 2 or 3 columns

class QueryAnalizer {
   error404: Error404;
   constructor() {
      this.error404 = new Error404();
   }
    handleQuery(products: IProduct[], query: string[]): IProduct[] {
      let handledProducts: IProduct[] = [];
      let categories: string[] = [];
      let brands: string[] = [];
      query.forEach((el) => {
         const queryParam = el.split('=');
         if (!queryParam[1]) {
            this.error404.drawErrorPage();
         } else {
            switch (queryParam[0]) {
               case "cat":
                  categories.push(queryParam[1].replace('%', ' '))
                  break;
               case "br":
                  brands.push(queryParam[1].replace('%', ' '))
                  break;
            }
            handledProducts = products.filter(item => categories.includes(item.category));
            if (handledProducts.length) {
               handledProducts = handledProducts.filter(item => brands.includes(item.brand));
            } else {
               handledProducts = products.filter(item => brands.includes(item.brand));
            }
         }
       })
      return handledProducts;
     }
}
export default QueryAnalizer;
