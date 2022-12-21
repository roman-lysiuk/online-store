import Pdp from '../product-detail-page/pdp';
import Plp from '../product-list-page/plp';
import Cart from './cart';

import type { IProduct } from '../../interfaces';

class CartPage {
  drawCartPage(data: Map<number, { item: IProduct; quantity: number }>): void {
    if (data.size === 0) return this.showCartIsEmpty();
    const copyCart = Cart.getInstance();
    const plp = new Plp();
    const main = document.querySelector('.main');

    const cartPageTemp = <HTMLTemplateElement>document.querySelector('#template-cart-page');
    const productItemTemp = <HTMLTemplateElement>document.querySelector('#template-product-cart-page');

    const fragment = document.createDocumentFragment();
    const cartPageClone = <HTMLElement>cartPageTemp.content.cloneNode(true);

    const listProducts: HTMLElement | null = cartPageClone.querySelector('.cart-page__list-products');
    const summaryProducts: HTMLElement | null = cartPageClone.querySelector('.summary__products');
    const summaryTotalMoney: HTMLElement | null = cartPageClone.querySelector('.summary__total-money');
    const btnBuyNow: HTMLElement | null = cartPageClone.querySelector('.btn-buy-now');
    const promoInput: HTMLInputElement | null = cartPageClone.querySelector('#promo');

    const buyNowModal: HTMLElement | null = document.querySelector('.buy-now-modal');

    if (summaryProducts) summaryProducts.textContent = `Products:  ${copyCart.totalCartItem()}`;
    if (summaryTotalMoney) summaryTotalMoney.textContent = `Total: ${copyCart.totalCartMoney()} $`;
    this.showSummaryTotalMoneyPromo();
    plp.showTotalCartMoney();

    // сделать метод buyNow
    if (btnBuyNow && buyNowModal)
      btnBuyNow.addEventListener('click', () => {
        if (main) main.classList.toggle('popup-active');
        buyNowModal.classList.toggle('active');
      });

    if (promoInput)
      promoInput.addEventListener('change', () => {
        if (copyCart.isValidationPromo(promoInput.value)) {
          copyCart.addPromoCode(promoInput.value);
          promoInput.value = '';
          this.drawUsedPromoCode();
          plp.showTotalCartMoney();
          this.showSummaryTotalMoneyPromo();
        }
      });

    let counterNumber = 0;

    data.forEach((item: { item: IProduct; quantity: number }) => {
      const copyCart = Cart.getInstance();
      const pdp = new Pdp();

      const productClone = <HTMLElement>productItemTemp.content.cloneNode(true);

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
        const thumbnail = document.createElement('img');
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
          copyCart.addOneQuantity(item.item);
          if (currentNumberProduct) currentNumberProduct.textContent = item.quantity.toString();
          if (productTotalMoney) productTotalMoney.textContent = `Total Price: ${item.quantity * item.item.price} $`;
          this.drawSummaryBlock(item);
          this.showSummaryTotalMoneyPromo();
        });
      }

      if (removeNumberProduct) {
        removeNumberProduct.addEventListener('click', () => {
          if (data.size === 0) this.showCartIsEmpty();

          if (item.quantity === 1) {
            copyCart.removeOneQuantity(item.item);
            this.drawCartPage(copyCart.allProductCart);
            this.showSummaryTotalMoneyPromo();
          } else {
            copyCart.removeOneQuantity(item.item);
            if (currentNumberProduct) currentNumberProduct.textContent = item.quantity.toString();
            if (productTotalMoney) productTotalMoney.textContent = `Total Price: ${item.quantity * item.item.price} $`;
            this.drawSummaryBlock(item);
            this.showSummaryTotalMoneyPromo();
          }
        });
      }

      counterNumber++;
      fragment.append(productClone);
    });

    if (listProducts) listProducts.appendChild(fragment);

    if (main) {
      main.innerHTML = '';
      main.append(cartPageClone);
    }

    this.drawUsedPromoCode();
  }
  showCartPage(): void {
    const copyCart = Cart.getInstance();
    const headerIconCart = document.querySelector('#header-icon-cart');

    if (headerIconCart) headerIconCart.addEventListener('click', () => (window.location.hash = `#/cart`));
  }
  showCartIsEmpty(): void {
    const main = document.querySelector('.main');

    if (main)
      main.innerHTML = `
      <div class="container">
       <h2 class="cart-empty">Cart is Empty</h2>
      </div>`;
  }
  drawUsedPromoCode(): void {
    const promocodeActive: HTMLElement | null = document.querySelector('.promocode__active');
    const copyCart = Cart.getInstance();

    if (promocodeActive) {
      const allUsedPromo = copyCart.allUsedPromoCode;
      promocodeActive.innerHTML = '';

      for (const key in allUsedPromo) {
        console.log(allUsedPromo);
        const promo = document.createElement('div');
        promo.innerHTML = `
                    <div id="${key}" class="promo-used">
                    <div>"${key}" - ${allUsedPromo[key]}%</div>
                    <span class="delete-promo">X</span>
                    </div>`;

        const deletePromo = <Node>promo.querySelector('.delete-promo');

        deletePromo.addEventListener('click', (e) => this.removePromoCode(e));

        promocodeActive.append(promo);
      }
    }
  }

  showSummaryTotalMoneyPromo(): void {
    const copyCart = Cart.getInstance();
    const summaryTotalMoneyUsedPromo: HTMLElement | null = document.querySelector('.summary__total-money-used-promo');
    const summaryTotalMoney: HTMLElement | null = document.querySelector('.summary__total-money');

    if (summaryTotalMoneyUsedPromo && summaryTotalMoney) {
      if (Object.keys(copyCart.allUsedPromoCode).length > 0) {
        summaryTotalMoneyUsedPromo.textContent = `Total Discounted Price: ${copyCart
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
    const copyCart = Cart.getInstance();
    const plp = new Plp();
    const currentElement = <Node>e.target;
    const parentDeletePromo = <HTMLElement>currentElement.parentNode;
    if (parentDeletePromo) {
      copyCart.deletePromoCode(parentDeletePromo.id);
      plp.showTotalCartMoney();
      this.showSummaryTotalMoneyPromo();
      parentDeletePromo.remove();
    }
  }
  drawSummaryBlock(item: { item: IProduct; quantity: number }): void {
    const copyCart = Cart.getInstance();
    const productStock: HTMLElement | null = document.querySelector('.product-cart__stock');

    const summaryProducts: HTMLElement | null = document.querySelector('.summary__products');
    const summaryTotalMoney: HTMLElement | null = document.querySelector('.summary__total-money');

    if (summaryProducts) summaryProducts.textContent = `Products:  ${copyCart.totalCartItem()}`;
    if (summaryTotalMoney) summaryTotalMoney.textContent = `Total: ${copyCart.totalCartMoney()} $`;
    if (productStock) productStock.textContent = `In stock: ${item.item.stock - item.quantity}`;
  }
}

export default CartPage;
