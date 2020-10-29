import scrollToggler from './scrollToggler';
import focusController from './focusController';

export class Modal {
  constructor(modalName, closeBtn = false) {
    this.modalOpener = document.querySelectorAll(`.${modalName}-opener`);
    this.modal = document.querySelector(`.modal-${modalName}`);
    if (closeBtn) {
      this.closeBtn = this.modal.querySelector('.modal-close');
    }
    this.isModalOpen = false;
    this.init();
  }

  static overlay = null;
  static openedModal = null;
  static currentOpener = null;

  static createOverlay() {
    Modal.overlay = document.createElement('div');
    Modal.overlay.classList.add('modal-overlay');
    document.body.append(Modal.overlay);
  }

  init() {
    this.modalOpener.forEach((element) => {
      element.addEventListener(
        'click',
        function (e) {
          if (!this.isModalOpen) {
            this.modalOpen(e);
          }
        }.bind(this)
      );
    });

    if (!Modal.overlay) {
      Modal.createOverlay();
    }

    Modal.overlay.addEventListener(
      'click',
      function (e) {
        if (this.isModalOpen) {
          this.modalClose(e);
        }
      }.bind(this)
    );

    window.addEventListener(
      'keydown',
      function (e) {
        if (this.isModalOpen && e.code === 'Escape') {
          this.modalClose(e);
          return;
        }
        if (this.isModalOpen && e.code === 'Tab') {
          focusController(e, this.modal);
          return;
        }
      }.bind(this)
    );

    if (this.closeBtn) {
      this.closeBtn.addEventListener(
        'click',
        function (e) {
          if (this.isModalOpen) {
            this.modalClose(e);
          }
        }.bind(this)
      );
    }
  }

  modalOpen(e) {
    e.preventDefault();

    if (Modal.openedModal) {
      this.modalSwitch();
      return;
    }

    Modal.openedModal = this;
    Modal.currentOpener = e.target;

    this.modal.classList.add('active');
    Modal.overlay.classList.add('active');
    this.isModalOpen = true;
    scrollToggler(this.modal);
  }

  modalClose(e) {
    e.preventDefault();

    const transitionDuration = this.getTransitionDuration(this.modal);

    this.modal.classList.remove('active');
    Modal.overlay.classList.remove('active');
    this.isModalOpen = false;
    scrollToggler(this.modal);
    this.modal.style.left = `calc(50% + ${
      (window.innerWidth - document.body.offsetWidth) / 2 + 'px'
    })`;
    setTimeout(() => {
      this.modal.style.left = '';
    }, transitionDuration);

    Modal.currentOpener.focus();
    Modal.currentOpener = null;
    Modal.openedModal = null;
  }

  modalSwitch() {
    Modal.openedModal.modal.classList.remove('active');
    Modal.openedModal.isModalOpen = false;

    this.modal.classList.add('active');
    this.isModalOpen = true;

    Modal.openedModal = this;
  }

  getTransitionDuration(element) {
    return +getComputedStyle(element)
      .transitionDuration.match(/\d+[.]\d+|\d+/g)
      .sort((a, b) => b - a)
      .slice(0, 1)
      .map((el) => +el * 1000)
      .join('');
  }
}
