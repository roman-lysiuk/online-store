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
      let minPrice: string = '';
      let maxPrice: string = '';
      let minStock: string = '';
      let maxStock: string = '';
      query.forEach((el) => {
         const queryParam = el.split('=');
         console.log(queryParam);
         if (!queryParam[1]) {
            this.error404.drawErrorPage();
         } else {
            switch (queryParam[0]) {
              case "cat":
                categories.push(queryParam[1].replace('%', ' '))
                console.log(categories);
                break;
              case "br":
                brands.push(queryParam[1].replace('%', ' '))
                break;
              case "prmin":
                minPrice = queryParam[1];
                break;
              case "prmax":
                maxPrice = queryParam[1];
                break;
              case "stmin":
                minStock = queryParam[1];
                break;          
              case "stmax":
                maxStock = queryParam[1];
                break;          
            }
            if (categories.length) {
              handledProducts = products.filter(item => categories.includes(item.category));
            }
            if (brands.length) {
              if (handledProducts.length) {
                handledProducts = handledProducts.filter(item => brands.includes(item.brand));
              } else {
                handledProducts = products.filter(item => brands.includes(item.brand));
              }
            }
            if (minPrice) {
              if (handledProducts.length) {
                handledProducts = handledProducts.filter(item => item.price >= Number(minPrice));
              } else {
                handledProducts = products.filter(item => item.price >= Number(minPrice));
              }
            }
            if (maxPrice) {
              if (handledProducts.length) {
                handledProducts = handledProducts.filter(item => item.price <= Number(maxPrice));
              } else {
                handledProducts = products.filter(item => item.price <= Number(maxPrice));
              }
            }
            if (minStock) {
              if (handledProducts.length) {
                handledProducts = handledProducts.filter(item => item.stock >= Number(minStock));
              } else {
                handledProducts = products.filter(item => item.stock >= Number(minStock));
              }
            }
            if (maxStock) {
              if (handledProducts.length) {
                handledProducts = handledProducts.filter(item => item.stock <= Number(maxStock));
              } else {
                handledProducts = products.filter(item => item.stock <= Number(maxStock));
              }
            }
         }
       })
      return handledProducts;
     }
}
export default QueryAnalizer;
