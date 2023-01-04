import Error404 from '../../components/error/error';

import Plp from '../../components/product-list-page/plp';

import type { IProduct, IFilter } from '../../interfaces';

// cat = category
// br = brand
// prmin = minimal price
// prmax = maximum price
// stmin = minimum stock
// stmax = maximum stock
// so = sorting
//    price-abs = from low price to high
//    price-desc = from high price to low
//    rating-abs = from low rate to high
//    rating-desc = from high rate to low
// se = searching
// view = viewing 2 or 3 columns
// cpn = cart page number
// cps = cart page size (quantity of products on 1 page)

class QueryAnalizer {
  error404: Error404;
  plp: Plp;
  constructor() {
    this.error404 = new Error404();
    this.plp = new Plp();
  }
  handleQuery(query: string[]): IFilter {
    const choosedFilters: IFilter = {
      categories: [],
      brands: [],
      minPrice: '',
      maxPrice: '',
      minStock: '',
      maxStock: '',
      sorting: '',
      search: '',
      view: '',
      cartPageNumber: '',
      cartPageSize: '',
    };
    query.forEach((el) => {
      const queryParam: string[] = el.split('=');
      if (!queryParam[1]) {
        this.error404.drawErrorPage();
      } else {
        switch (queryParam[0]) {
          case 'cat':
            choosedFilters.categories.push(queryParam[1].split('%20').join(' '));
            break;
          case 'br':
            choosedFilters.brands.push(queryParam[1].split('%20').join(' '));
            break;
          case 'prmin':
            choosedFilters.minPrice = queryParam[1];
            break;
          case 'prmax':
            choosedFilters.maxPrice = queryParam[1];
            break;
          case 'stmin':
            choosedFilters.minStock = queryParam[1];
            break;
          case 'stmax':
            choosedFilters.maxStock = queryParam[1];
            break;
          case 'so':
            choosedFilters.sorting = queryParam[1];
            break;
          case 'se':
            choosedFilters.search = queryParam[1];
            break;
          case 'view':
            choosedFilters.view = queryParam[1];
            break;
          case 'cps':
            choosedFilters.cartPageSize = queryParam[1];
            break;
          case 'cpn':
            choosedFilters.cartPageNumber = queryParam[1];
            break;
          default:
            break;
        }
      }
    });
    return choosedFilters;
  }
  applyQuery(products: IProduct[], choosedFilters: IFilter): IProduct[] {
    let handledProducts: IProduct[] = Array.from(products);
    if (choosedFilters.categories.length) {
      handledProducts = handledProducts.filter((item) =>
        choosedFilters.categories.includes(item.category.toLowerCase())
      );
    }
    if (choosedFilters.brands.length) {
      handledProducts = handledProducts.filter((item) => choosedFilters.brands.includes(item.brand.toLowerCase()));
    }
    if (choosedFilters.minPrice) {
      handledProducts = handledProducts.filter((item) => item.price >= Number(choosedFilters.minPrice));
    }
    if (choosedFilters.maxPrice) {
      handledProducts = handledProducts.filter((item) => item.price <= Number(choosedFilters.maxPrice));
    }
    if (choosedFilters.minStock) {
      handledProducts = handledProducts.filter((item) => item.stock >= Number(choosedFilters.minStock));
    }
    if (choosedFilters.maxStock) {
      handledProducts = handledProducts.filter((item) => item.stock <= Number(choosedFilters.maxStock));
    }
    if (choosedFilters.search) {
      handledProducts = handledProducts.filter(
        (item) =>
          item.title.toLocaleLowerCase().includes(choosedFilters.search) ||
          item.description.toLocaleLowerCase().includes(choosedFilters.search) ||
          item.price.toString().includes(choosedFilters.search) ||
          item.discountPercentage.toString().includes(choosedFilters.search) ||
          item.rating.toString().includes(choosedFilters.search) ||
          item.stock.toString().includes(choosedFilters.search) ||
          item.brand.toLocaleLowerCase().includes(choosedFilters.search) ||
          item.category.toLocaleLowerCase().includes(choosedFilters.search)
      );
    }
    if (choosedFilters.sorting) {
      switch (choosedFilters.sorting) {
        case 'price-abs':
          handledProducts = handledProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          handledProducts = handledProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating-abs':
          handledProducts = handledProducts.sort((a, b) => a.rating - b.rating);
          break;
        case 'rating-desc':
          handledProducts = handledProducts.sort((a, b) => b.rating - a.rating);
          break;
      }
    }
    return handledProducts;
  }
}

export default QueryAnalizer;
