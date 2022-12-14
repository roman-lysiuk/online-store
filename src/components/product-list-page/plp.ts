import Cart from '../cart/cart';

import type { IProduct } from '../../interfaces';

class Plp {
  drawAside(data: IProduct[]) {
    const fragmentCategory: DocumentFragment = document.createDocumentFragment();
    const fragmentBrand: DocumentFragment = document.createDocumentFragment();

    const asideFilterListCategory: HTMLElement | null = document.querySelector('.aside__filter-list-category');
    const asideFilterListBrand: HTMLElement | null = document.querySelector('.aside__filter-list-brand');

    const asideMaxPrice: HTMLElement | null = document.querySelector('.aside__max-price');
    const asideMinPrice: HTMLElement | null = document.querySelector('.aside__min-price');
    const asideRangePrice: HTMLInputElement | null = document.querySelector('.aside__range-price');

    const asideMaxStock: HTMLElement | null = document.querySelector('.aside__max-stock');
    const asideMinStock: HTMLElement | null = document.querySelector('.aside__min-stock');
    const asideRangeStock: HTMLInputElement | null = document.querySelector('.aside__range-stock');

    const allCategory = <Array<string>>[...data.reduce((acc, cur) => acc.add(cur.category), new Set())];
    const allBrand = <Array<string>>[...data.reduce((acc, cur) => acc.add(cur.brand), new Set())];
    const allPrice = <Array<number>>[...data.reduce((acc, cur) => acc.add(cur.price), new Set())];
    const allPriceSort: number[] = allPrice.sort((a, b) => a - b);
    const allStock = <Array<number>>[...data.reduce((acc, cur) => acc.add(cur.stock), new Set())];
    const allStockSort: number[] = allStock.sort((a, b) => a - b);

    const btnReset: HTMLElement | null = document.querySelector('.btn-reset ');
    const btnCopy: HTMLElement | null = document.querySelector('.btn-copy-link');

    if (asideRangeStock && asideMinStock) {
      asideRangeStock.min = '0';
      asideRangeStock.max = allStock.length.toString();
      asideRangeStock.value = '0';
      asideRangeStock.addEventListener(
        'input',
        () => (asideMinStock.textContent = `${allStockSort[+asideRangeStock.value].toString()} pcs`)
      );
    }

    if (asideMinStock) asideMinStock.textContent = `${allStockSort[0].toString()} pcs`;
    if (asideMaxStock) asideMaxStock.textContent = `${allStockSort[allStockSort.length - 1].toString()} pcs`;

    if (asideRangePrice && asideMinPrice) {
      asideRangePrice.min = '0';
      asideRangePrice.max = allPrice.length.toString();
      asideRangePrice.value = '0';
      asideRangePrice.addEventListener(
        'input',
        () => (asideMinPrice.textContent = `${allPriceSort[+asideRangePrice.value].toString()} $`)
      );
    }

    if (asideMinPrice) asideMinPrice.textContent = `${allPriceSort[0].toString()} $`;
    if (asideMaxPrice) asideMaxPrice.textContent = `${allPriceSort[allPriceSort.length - 1].toString()} $`;

    if (btnReset) btnReset.addEventListener('click', () => console.log('сброс'));
    if (btnCopy) btnCopy.addEventListener('click', () => console.log('копировать'));

    allBrand.forEach((item) => {
      const newBrand = document.createElement('div');
      const label = document.createElement('label');
      const input = document.createElement('input');
      const span = document.createElement('span');

      const amountProductsBrand: number = data.filter((elem) => elem.brand === item).length;

      newBrand.classList.add('checkbox-line');

      input.setAttribute('type', 'checkbox');
      input.setAttribute('id', item);

      label.setAttribute('for', item);
      label.textContent = item;
      span.textContent = `(num/${amountProductsBrand})`;
      newBrand.appendChild(input);
      newBrand.appendChild(label);
      newBrand.appendChild(span);
      fragmentBrand.append(newBrand);
    });
    allCategory.forEach((item) => {
      const newCategory = document.createElement('div');
      const label = document.createElement('label');
      const input = document.createElement('input');
      const span = document.createElement('span');

      const amountProductsCategory: number = data.filter((elem) => elem.category === item).length;

      newCategory.classList.add('checkbox-line');

      input.setAttribute('type', 'checkbox');
      input.setAttribute('id', item);

      label.setAttribute('for', item);
      label.textContent = item;
      span.textContent = `(num/${amountProductsCategory})`;
      newCategory.appendChild(input);
      newCategory.appendChild(label);
      newCategory.appendChild(span);
      fragmentCategory.append(newCategory);
    });

    if (asideFilterListCategory) asideFilterListCategory.append(fragmentCategory);
    if (asideFilterListBrand) asideFilterListBrand.append(fragmentBrand);
  }

  drawSort() {}

  drawProducts(data: IProduct[]) {
    const copyCart: Cart = Cart.getInstance();
    const fragment = document.createDocumentFragment();
    const productItemTemp = <HTMLTemplateElement>document.querySelector('#productItemTemp');
    const products: HTMLElement | null = document.querySelector('.products');

    data.forEach((item) => {
      const productClone = <HTMLElement>productItemTemp.content.cloneNode(true);
      const productItem: HTMLElement | null = productClone.querySelector('.product__item');
      const productTitle: HTMLElement | null = productClone.querySelector('.product__title');
      const productCategory: HTMLElement | null = productClone.querySelector('.product__category');
      const productBrand: HTMLElement | null = productClone.querySelector('.product__brand');
      const productPrice: HTMLElement | null = productClone.querySelector('.product__price');
      const productRating: HTMLElement | null = productClone.querySelector('.product__rating');
      const productStock: HTMLElement | null = productClone.querySelector('.product__stock');
      const btnAddCart: HTMLButtonElement | null = productClone.querySelector('.btn-add-cart');
      const btnShowDetails: HTMLButtonElement | null = productClone.querySelector('.btn-show-details');

      if (productItem) {
        productItem.setAttribute('data-id', item.id.toString());
        productItem.style.backgroundImage = `url("${item.thumbnail}")`;
        //сделать метод showDetails
        productItem.addEventListener('click', () => console.log('Показать подробно'));
      }

      if (productTitle) productTitle.textContent = item.title;
      if (productCategory) productCategory.textContent = `Category: ${item.category}`;
      if (productBrand) productBrand.textContent = `Brand: ${item.brand}`;
      if (productPrice) productPrice.textContent = `Price: ${item.price.toString()}`;
      if (productRating) productRating.textContent = `Rating: ${item.rating.toFixed(1).toString()}`;
      if (productStock) productStock.textContent = `Stock: ${item.stock.toString()}`;
      if (btnAddCart) {
        btnAddCart.textContent = 'Add to Cart';
        btnAddCart.addEventListener('click', copyCart.addToCart);
      }
      if (btnShowDetails) {
        btnShowDetails.textContent = 'Details';
        //сделать метод showDetails
        btnShowDetails.addEventListener('click', () => console.log('Показать подробно'));
      }

      fragment.append(productClone);
    });

    if (products) products.append(fragment);
  }
}
export default Plp;
