import type { IProduct } from '../../interfaces';


class Plp {
    constructor() {
    }

   drawProducts (data: IProduct[]) {
      const fragment = document.createDocumentFragment();
      const productItemTemp = <HTMLTemplateElement>document.querySelector('#productItemTemp');

      data.forEach((item) => {
         const productClone = <HTMLElement>productItemTemp.content.cloneNode(true);

         (productClone.querySelector('.product__image') as HTMLElement).innerHTML = `<img src="${item.images[0]}" alt="${item.title}">`;
         productClone.querySelector('.product__item')?.setAttribute('data-id', item.id.toString());

         fragment.append(productClone);
      });

         document.querySelector('.main')?.append(fragment);
   }

}
export default Plp;