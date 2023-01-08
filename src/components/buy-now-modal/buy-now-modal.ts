import Cart from '../cart/cart';
import Plp from '../product-list-page/plp';
import locStorage from '../../utility/localStorage/local-storage';

import imgAmerican from '~/assets/icons/349228.png';
import imgDefaultCard from '~/assets/icons/4341764.png';
import imgVisa from '~/assets/icons/5968151.png';
import imgMaster from '~/assets/icons/mastercard-credit-debit-card-bank-transaction-32303.webp';
class BuyNowModal {
  copyCart: Cart;
  plp: Plp;
  locStorage: locStorage;
  constructor() {
    this.copyCart = Cart.getInstance();
    this.plp = new Plp();
    this.locStorage = new locStorage();
  }
  drawBuyNowModal(): void {
    const main: HTMLElement | null = document.querySelector('.main');
    const tempModalBuyNow: HTMLTemplateElement | null = document.querySelector('#TempModalBuyNow');
    const tempModalBuyNowCopy: HTMLElement = <HTMLElement>tempModalBuyNow?.content.cloneNode(true);
    const body: HTMLElement | null = document.querySelector('body');
    const closeButton: HTMLElement | null = tempModalBuyNowCopy.querySelector('.buy-now__close');
    const form: HTMLElement | null = tempModalBuyNowCopy.querySelector('.buy-now');

    const fullName: HTMLInputElement | null = tempModalBuyNowCopy.querySelector('#personal-info-name');
    const phoneNumber: HTMLInputElement | null = tempModalBuyNowCopy.querySelector('#personal-info-phone-number');
    const deliveryAddress: HTMLInputElement | null = tempModalBuyNowCopy.querySelector(
      '#personal-info-delivery-address'
    );
    const email: HTMLInputElement | null = tempModalBuyNowCopy.querySelector('#personal-info-email');
    const cardNumber: HTMLInputElement | null = tempModalBuyNowCopy.querySelector('#cart-number');
    const validity: HTMLInputElement | null = tempModalBuyNowCopy.querySelector('#card-validity');
    const cvvCode: HTMLInputElement | null = tempModalBuyNowCopy.querySelector('#cvv-code');

    if (closeButton)
      closeButton.addEventListener('click', () => {
        if (main) main.classList.remove('popup-active');
        if (form) form.classList.remove('active');
      });
    if (fullName) fullName.addEventListener('input', () => this.isValid(fullName));
    if (phoneNumber) phoneNumber.addEventListener('input', () => this.isValid(phoneNumber));
    if (deliveryAddress) deliveryAddress.addEventListener('input', () => this.isValid(deliveryAddress));
    if (email) email.addEventListener('input', () => this.isValid(email));
    if (cardNumber)
      cardNumber.addEventListener('input', () => {
        const imgCard: HTMLImageElement | null = document.querySelector('.credit-card-details__cart-number img');
        switch (cardNumber.value[0]) {
          case '3':
            if (imgCard) imgCard.src = imgAmerican;
            break;
          case '4':
            if (imgCard) imgCard.src = imgVisa;
            break;
          case '5':
            if (imgCard) imgCard.src = imgMaster;
            break;

          default:
            if (imgCard) imgCard.src = imgDefaultCard;
            break;
        }

        this.isValid(cardNumber);
      });
    if (cvvCode) cvvCode.addEventListener('input', () => this.isValid(cvvCode));
    if (validity)
      validity.addEventListener('input', () => {
        validity.value = validity.value.replace('/', '');
        if (validity.value.length === 4) {
          const valueArray = validity.value.split('');
          const month = valueArray.slice(0, 2);
          const year = valueArray.slice(2);
          validity.value = month.concat('/', year).join('');
        }
      });

    if (form) {
      form.addEventListener('submit', (e) => {
        const allInput: NodeListOf<HTMLInputElement> = document.querySelectorAll('form input');
        allInput.forEach((item) => this.isValid(item));

        if (!fullName?.validity.valid) {
          e.preventDefault();
          return;
        }
        if (!phoneNumber?.validity.valid) {
          e.preventDefault();
          return;
        }
        if (!deliveryAddress?.validity.valid) {
          e.preventDefault();
          return;
        }
        if (!email?.validity.valid) {
          e.preventDefault();
          return;
        }
        if (!cardNumber?.validity.valid) {
          e.preventDefault();
          return;
        }
        if (!validity?.validity.valid) {
          e.preventDefault();
          return;
        }
        if (!cvvCode?.validity.valid) {
          e.preventDefault();
          return;
        }
        e.preventDefault();

        form?.classList.remove('active');
        this.showToggleOrderComplete();

        setTimeout(() => {
          this.showToggleOrderComplete();
          main?.classList.remove('popup-active');
          this.copyCart.clearCart();
          this.plp.showTotalItemCart();
          this.plp.showTotalCartMoney();
          this.locStorage.setLocalStorage('allProductCart', this.copyCart.allProductCart);
          window.location.hash = '#/plp';
        }, 3000);
      });
    }

    if (body) body.append(tempModalBuyNowCopy);
  }
  isValid(input: HTMLInputElement): void {
    const inputError: ChildNode | null = input.nextElementSibling;

    if (input.validity.valueMissing) {
      if (inputError) inputError.textContent = 'This is a required field';
      return;
    } else {
      if (inputError) inputError.textContent = '';
    }

    if (input.validity.rangeUnderflow) {
      if (inputError) inputError.textContent = 'Data less than needed';
      return;
    } else {
      if (inputError) inputError.textContent = '';
    }

    if (input.validity.rangeOverflow) {
      if (inputError) inputError.textContent = 'Data is greater than necessary';
      return;
    } else {
      if (inputError) inputError.textContent = '';
    }

    if (input.validity.tooShort) {
      if (inputError) inputError.textContent = 'Data shorter than minimum length';
      return;
    } else {
      if (inputError) inputError.textContent = '';
    }
    if (input.validity.tooLong) {
      if (inputError) inputError.textContent = 'Data is longer than the maximum length';
      return;
    } else {
      if (inputError) inputError.textContent = '';
    }

    if (input.validity.typeMismatch) {
      if (inputError) inputError.textContent = 'Email entered incorrectly';
      return;
    } else {
      if (inputError) inputError.textContent = '';
    }
    if (input.validity.patternMismatch) {
      if (inputError) inputError.textContent = 'Data entered incorrectly';
      return;
    } else {
      if (inputError) inputError.textContent = '';
    }
  }
  showToggleOrderComplete(): void {
    const orderCompleted: HTMLElement | null = document.querySelector('.order-completed');
    if (orderCompleted) orderCompleted.classList.toggle('active');
  }
}
export default BuyNowModal;
