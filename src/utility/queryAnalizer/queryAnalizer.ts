import type { IProduct, IFilter } from '../../interfaces';
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
  handleQuery(products: IProduct[], query: string[]): [IProduct[], IFilter] {
    let handledProducts: IProduct[] = products;

    const choosedFilters: IFilter = {
      categories : [],
      brands : [],
      minPrice : '',
      maxPrice : '',
      minStock : '',
      maxStock : '',
      sorting : '',
      search : '',
      view : '',
    }
  
    query.forEach((el) => {
      const queryParam = el.split('=');
      if (!queryParam[1]) {
        this.error404.drawErrorPage();
      } else {
        switch (queryParam[0]) {
          case "cat":
            choosedFilters.categories.push(queryParam[1].replace('%20', ' '));
          break;
          case "br":
            choosedFilters.brands.push(queryParam[1].replace('%20', ' '))
          break;
          case "prmin":
            choosedFilters.minPrice = queryParam[1];
          break;
          case "prmax":
            choosedFilters.maxPrice = queryParam[1];
          break;
          case "stmin":
            choosedFilters.minStock = queryParam[1];
          break;          
          case "stmax":
            choosedFilters.maxStock = queryParam[1];
          break;       
          case "so":
            choosedFilters.sorting = queryParam[1];
          break;     
          case "se":
            choosedFilters.search = queryParam[1];
          break;    
          case "vi":
            choosedFilters.view = queryParam[1];
          break;  
        }
      }
  })    
        if (choosedFilters.categories.length) {
          handledProducts = handledProducts.filter(item => choosedFilters.categories.includes(item.category.toLowerCase()));
        }
         if (choosedFilters.brands.length) {
          handledProducts = handledProducts.filter(item => choosedFilters.brands.includes(item.brand.toLowerCase()));
        }
        if (choosedFilters.minPrice) {
          handledProducts = handledProducts.filter(item => item.price >= Number(choosedFilters.minPrice));
        }
        if (choosedFilters.maxPrice) {
          handledProducts = handledProducts.filter(item => item.price <= Number(choosedFilters.maxPrice));
        }
        if (choosedFilters.minStock) {
          handledProducts = handledProducts.filter(item => item.stock >= Number(choosedFilters.minStock));
        }
        if (choosedFilters.maxStock) {
          handledProducts = handledProducts.filter(item => item.stock <= Number(choosedFilters.maxStock));
        }
        if (choosedFilters.search) {
          handledProducts = products.filter(item => item.title.toLocaleLowerCase().includes(choosedFilters.search) || item.description.toLocaleLowerCase().includes(choosedFilters.search) 
          || item.price.toString().includes(choosedFilters.search) ||item.discountPercentage.toString().includes(choosedFilters.search) 
          || item.rating.toString().includes(choosedFilters.search) ||item.stock.toString().includes(choosedFilters.search) 
          || item.brand.toLocaleLowerCase().includes(choosedFilters.search) || item.category.toLocaleLowerCase().includes(choosedFilters.search));
        }
        if (choosedFilters.sorting) {
          if (handledProducts.length) {
            switch (choosedFilters.sorting) {
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
            switch (choosedFilters.sorting) {
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
        if (choosedFilters.view) {
          if (Number(choosedFilters.view) === 3) {
            this.plp.changeCardView('three-columns');
          } else {
            this.plp.changeCardView('four-columns');
          }
        } 


    const data: [IProduct[], IFilter]= [handledProducts, choosedFilters];
    return data;
  }
}
export default QueryAnalizer;
