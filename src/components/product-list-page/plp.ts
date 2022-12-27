import Cart from '../cart/cart';

import products from '../../data/products.json';

import type { IProduct, IFilter } from '../../interfaces';

class Plp {
  drawPlp(data: IProduct[], choosedFilters?: IFilter): void {
    const tempProductListPage = <HTMLTemplateElement>document.querySelector('#template-plp');
    const cloneProductListPage = <HTMLElement>tempProductListPage.content.cloneNode(true);
    const main = document.querySelector('.main');
    if (cloneProductListPage && main) {
      main.innerHTML = '';
      main.append(cloneProductListPage);
    }
    const sortBarViewOptions = document.querySelector('.sort-bar__view-options');
    if (sortBarViewOptions) {
      sortBarViewOptions.addEventListener('click', (e) => {
        const currentElement: HTMLElement | null = <HTMLElement>e.target;
        this.changeCardView(currentElement.id);
      });
    }

    this.drawAside(products.products, choosedFilters);
    this.drawSort(choosedFilters);
    this.showTotalItemCart();
    this.showAsideMobile();
    this.drawProducts(data);
    this.drawSearch(choosedFilters);

    if (choosedFilters?.view === '4') {
      this.changeCardView('four-columns');
    } 

  }
  drawAside(data: IProduct[], choosedFilters?: IFilter): void {
    const btnReset: HTMLElement | null = document.querySelector('.btn-reset ');
    const btnCopy: HTMLElement | null = document.querySelector('.btn-copy-link');

    this.drawFilterCategory(data, choosedFilters);
    this.drawFilterBrand(data, choosedFilters);
    this.drawFilterPrice(data);
    this.drawFilterStock(data, choosedFilters);

    if (btnReset) btnReset.addEventListener('click', () => (window.location.hash = `#/plp`));
    if (btnCopy) btnCopy.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href);
      console.log(window.location.href);
      
    });
  }
  drawFilterStock(data: IProduct[], choosedFilters?: IFilter): void {
    const asideMaxStock: HTMLElement | null = document.querySelector('.aside__max-stock');
    const asideMinStock: HTMLElement | null = document.querySelector('.aside__min-stock');
    const asideRangeStockLower: HTMLInputElement | null = document.querySelector('.aside__range-stock_lower');
    const asideRangeStockUpper: HTMLInputElement | null = document.querySelector('.aside__range-stock_upper');

    const allStock = <Array<number>>[...data.reduce((acc, cur) => acc.add(cur.stock), new Set())];
    const allStockSort: number[] = allStock.sort((a, b) => a - b);

    if (asideMinStock) asideMinStock.textContent = `${allStockSort[0].toString()} pcs`;
    if (asideMaxStock) asideMaxStock.textContent = `${allStockSort[allStockSort.length - 1].toString()} pcs`;

    const minGapRange = 1;

    if (asideRangeStockLower && asideMinStock && asideMaxStock && asideRangeStockUpper) {
      asideRangeStockLower.min = '0';
      asideRangeStockUpper.max = allStock.length.toString();
      asideRangeStockLower.max = allStock.length.toString();
      asideRangeStockLower.value = '0';
      asideRangeStockUpper.value = allStock.length.toString();

/*       if (choosedFilters?.minStock) {
        asideRangeStockLower.value = ???
      } 
      if (choosedFilters?.maxStock) {
        asideRangeStockLower.value = ???
      } */

      asideRangeStockLower.addEventListener('input', () => {
        if (parseInt(asideRangeStockUpper.value) - parseInt(asideRangeStockLower.value) <= minGapRange) {
          asideRangeStockLower.value = `${parseInt(asideRangeStockUpper.value) - minGapRange}`;
        } else {
          asideMinStock.textContent = `${allStockSort[+asideRangeStockLower.value].toString()} pcs`;
          asideMinStock.dataset.value = allStockSort[+asideRangeStockLower.value].toString();
         }
      });

      asideRangeStockUpper.addEventListener('input', () => {
        if (parseInt(asideRangeStockUpper.value) - parseInt(asideRangeStockLower.value) <= minGapRange) {
          asideRangeStockUpper.value = `${parseInt(asideRangeStockLower.value) + minGapRange}`;
        } else {
          asideMaxStock.textContent = `${allStockSort[+asideRangeStockUpper.value].toString()} pcs`;
          asideMaxStock.dataset.value = allStockSort[+asideRangeStockUpper.value].toString();
        }
      });
    }
    asideRangeStockLower?.addEventListener('change', this.handleUrl);
    asideRangeStockUpper?.addEventListener('change', this.handleUrl);
  }
  drawFilterPrice(data: IProduct[], choosedFilters?: IFilter): void {
    const asideMaxPrice: HTMLElement | null = document.querySelector('.aside__max-price');
    const asideMinPrice: HTMLElement | null = document.querySelector('.aside__min-price');
    const asideRangePriceLower: HTMLInputElement | null = document.querySelector('.aside__range-price_lower');
    const asideRangePriceUpper: HTMLInputElement | null = document.querySelector('.aside__range-price_upper');

    const allPrice = <Array<number>>[...data.reduce((acc, cur) => acc.add(cur.price), new Set())];
    const allPriceSort: number[] = allPrice.sort((a, b) => a - b);

    if (asideMinPrice) asideMinPrice.textContent = `${allPriceSort[0].toString()} $`;
    if (asideMaxPrice) asideMaxPrice.textContent = `${allPriceSort[allPriceSort.length - 1].toString()} $`;

    if (asideRangePriceLower && asideMinPrice && asideMaxPrice && asideRangePriceUpper) {
      asideRangePriceLower.min = '0';
      asideRangePriceUpper.max = allPrice.length.toString();
      asideRangePriceLower.max = allPrice.length.toString();
      asideRangePriceLower.value = '0';
      asideRangePriceUpper.value = allPrice.length.toString();
      const minGap = 1;

/*       if (choosedFilters?.minStock) {
        asideRangePriceLower.value = ???
      } 
      if (choosedFilters?.maxStock) {
        asideRangePriceUpper.value = ???
      } */

      asideRangePriceLower.addEventListener('input', () => {
        if (parseInt(asideRangePriceUpper.value) - parseInt(asideRangePriceLower.value) <= minGap) {
          asideRangePriceLower.value = `${parseInt(asideRangePriceUpper.value) - minGap}`;
        } else {
          asideMinPrice.textContent = `${allPriceSort[+asideRangePriceLower.value].toString()} $`;
          asideMinPrice.dataset.value = allPriceSort[+asideRangePriceLower.value].toString();
        }
      });

      asideRangePriceUpper.addEventListener('input', () => {
        if (parseInt(asideRangePriceUpper.value) - parseInt(asideRangePriceLower.value) <= minGap) {
          asideRangePriceUpper.value = `${parseInt(asideRangePriceLower.value) + minGap}`;
        } else {
          asideMaxPrice.textContent = `${allPriceSort[+asideRangePriceUpper.value].toString()} $`;
          asideMaxPrice.dataset.value = allPriceSort[+asideRangePriceUpper.value].toString();
        }
      });
    }
    asideRangePriceLower?.addEventListener('change', this.handleUrl);
    asideRangePriceUpper?.addEventListener('change', this.handleUrl);
  }
  drawFilterCategory(data: IProduct[], choosedFilters?: IFilter): void {
    const fragmentCategory: DocumentFragment = document.createDocumentFragment();
    const asideFilterListCategory: HTMLElement | null = document.querySelector('.aside__filter-list-category');
    const allCategory = <Array<string>>[...data.reduce((acc, cur) => acc.add(cur.category), new Set())];

    allCategory.forEach((item) => {
      const newCategory = document.createElement('div');
      const label = document.createElement('label');
      const input = document.createElement('input');
      const span = document.createElement('span');

      const amountProductsCategory: number = data.filter((elem) => elem.category === item).length;

      newCategory.classList.add('checkbox-line');

      input.setAttribute('type', 'checkbox');
      input.setAttribute('id', item);
      input.classList.add('input-category');
      if (choosedFilters?.categories?.includes(item.toLowerCase())) input.checked = true;
      input.addEventListener('change', this.handleUrl);

      label.setAttribute('for', item);
      label.textContent = item;
      span.textContent = `(num/${amountProductsCategory})`;
      newCategory.appendChild(input);
      newCategory.appendChild(label);
      newCategory.appendChild(span);
      fragmentCategory.append(newCategory);
    });

    if (asideFilterListCategory) asideFilterListCategory.append(fragmentCategory);
  }

  drawFilterBrand(data: IProduct[], choosedFilters?: IFilter): void {
    const asideFilterListBrand: HTMLElement | null = document.querySelector('.aside__filter-list-brand');
    const fragmentBrand: DocumentFragment = document.createDocumentFragment();
    const allBrand = <Array<string>>[...data.reduce((acc, cur) => acc.add(cur.brand), new Set())];

    allBrand.forEach((item) => {
      const newBrand = document.createElement('div');
      const label = document.createElement('label');
      const input = document.createElement('input');
      const span = document.createElement('span');

      const amountProductsBrand: number = data.filter((elem) => elem.brand === item).length;

      newBrand.classList.add('checkbox-line');

      input.setAttribute('type', 'checkbox');
      input.setAttribute('id', item);

      input.classList.add('input-brand');
      if (choosedFilters?.brands?.includes(item.toLowerCase())) input.checked = true;
      input.addEventListener('change', this.handleUrl);

      label.setAttribute('for', item);
      label.textContent = item;

      span.textContent = `(num/${amountProductsBrand})`;

      newBrand.appendChild(input);
      newBrand.appendChild(label);
      newBrand.appendChild(span);

      fragmentBrand.append(newBrand);
    });

    if (asideFilterListBrand) asideFilterListBrand.append(fragmentBrand);
  }

  drawSort(choosedFilters?: IFilter) {
    const sortInput: HTMLInputElement | null = document.querySelector('.sort__options');
    sortInput?.addEventListener('change', this.handleUrl);
    if (choosedFilters?.sorting && sortInput) {
      sortInput.value = choosedFilters.sorting;
    }
  }

  drawSearch(choosedFilters?: IFilter) {
    const searchInput: HTMLInputElement | null = document.querySelector('#search');
    searchInput?.addEventListener('change', this.handleUrl);
    if (choosedFilters?.search && searchInput) {
      searchInput.value = choosedFilters.search;
    }
  }

  drawProducts(data: IProduct[]): void {
    const copyCart: Cart = Cart.getInstance();
    const fragment = document.createDocumentFragment();
    const productItemTemp = <HTMLTemplateElement>document.querySelector('#productItemTemp');
    const products: HTMLElement | null = document.querySelector('.products');

    data.forEach((item) => {
      const productClone = <HTMLElement>productItemTemp.content.cloneNode(true);
      const productItem: HTMLElement | null = productClone.querySelector('.product__item');
      const productTitle: HTMLElement | null = productClone.querySelector('.product__title');
      const productImage: HTMLElement | null = productClone.querySelector('.product__image');
      const productPrice: HTMLElement | null = productClone.querySelector('.product__price');
      const productRating: HTMLElement | null = productClone.querySelector('.product__rating');
      const productStock: HTMLElement | null = productClone.querySelector('.product__stock');
      const btnAddCart: HTMLButtonElement | null = productClone.querySelector('.btn-add-cart');
      const btnShowDetails: HTMLButtonElement | null = productClone.querySelector('.btn-show-details');

      if (productItem) productItem.setAttribute('data-id', item.id.toString());

      if (productImage) {
        productImage.addEventListener('click', () => (window.location.hash = `#/pdp/${item.id}`));

        productImage.style.backgroundImage = `url("${item.thumbnail}")`;
      }
      if (productTitle) productTitle.textContent = item.title;
      if (productPrice) productPrice.textContent = `Price: ${item.price.toString()} $`;
      if (productRating) productRating.textContent = `Rating: ${item.rating.toFixed(1).toString()}`;
      if (productStock) productStock.textContent = `Stock: ${item.stock.toString()}`;
      if (btnAddCart) {
        copyCart.changeButtonAddToCart();

        if (copyCart.inCart(item)) {
          btnAddCart.classList.remove('product-not-cart');
          btnAddCart.textContent = 'Drop from Cart';
        } else {
          btnAddCart.textContent = 'Add to Cart';
        }
        btnAddCart.addEventListener('click', (e) => {
          copyCart.changeButtonAddToCart(e);
          copyCart.addToCart(item);
        });
      }
      if (btnShowDetails) {
        btnShowDetails.textContent = 'Details';
        btnShowDetails.addEventListener('click', () => (window.location.hash = `#/pdp/${item.id}`));
      }

      fragment.append(productClone);
    });

    if (products) products.append(fragment);
  }

  showAsideMobile() {
    const asideArrowRight = document.querySelector('.aside__arrow-right');
    const aside = document.querySelector('.aside-sticky-box');
    const asideClose = document.querySelector('.aside__close');

    if (asideArrowRight) {
      asideArrowRight.addEventListener('click', () => {
        if (aside) {
          aside.classList.add('active');
        }
      });

      if (asideClose && aside) asideClose.addEventListener('click', () => aside.classList.remove('active'));
    }
  }
  showTotalItemCart() {
    const copyCart: Cart = Cart.getInstance();
    const numberProductsCart = document.getElementById('number-products-cart');
    if (numberProductsCart) numberProductsCart.textContent = copyCart.totalCartItem().toString();
  }
  showTotalCartMoney() {
    const copyCart: Cart = Cart.getInstance();
    const totalCart = document.getElementById('total-cart');

    if (totalCart) {
      if (Object.keys(copyCart.allUsedPromoCode).length > 0) {
        totalCart.textContent = copyCart.totalCartMoneyUsedPromo().toString();
      } else {
        totalCart.textContent = copyCart.totalCartMoney().toString();
      }
    }
  }
  changeCardView(column: string) {
    const products: NodeListOf<Element> = document.querySelectorAll('.product');
    if (products) {
      products.forEach((item) => {
        item.classList.remove('four-columns', 'three-columns');
        item.classList.add(column);
      });
    }
    this.handleUrl();
  }
  handleUrl():void {
    let query: string = '?';

    const categoriesInput = document.querySelectorAll('.input-category') as NodeListOf<HTMLInputElement>;
    categoriesInput.forEach(el => {
      if (el.checked) {
        query +=  `cat=${el.id}&`
      }
    });

    const brandsInput = document.querySelectorAll('.input-brand') as NodeListOf<HTMLInputElement>;
    brandsInput.forEach(el => {
      if (el.checked) {
        query +=  `br=${el.id}&`
      }
    });

       
     const product:Element | null = document.querySelector('.product');
    if (product?.classList.contains('four-columns')) {
      query += '&view=4&';
    } else {
      query += '&view=3&';
    } 

    const asideMaxStock: HTMLElement | null = document.querySelector('.aside__max-stock');
    if (asideMaxStock?.dataset.value) {
      query += `stmax=${asideMaxStock.dataset.value}&`
    }

    const asideMinStock: HTMLElement | null = document.querySelector('.aside__min-stock');
    if (asideMinStock?.dataset.value) {
      query += `stmin=${asideMinStock.dataset.value}&`
    }


    const asideMinPrice: HTMLElement | null = document.querySelector('.aside__min-price');
    if (asideMinPrice?.dataset.value) {
      query += `prmin=${asideMinPrice.dataset.value}&`
    }


    const asideMaxPrice: HTMLElement | null = document.querySelector('.aside__max-price');
    if (asideMaxPrice?.dataset.value) {
      query += `prmax=${asideMaxPrice.dataset.value}&`
    }

    const searchInput: HTMLInputElement | null = document.querySelector('#search');
    if (searchInput?.value) {
      query = `?se=${searchInput.value}&`
    }

    const sortInput: HTMLInputElement | null = document.querySelector('.sort__options');
    if (sortInput?.value) {
      query +=  `so=${sortInput.value}&`;
    }

    if (query[query.length - 1] === '&') query = query.slice(0, -1);
    window.location.hash = `#/plp${query.toLowerCase()}`
  }
}

export default Plp;
