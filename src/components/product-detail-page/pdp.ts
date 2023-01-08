import Cart from '../cart/cart';
import Plp from '../product-list-page/plp';

import locStorage from '../../utility/localStorage/local-storage';

import type { IProduct } from '../../interfaces';

class Pdp {
  copyCart: Cart;
  plp: Plp;
  locStorage: locStorage;
  constructor() {
    this.copyCart = Cart.getInstance();
    this.plp = new Plp();
    this.locStorage = new locStorage();
  }
  drawPdp(data: IProduct): void {
    const tempProductDetailPage: HTMLTemplateElement | null = document.querySelector('#template-product-detail-page');
    const main: HTMLElement | null = document.querySelector('.main');
    const productCardClone: HTMLElement | null = <HTMLElement>tempProductDetailPage?.content.cloneNode(true);
    const breadcrumbs: HTMLElement | null = productCardClone.querySelector('.breadcrumbs');
    const mainPhoto: HTMLElement | null = productCardClone.querySelector('.gallery__main-photo img');
    const galleryAllPhoto: HTMLElement | null = productCardClone.querySelector('.gallery__all-photo');
    const productCardTitle: HTMLElement | null = productCardClone.querySelector('.product-card__title');
    const productCardPrice: HTMLElement | null = productCardClone.querySelector('.product-card__price');
    const btnAddCart: HTMLElement | null = productCardClone.querySelector('.btn-add-cart');
    const btnBuyNow: HTMLElement | null = productCardClone.querySelector('.btn-buy-now');
    const productCardCategory: HTMLElement | null = productCardClone.querySelector('.product-card__category');
    const productCardBrand: HTMLElement | null = productCardClone.querySelector('.product-card__brand');
    const productCardRating: HTMLElement | null = productCardClone.querySelector('.product-card__rating');
    const productCardStock: HTMLElement | null = productCardClone.querySelector('.product-card__stock');
    const productCardDescription: HTMLElement | null = productCardClone.querySelector(
      '.product-card__body-description'
    );
    const isProductInCart: boolean = this.copyCart.allProductCart.has(data.id);
    const buyNowModal: HTMLElement | null = document.querySelector('.buy-now');

    if (productCardTitle) productCardTitle.textContent = data.title;
    if (productCardPrice) productCardPrice.textContent = `Price: ${data.price.toString()}$`;
    if (productCardCategory) productCardCategory.textContent = `Category: ${data.category}`;
    if (productCardBrand) productCardBrand.textContent = `Brand: ${data.brand}`;
    if (productCardRating) productCardRating.textContent = `Rating: ${data.rating.toFixed(1).toString()}`;
    if (productCardStock) productCardStock.textContent = `In stock: ${data.stock.toString()}`;
    if (productCardDescription) productCardDescription.textContent = data.description;

    data.images.forEach((image, index) => {
      if (index === 0 && mainPhoto) {
        mainPhoto.setAttribute('src', `${image}`);
        mainPhoto.setAttribute('alt', `main photo products`);
      }

      const newDiv = document.createElement('div');
      const newImg = document.createElement('img');

      newDiv.classList.add('gallery__photo');
      newImg.setAttribute('src', `${image}`);
      newDiv.appendChild(newImg);

      newImg.setAttribute('alt', `photo products`);
      if (galleryAllPhoto) galleryAllPhoto.appendChild(newDiv);
    });

    if (breadcrumbs) {
      breadcrumbs.innerHTML = `<div class="breadcrumbs"> <span class="breadcrumbs__main-page"> Online store - </span><span class="breadcrumbs__filter-category">${data.category} - </span><span class="breadcrumbs__filter-brand">${data.brand} - </span><span>${data.title}</span></div>`;
      const breadcrumbsMainPage: HTMLElement | null = breadcrumbs.querySelector('.breadcrumbs__main-page');
      const breadcrumbsFilterCategory: HTMLElement | null = breadcrumbs.querySelector('.breadcrumbs__filter-category');
      const breadcrumbsFilterBrand: HTMLElement | null = breadcrumbs.querySelector('.breadcrumbs__filter-brand');
      if (breadcrumbsMainPage) breadcrumbsMainPage.addEventListener('click', () => (window.location.hash = '#/plp'));
      if (breadcrumbsFilterCategory) {
        breadcrumbsFilterCategory.addEventListener(
          'click',
          () => (window.location.hash = `#/plp?cat=${data.category.toLowerCase()}`)
        );
      }
      if (breadcrumbsFilterBrand) {
        breadcrumbsFilterBrand.addEventListener(
          'click',
          () => (window.location.hash = `#/plp?br=${data.brand.toLowerCase()}`)
        );
      }
    }

    if (btnBuyNow && buyNowModal) {
      btnBuyNow.addEventListener('click', () => {
        if (!this.copyCart.inCart(data)) {
          this.copyCart.addToCart(data);
          this.plp.showTotalItemCartAndCartMoney();
          this.locStorage.setLocalStorage('allProductCart', this.copyCart.allProductCart);
        }
        if (main) main.classList.toggle('popup-active');
        buyNowModal.classList.toggle('active');
        window.location.hash = '#/cart';
      });
    }

    if (btnAddCart) {
      if (isProductInCart) {
        btnAddCart.classList.remove('product-not-cart');
        btnAddCart.textContent = 'Drop from Cart';
      }

      btnAddCart.addEventListener('click', (e) => {
        this.copyCart.changeButtonAddToCart(e);
        this.copyCart.addToCart(data);
        this.plp.showTotalItemCartAndCartMoney();
        this.locStorage.setLocalStorage('allProductCart', this.copyCart.allProductCart);
      });
    }

    if (main) {
      main.innerHTML = '';
      main.append(productCardClone);
    }

    if (galleryAllPhoto) galleryAllPhoto.addEventListener('click', (e) => this.changeMainImage(e));
  }
  changeMainImage(e: Event): void {
    const mainImg: HTMLElement | null = document.querySelector('.gallery__main-photo');

    const currentImg: Node = <Node>e.target;
    const parentElementImg: HTMLElement | null = currentImg.parentElement;

    if (mainImg && parentElementImg) {
      mainImg.innerHTML = parentElementImg.innerHTML;
    }
  }
}

export default Pdp;
