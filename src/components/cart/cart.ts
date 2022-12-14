class Cart {
  // патерн singleton
  private static _instance: Cart;
  constructor() {}

  public static getInstance(): Cart {
    if (!Cart._instance) {
      Cart._instance = new Cart();
    }

    return Cart._instance;
  }

  addToCart() {
    //сделать функцию
    console.log('Добавлено в корзину');
  }
}
export default Cart;
