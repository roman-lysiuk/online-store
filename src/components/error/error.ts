class ErrorPage {
  drawErrorPage(): void {
    const main: HTMLElement | null = document.querySelector('.main');
    if (main) {
      main.innerHTML = `
      <div class="container">
        <div class="error__title">
          <h2>Page not found error (404)</h2>
        </div>
      </div>
      `;
    }
  }
}
export default ErrorPage;
