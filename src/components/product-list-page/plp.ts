import Cart from '../cart/cart';

import Pdp from '../product-detail-page/pdp';

import type { IProduct } from '../../interfaces';

class Plp {
  drawAside(data: IProduct[]): void {
    const btnReset: HTMLElement | null = document.querySelector('.btn-reset ');
    const btnCopy: HTMLElement | null = document.querySelector('.btn-copy-link');

    this.drawFilterCategory(data);
    this.drawFilterBrand(data);
    this.drawFilterPrice(data);
    this.drawFilterStock(data);

    if (btnReset) btnReset.addEventListener('click', () => console.log('сброс'));
    if (btnCopy) btnCopy.addEventListener('click', () => console.log('копировать'));
  }
  drawFilterStock(data: IProduct[]): void {
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
      asideRangeStockLower.addEventListener('input', () => {
        if (parseInt(asideRangeStockUpper.value) - parseInt(asideRangeStockLower.value) <= minGapRange) {
          asideRangeStockLower.value = `${parseInt(asideRangeStockUpper.value) - minGapRange}`;
        } else {
          asideMinStock.textContent = `${allStockSort[+asideRangeStockLower.value].toString()} pcs`;
        }
      });

      asideRangeStockUpper.addEventListener('input', () => {
        if (parseInt(asideRangeStockUpper.value) - parseInt(asideRangeStockLower.value) <= minGapRange) {
          asideRangeStockUpper.value = `${parseInt(asideRangeStockLower.value) + minGapRange}`;
        } else {
          asideMaxStock.textContent = `${allStockSort[+asideRangeStockUpper.value].toString()} pcs`;
        }
      });
    }
  }
  drawFilterPrice(data: IProduct[]): void {
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
      asideRangePriceLower.addEventListener('input', () => {
        if (parseInt(asideRangePriceUpper.value) - parseInt(asideRangePriceLower.value) <= minGap) {
          asideRangePriceLower.value = `${parseInt(asideRangePriceUpper.value) - minGap}`;
        } else {
          asideMinPrice.textContent = `${allPriceSort[+asideRangePriceLower.value].toString()} $`;
        }
      });

      asideRangePriceUpper.addEventListener('input', () => {
        if (parseInt(asideRangePriceUpper.value) - parseInt(asideRangePriceLower.value) <= minGap) {
          asideRangePriceUpper.value = `${parseInt(asideRangePriceLower.value) + minGap}`;
        } else {
          asideMaxPrice.textContent = `${allPriceSort[+asideRangePriceUpper.value].toString()} $`;
        }
      });
    }
  }
  drawFilterCategory(data: IProduct[]): void {
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

  drawFilterBrand(data: IProduct[]): void {
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

  drawSort() {}

  drawProducts(data: IProduct[]): void {
    const pdp = new Pdp();
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
        productImage.addEventListener('click', () => pdp.drawPdp(item));
        productImage.style.backgroundImage = `url("${item.thumbnail}")`;
      }
      if (productTitle) productTitle.textContent = item.title;
      if (productPrice) productPrice.textContent = `Price: ${item.price.toString()} $`;
      if (productRating) productRating.textContent = `Rating: ${item.rating.toFixed(1).toString()}`;
      if (productStock) productStock.textContent = `Stock: ${item.stock.toString()}`;
      if (btnAddCart) {
        btnAddCart.textContent = 'Add to Cart';
        btnAddCart.addEventListener('click', (e) => {
          copyCart.changeButtonAddToCart(e);
          copyCart.addToCart(item);
        });
      }
      if (btnShowDetails) {
        btnShowDetails.textContent = 'Details';
        btnShowDetails.addEventListener('click', () => pdp.drawPdp(item));
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
}
export default Plp;
