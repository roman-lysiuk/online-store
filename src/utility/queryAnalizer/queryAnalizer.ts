import type { IProduct } from '../../interfaces';
import Error404 from '../../components/error/error' 
import Plp from '../../components/product-list-page/plp';


// cat = category
// br = brand
// prmin = minimal price
// prmax = maximum price
// stmin = minimum stock
// stmax = maximum stock
// so = sorting
//    prup = from low price to high
//    prdown = from high price to low
//    rateup = from low rate to high
//    ratedown = from high rate to low
// se = searching
// vi = viewing 2 or 3 columns

class QueryAnalizer {
  error404: Error404;
  plp: Plp;
  constructor() {
    this.error404 = new Error404();
    this.plp = new Plp();
  }
  handleQuery(products: IProduct[], query: string[]): IProduct[] {
    let handledProducts: IProduct[] = [];
    let categories: string[] = [];
    let brands: string[] = [];
    let minPrice: string = '';
    let maxPrice: string = '';
    let minStock: string = '';
    let maxStock: string = '';
    let sorting: string = '';
    let search: string = '';
    let view: string = '';
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
          case "so":
            sorting = queryParam[1];
          break;     
          case "se":
            search = queryParam[1];
          break;    
          case "vi":
            view = queryParam[1];
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
        if (search) {
          handledProducts = products.filter(item => item.title.toLocaleLowerCase().includes(search) || item.description.toLocaleLowerCase().includes(search) 
          || item.price.toString().includes(search) ||item.discountPercentage.toString().includes(search) 
          || item.rating.toString().includes(search) ||item.stock.toString().includes(search) 
          || item.brand.toLocaleLowerCase().includes(search) || item.category.toLocaleLowerCase().includes(search));
        }
        if (sorting) {
          if (handledProducts.length) {
            switch (sorting) {
              case 'prup':
                handledProducts = handledProducts.sort((a,b) => a.price - b.price);
                break;
              case 'prdown':
                handledProducts = handledProducts.sort((a,b) => b.price - a.price);
                break;
              case 'rateup':
                handledProducts = handledProducts.sort((a,b) => a.rating - b.rating);
                break;
              case 'ratedown':
                handledProducts = handledProducts.sort((a,b) => b.rating - a.rating);
                break;
            }
          } else {
            switch (sorting) {
              case 'prup':
                handledProducts = products.sort((a,b) => a.price - b.price);
                break;
              case 'prdown':
                handledProducts = products.sort((a,b) => b.price - a.price);
                break;
              case 'rateup':
                handledProducts = products.sort((a,b) => a.rating - b.rating);
                break;
              case 'ratedown':
                handledProducts = products.sort((a,b) => b.rating - a.rating);
                break;
            }
          }
        }
        if (view) {
          const items = document.querySelectorAll('.product');
          if (Number(view) === 3) {
            this.plp.changeCardView('three-columns');
          } else {
            this.plp.changeCardView('four-columns');
          }
        }
      }
    })
    if (!handledProducts.length) {
      handledProducts = products;
    }
    return handledProducts;
  }
}
export default QueryAnalizer;
