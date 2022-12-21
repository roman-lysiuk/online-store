import Cart from '../cart/cart';

import type { IProduct } from '../../interfaces';

class Pdp {
  drawPdp(data: IProduct) {
    const tempProductDetailPage = <HTMLTemplateElement>document.querySelector('#template-product-detail-page');
    const main: HTMLElement | null = document.querySelector('.main');
    const copyCart = Cart.getInstance();

    const productCardClone = <HTMLElement>tempProductDetailPage.content.cloneNode(true);

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
    const isProductInCart = copyCart.allProductCart.has(data.id);
    const buyNowModal: HTMLElement | null = document.querySelector('.buy-now-modal');

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

    if (breadcrumbs)
      breadcrumbs.innerHTML = `<div class="breadcrumbs"><a href="">Online store</a><span> - ${data.category} - </span><span>${data.brand} - </span><span>${data.title}</span></div>`;

    if (productCardTitle) productCardTitle.textContent = data.title;
    if (productCardPrice) productCardPrice.textContent = `Price: ${data.price.toString()}$`;
    if (productCardCategory) productCardCategory.textContent = `Category: ${data.category}`;
    if (productCardBrand) productCardBrand.textContent = `Brand: ${data.brand}`;
    if (productCardRating) productCardRating.textContent = `Rating: ${data.rating.toFixed(1).toString()}`;
    if (productCardStock) productCardStock.textContent = `In stock: ${data.stock.toString()}`;
    if (productCardDescription) productCardDescription.textContent = data.description;

    if (main) {
      main.innerHTML = '';
      main.append(productCardClone);
    }

    if (btnBuyNow && buyNowModal)
      btnBuyNow.addEventListener('click', () => {
        if (main) main.classList.toggle('popup-active');
        buyNowModal.classList.toggle('active');
      });

    if (btnAddCart) {
      if (isProductInCart) {
        copyCart.changeButtonAddToCart();
      }

      btnAddCart.addEventListener('click', (e) => {
        copyCart.changeButtonAddToCart(e);
        copyCart.addToCart(data);
      });
    }

    if (galleryAllPhoto) galleryAllPhoto.addEventListener('click', (e) => this.changeMainImage(e));
  }
  changeMainImage(e: Event) {
    const mainImg: HTMLElement | null = document.querySelector('.gallery__main-photo');

    const currentImg = <Node>e.target;
    const parentElementImg = currentImg.parentElement;

    if (mainImg && parentElementImg) {
      mainImg.innerHTML = parentElementImg.innerHTML;
    }
  }
}
export default Pdp;
