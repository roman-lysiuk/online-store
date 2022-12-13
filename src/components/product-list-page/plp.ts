import type { IProduct } from '../../interfaces';


class Plp {
    constructor() {
    }

    markup() {
      const markupPlpTemp = <HTMLTemplateElement>document.querySelector('#markupPlpTemp');
      const markupClone = <HTMLElement>markupPlpTemp.content.cloneNode(true);
      document.querySelector('.main')?.append(markupClone);
    }

    drawAside() {

    }

    drawSort() {

    }

   drawProducts(data: IProduct[]) {
      const fragment = document.createDocumentFragment();
      const productItemTemp = <HTMLTemplateElement>document.querySelector('#productItemTemp');

      data.forEach((item) => {
         const productClone = <HTMLElement>productItemTemp.content.cloneNode(true);

         (productClone.querySelector('.product__image') as HTMLElement).innerHTML = `<img src="${item.images[0]}" alt="${item.title}">`;
         productClone.querySelector('.product__item')?.setAttribute('data-id', item.id.toString());
         productClone.querySelector('.product__item')?.addEventListener('click', function() {window.location.href = 'https://google.com'});

         fragment.append(productClone);
      });

         document.querySelector('.products')?.append(fragment);
   }

}
export default Plp;