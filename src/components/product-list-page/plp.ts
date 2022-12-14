import Cart from '../cart/cart';

import type { IProduct } from '../../interfaces';

class Plp {
  constructor() {}

  markup() {
    const markupPlpTemp = <HTMLTemplateElement>document.querySelector('#markupPlpTemp');
    const markupClone = <HTMLElement>markupPlpTemp.content.cloneNode(true);
    document.querySelector('.main')?.append(markupClone);
  }

  drawAside() {}

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
