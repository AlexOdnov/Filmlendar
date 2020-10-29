import scrollToggler from './scrollToggler';
import focusController from './focusController';

export class MobileMenu {
  constructor(settings = {}) {
    this.settings = Object.assign(
      {
        menuContainerSelector: '.header',
        menuSelector: '.navigation',
        btnSelector: '.mobile-menu-toggler',
        breakpoint: '768',
      },
      settings
    );
    this.menuContainer = document.querySelector(
      this.settings.menuContainerSelector
    );
    this.menu = document.querySelector(this.settings.menuSelector);
    this.btn = document.querySelector(this.settings.btnSelector);
    this.isMenuOpen = false;
    this.breakpoint = this.settings.breakpoint;
    this.init();
  }

  init() {
    this.btn.addEventListener(
      'click',
      function (e) {
        if (this.isMenuOpen) {
          this.menuClose(e);
        } else {
          this.menuOpen(e);
        }
      }.bind(this)
    );

    window.addEventListener(
      'click',
      function (e) {
        if (this.isMenuOpen && !this.menuContainer.contains(e.target)) {
          this.menuClose(e);
        }
      }.bind(this)
    );

    window.addEventListener(
      'keydown',
      function (e) {
        if (this.isMenuOpen && e.code === 'Escape') {
          this.menuClose(e);
          return;
        }
        if (this.isMenuOpen && e.code === 'Tab') {
          focusController(e, this.menuContainer);
          return;
        }
      }.bind(this)
    );

    window.addEventListener(
      'resize',
      function (e) {
        if (this.isMenuOpen && window.innerWidth > this.breakpoint) {
          this.menuClose(e);
        }
      }.bind(this)
    );
  }

  menuOpen(e) {
    e.preventDefault();

    this.isMenuOpen = true;
    this.menu.style.transition = 'all 0.3s ease 0s';
    this.menu.classList.add('active');
    this.btn.classList.add('active');
    scrollToggler(this.menu);
    setTimeout(() => {
      this.menu.style.transition = '';
    }, 350);
  }

  menuClose(e) {
    e.preventDefault();

    this.isMenuOpen = false;
    this.menu.style.transition = 'all 0.3s ease 0s';
    this.menu.classList.remove('active');
    this.btn.classList.remove('active');
    scrollToggler(this.menu);
    setTimeout(() => {
      this.menu.style.transition = '';
    }, 350);
    this.btn.focus();
  }
}
