import Plp from '../product-list-page/plp';

import Cart from './cart';

import type { allProductCart, IAllUsedPromo, IObjectProductCart } from '../../interfaces';

class CartPage {
  copyCart: Cart;
  plp: Plp;
  constructor() {
    this.copyCart = Cart.getInstance();
    this.plp = new Plp();
  }
  drawCartPage(data: allProductCart): void {
    if (data.size === 0) return this.showCartIsEmpty();

    const main: HTMLElement | null = document.querySelector('.main');
    const cartPageTemp: HTMLTemplateElement | null = document.querySelector('#template-cart-page');
    const cartPageClone: HTMLElement = <HTMLElement>cartPageTemp?.content.cloneNode(true);
    const listProducts: HTMLElement | null = cartPageClone.querySelector('.cart-page__list-products');
    const summaryProducts: HTMLElement | null = cartPageClone.querySelector('.summary__products');
    const summaryTotalMoney: HTMLElement | null = cartPageClone.querySelector('.summary__total-money');
    const btnBuyNow: HTMLElement | null = cartPageClone.querySelector('.btn-buy-now');
    const promoInput: HTMLInputElement | null = cartPageClone.querySelector('#promo');
    const paginationNextPage: HTMLInputElement | null = cartPageClone.querySelector('.pagination__next-page');
    const paginationPrevPage: HTMLInputElement | null = cartPageClone.querySelector('.pagination__prev-page ');
    const itemsPerPage: HTMLInputElement | null = cartPageClone.querySelector('#items-per-page');
    const buyNowModal: HTMLElement | null = document.querySelector('.buy-now');

    if (itemsPerPage) {
      itemsPerPage.value = `${this.copyCart.allProductCart.size}`;
      itemsPerPage.max = `${this.copyCart.allProductCart.size}`;
      itemsPerPage.addEventListener('input', () => {
        this.goToPage(1);
      });
    }
    if (paginationPrevPage) {
      paginationPrevPage.addEventListener('click', () => {
        this.prevPaginationPage();
        this.showListPagination(data);
      });
    }
    if (paginationNextPage) {
      paginationNextPage.addEventListener('click', () => {
        this.nextPaginationPage();
        this.showListPagination(data);
      });
    }

    if (summaryProducts) summaryProducts.textContent = `Products:  ${this.copyCart.totalCartItem()}`;
    if (summaryTotalMoney) summaryTotalMoney.textContent = `Total: ${this.copyCart.totalCartMoney()} $`;

    this.showSummaryTotalMoneyPromo();
    this.plp.showTotalCartMoney();

    if (btnBuyNow && buyNowModal)
      btnBuyNow.addEventListener('click', () => {
        if (main) main.classList.toggle('popup-active');
        buyNowModal.classList.toggle('active');
      });

    if (promoInput)
      promoInput.addEventListener('change', () => {
        if (this.copyCart.isValidationPromo(promoInput.value)) {
          this.copyCart.addPromoCode(promoInput.value);
          promoInput.value = '';
          this.drawUsedPromoCode();
          this.plp.showTotalCartMoney();
          this.showSummaryTotalMoneyPromo();
        }
      });

    if (listProducts) this.drawProductList(data, listProducts);

    if (main) {
      main.innerHTML = '';
      main.append(cartPageClone);
    }

    this.drawUsedPromoCode();
  }
  showCartPage(): void {
    const headerIconCart: HTMLElement | null = document.querySelector('#header-icon-cart');

    if (headerIconCart) headerIconCart.addEventListener('click', () => (window.location.hash = `#/cart`));
  }
  showCartIsEmpty(): void {
    const main: HTMLElement | null = document.querySelector('.main');

    if (main)
      main.innerHTML = `
      <div class="container">
       <h2 class="cart-empty">Cart is Empty</h2>
      </div>`;
  }
  drawUsedPromoCode(): void {
    const promocodeActive: HTMLElement | null = document.querySelector('.promocode__active');

    if (promocodeActive) {
      const allUsedPromo: IAllUsedPromo = this.copyCart.allUsedPromoCode;
      promocodeActive.innerHTML = '';

      for (const key in allUsedPromo) {
        const promo: HTMLDivElement = document.createElement('div');
        promo.innerHTML = `
                    <div id="${key}" class="promo-used">
                    <div>"${key}" - ${allUsedPromo[key]}%</div>
                    <span class="delete-promo">X</span>
                    </div>`;

        const deletePromo: HTMLElement | null = promo.querySelector('.delete-promo');

        if (deletePromo) deletePromo.addEventListener('click', (e) => this.removePromoCode(e));

        promocodeActive.append(promo);
      }
    }
  }

  showSummaryTotalMoneyPromo(): void {
    const summaryTotalMoneyUsedPromo: HTMLElement | null = document.querySelector('.summary__total-money-used-promo');
    const summaryTotalMoney: HTMLElement | null = document.querySelector('.summary__total-money');

    if (summaryTotalMoneyUsedPromo && summaryTotalMoney) {
      if (Object.keys(this.copyCart.allUsedPromoCode).length > 0) {
        summaryTotalMoneyUsedPromo.textContent = `Total Discounted Price: ${this.copyCart
          .totalCartMoneyUsedPromo()
          .toFixed(2)} $`;
        summaryTotalMoney.classList.add('strikethrough-text');
      } else {
        summaryTotalMoneyUsedPromo.innerHTML = '';
        summaryTotalMoney.classList.remove('strikethrough-text');
      }
    }
  }
  removePromoCode(e: Event): void {
    const currentElement: Node = <Node>e.target;
    const parentDeletePromo: HTMLElement | null = <HTMLElement>currentElement.parentNode;
    if (parentDeletePromo) {
      this.copyCart.deletePromoCode(parentDeletePromo.id);
      this.plp.showTotalCartMoney();
      this.showSummaryTotalMoneyPromo();
      parentDeletePromo.remove();
    }
  }
  drawSummaryBlock(): void {
    const summaryProducts: HTMLElement | null = document.querySelector('.summary__products');
    const summaryTotalMoney: HTMLElement | null = document.querySelector('.summary__total-money');

    if (summaryProducts) summaryProducts.textContent = `Products:  ${this.copyCart.totalCartItem()}`;
    if (summaryTotalMoney) summaryTotalMoney.textContent = `Total: ${this.copyCart.totalCartMoney()} $`;
  }
  showListPagination(data: allProductCart, goToPage?: number): void {
    if (data.size === 0) {
      return this.showCartIsEmpty();
    }
    const itemPerPageInput: HTMLInputElement | null = <HTMLInputElement>document.getElementById('items-per-page');
    const paginationCurrentPage: HTMLElement | null = document.getElementById('pagination-current-page');
    const itemPerPage: number = +itemPerPageInput.value || this.copyCart.allProductCart.size;
    const currentPage: number = goToPage ? goToPage : parseInt(<string>paginationCurrentPage?.textContent);
    const listProducts: HTMLElement | null = document.querySelector('.cart-page__list-products');

    const startSlice: number = itemPerPage * (currentPage - 1);
    const endSlice: number = startSlice + itemPerPage;

    const dataArray: Array<[number, IObjectProductCart]> = Array.from(data);

    const PaginatedData: allProductCart = dataArray.slice(startSlice, endSlice).reduce((acc, cur) => {
      return acc.set(cur[1].item.id, cur[1]);
    }, new Map());

    if (PaginatedData.size === 0) {
      this.goToPage(currentPage - 1);
    } else {
      if (listProducts) this.drawProductList(PaginatedData, listProducts);
    }
  }
  nextPaginationPage(): void {
    const paginationCurrentPage: HTMLElement | null = document.getElementById('pagination-current-page');
    const itemPerPageInput: HTMLInputElement | null = <HTMLInputElement>document.getElementById('items-per-page');
    const itemPerPageInputValue: number =
      +itemPerPageInput.value === 0 ? this.copyCart.allProductCart.size : +itemPerPageInput.value;

    const maxPages: number = Math.ceil(this.copyCart.allProductCart.size / itemPerPageInputValue);

    if (paginationCurrentPage) {
      const paginationCurrentPageValue: number = parseInt(<string>paginationCurrentPage.textContent);

      if (paginationCurrentPageValue < maxPages) {
        paginationCurrentPage.textContent = `${paginationCurrentPageValue + 1}`;
      } else {
        paginationCurrentPage.textContent = `${maxPages}`;
      }
    }
  }
  prevPaginationPage(): void {
    const paginationCurrentPage: HTMLElement | null = document.getElementById('pagination-current-page');
    if (paginationCurrentPage) {
      const paginationCurrentPageValue: number = parseInt(<string>paginationCurrentPage.textContent);

      if (paginationCurrentPageValue > 1) paginationCurrentPage.textContent = `${paginationCurrentPageValue - 1}`;
    }
  }
  drawProductList(data: allProductCart, listProducts: HTMLElement): void {
    let counterNumber = 0;
    listProducts.innerHTML = ``;
    const productItemTemp: HTMLTemplateElement | null = document.querySelector('#template-product-cart-page');
    const fragment: DocumentFragment = document.createDocumentFragment();

    data.forEach((item: IObjectProductCart) => {
      const productClone: HTMLElement = <HTMLElement>productItemTemp?.content.cloneNode(true);

      const productNumber: HTMLElement | null = productClone.querySelector('.product-cart__number');
      const productImg: HTMLElement | null = productClone.querySelector('.product-cart__img');
      const productTitle: HTMLElement | null = productClone.querySelector('.info__title');
      const productDescription: HTMLElement | null = productClone.querySelector('.info__description');
      const productRating: HTMLElement | null = productClone.querySelector('.info__rating');
      const productStock: HTMLElement | null = productClone.querySelector('.product-cart__stock');
      const productTotalMoney: HTMLElement | null = productClone.querySelector('.product-cart__total-money');

      const addNumberProduct: HTMLButtonElement | null = productClone.querySelector('.add-number-product');
      const currentNumberProduct: HTMLElement | null = productClone.querySelector('#current-number-product');
      const removeNumberProduct: HTMLButtonElement | null = productClone.querySelector('.remove-number-product');

      if (productNumber) productNumber.textContent = counterNumber.toString();

      if (productImg) {
        const thumbnail: HTMLImageElement = document.createElement('img');
        thumbnail.src = item.item.thumbnail;
        productImg.addEventListener('click', () => (window.location.hash = `#/pdp/${item.item.id}`));
        productImg.append(thumbnail);
      }

      if (productTitle) productTitle.textContent = item.item.title;

      if (productDescription) productDescription.textContent = item.item.description;

      if (productRating) productRating.textContent = `Rating: ${item.item.rating.toString()}`;

      if (productStock) productStock.textContent = `In stock: ${item.item.stock - item.quantity}`;

      if (productTotalMoney) productTotalMoney.textContent = `Total Price: ${item.quantity * item.item.price} $`;

      if (currentNumberProduct) currentNumberProduct.textContent = item.quantity.toString();

      if (addNumberProduct) {
        addNumberProduct.addEventListener('click', () => {
          this.copyCart.addOneQuantity(item.item);
          if (currentNumberProduct) currentNumberProduct.textContent = item.quantity.toString();
          if (productStock) productStock.textContent = `In stock: ${item.item.stock - item.quantity}`;
          if (productTotalMoney) productTotalMoney.textContent = `Total Price: ${item.quantity * item.item.price} $`;
          this.drawSummaryBlock();
          this.showSummaryTotalMoneyPromo();
        });
      }

      if (removeNumberProduct) {
        removeNumberProduct.addEventListener('click', (e) => {
          if (data.size === 0) this.showCartIsEmpty();
          if (item.quantity === 1) {
            this.copyCart.removeOneQuantity(item.item);
            this.showListPagination(this.copyCart.allProductCart);
            this.drawSummaryBlock();
            this.showSummaryTotalMoneyPromo();
          } else {
            this.copyCart.removeOneQuantity(item.item);
            if (currentNumberProduct) currentNumberProduct.textContent = item.quantity.toString();
            if (productStock) productStock.textContent = `In stock: ${item.item.stock - item.quantity}`;
            if (productTotalMoney) productTotalMoney.textContent = `Total Price: ${item.quantity * item.item.price} $`;
            this.drawSummaryBlock();
            this.showSummaryTotalMoneyPromo();
          }
        });
      }

      counterNumber++;
      fragment.append(productClone);
    });

    listProducts.appendChild(fragment);
  }
  goToPage(page: number): void {
    const paginationCurrentPage: HTMLElement | null = document.getElementById('pagination-current-page');
    if (paginationCurrentPage) paginationCurrentPage.textContent = `${page}`;
    this.showListPagination(this.copyCart.allProductCart, page);
  }
}

export default CartPage;
