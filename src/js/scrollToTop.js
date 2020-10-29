export class ScrollToTop {
  constructor(button = '.scroll-to-top') {
    this.windowHeight = document.documentElement.clientHeight;
    this.scrollButton = document.querySelector(button);
    this.init();
  }

  init() {
    window.addEventListener('scroll', this.toggleBtnVisibility.bind(this));

    this.scrollButton.addEventListener('click', (e) => {
      e.preventDefault;

      window.scroll({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  toggleBtnVisibility() {
    window.pageYOffset > this.windowHeight
      ? this.scrollButton.classList.add('active')
      : this.scrollButton.classList.remove('active');
  }
}
