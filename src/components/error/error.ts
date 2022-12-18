class Error404 {

  constructor() {
  }

  drawError() {
    const main = document.querySelector('.main');
    if (main) {
      main.innerHTML = '404';
    }
  }
}
export default Error404;
