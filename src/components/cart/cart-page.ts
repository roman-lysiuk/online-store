import Pdp from '../product-detail-page/pdp';
import Plp from '../product-list-page/plp';

import Cart from './cart';

import type { IProduct } from '../../interfaces';

class CartPage {
  drawCartPage(data: Map<number, { item: IProduct; quantity: number }>) {
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
    const promocodeActive: HTMLElement | null = cartPageClone.querySelector('.promocode__active');
    const summaryTotalMoneyUsedPromo: HTMLElement | null = cartPageClone.querySelector(
      '.summary__total-money-used-promo'
    );

    if (summaryProducts) summaryProducts.textContent = `Products:  ${copyCart.totalCartItem()}`;
    if (summaryTotalMoney) summaryTotalMoney.textContent = `Total: ${copyCart.totalCartMoney()} $`;

    if (Object.keys(copyCart.allUsedPromoCode).length >= 0) {
      if (summaryTotalMoneyUsedPromo && summaryTotalMoney) {
        summaryTotalMoneyUsedPromo.textContent = `Total Discounted Price: ${copyCart.totalCartMoney()} $`;
        if (Object.keys(copyCart.allUsedPromoCode).length !== 0) {
          summaryTotalMoneyUsedPromo.textContent = `Total Discounted Price: ${copyCart.totalCartMoneyUsedPromo()} $`;
          summaryTotalMoney.classList.add('strikethrough-text');
          plp.showTotalCartMoney();
        }
      }
    }

    // сделать метод buyNow
    if (btnBuyNow) btnBuyNow.addEventListener('click', () => console.log('сделать метод buyNow'));
    if (promoInput)
      promoInput.addEventListener('change', () => {
        if (copyCart.isValidationPromo(promoInput.value)) {
          copyCart.addPromoCode(promoInput.value);
          promoInput.value = '';
          if (Object.keys(copyCart.allUsedPromoCode).length > 0) {
            if (summaryTotalMoneyUsedPromo && summaryTotalMoney) {
              summaryTotalMoney.classList.add('strikethrough-text');
              summaryTotalMoneyUsedPromo.textContent = `Total Discounted Price: ${copyCart.totalCartMoneyUsedPromo()} $`;
              plp.showTotalCartMoney();
            }
          }
        }

        if (promocodeActive) {
          const allUsedPromo = copyCart.allUsedPromoCode;
          promocodeActive.innerHTML = '';
          for (const key in allUsedPromo) {
            const promo = document.createElement('div');
            promo.innerHTML = `
            <div id="${key}" class="promo-used">
            <div>"${key}" - ${allUsedPromo[key]}%</div>
            <span class="delete-promo">X</span>
            </div>`;

            const deletePromo = <Node>promo.querySelector('.delete-promo');
            if (deletePromo) {
              deletePromo.addEventListener('click', () => {
                const parentDeletePromo = <HTMLElement>deletePromo.parentNode;
                copyCart.deletePromoCode(parentDeletePromo.id);

                if (summaryTotalMoneyUsedPromo && summaryTotalMoney) {
                  summaryTotalMoneyUsedPromo.textContent = `Total Discounted Price: ${copyCart.totalCartMoneyUsedPromo()} $`;
                  if (Object.keys(copyCart.allUsedPromoCode).length === 0) {
                    summaryTotalMoneyUsedPromo.textContent = `Total Discounted Price: ${copyCart.totalCartMoney()} $`;
                    summaryTotalMoney.classList.remove('strikethrough-text');
                  }
                  plp.showTotalCartMoney();
                }
                parentDeletePromo.remove();
              });
            }
            promocodeActive.append(promo);
          }
        }
      });
    let counterNumber = 0;

    data.forEach((item) => {
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

      const addNumberProduct: HTMLElement | null = productClone.querySelector('.add-number-product');

      const currentNumberProduct: HTMLElement | null = productClone.querySelector('#current-number-product');
      const removeNumberProduct: HTMLElement | null = productClone.querySelector('.remove-number-product');

      const thumbnail = document.createElement('img');
      thumbnail.src = item.item.thumbnail;

      if (productNumber) productNumber.textContent = counterNumber.toString();

      if (productImg) {
        productImg.addEventListener('click', () => pdp.drawPdp(item.item));
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
          if (productStock) productStock.textContent = `In stock: ${item.item.stock - item.quantity}`;
          if (productTotalMoney) productTotalMoney.textContent = `Total Price: ${item.quantity * item.item.price} $`;
          if (currentNumberProduct) currentNumberProduct.textContent = item.quantity.toString();
          if (summaryProducts) summaryProducts.textContent = `Products:  ${copyCart.totalCartItem()}`;
          if (summaryTotalMoney) summaryTotalMoney.textContent = `Total: ${copyCart.totalCartMoney()} $`;
        });
      }

      if (removeNumberProduct) {
        removeNumberProduct.addEventListener('click', () => {
          if (item.quantity === 1) {
            copyCart.removeOneQuantity(item.item);
            this.drawCartPage(copyCart.allProductCart);
          } else {
            copyCart.removeOneQuantity(item.item);
            if (productStock) productStock.textContent = `In stock: ${item.item.stock - item.quantity}`;
            if (productTotalMoney) productTotalMoney.textContent = `Total Price: ${item.quantity * item.item.price} $`;
            if (currentNumberProduct) currentNumberProduct.textContent = item.quantity.toString();
            if (summaryProducts) summaryProducts.textContent = `Products:  ${copyCart.totalCartItem()}`;
            if (summaryTotalMoney) summaryTotalMoney.textContent = `Total: ${copyCart.totalCartMoney()} $`;
          }
          if (data.size === 0) this.showCartIsEmpty();
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
  }
  showCartPage() {
    const copyCart = Cart.getInstance();
    const headerIconCart = document.querySelector('#header-icon-cart');

    if (headerIconCart) headerIconCart.addEventListener('click', () => this.drawCartPage(copyCart.allProductCart));
  }
  showCartIsEmpty() {
    const main = document.querySelector('.main');

    if (main)
      main.innerHTML = `
      <div class="container">
       <h2 class="cart-empty">Cart is Empty</h2>
      </div>`;
  }
}

export default CartPage;
