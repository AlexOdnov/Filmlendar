const focusableSelector = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
  'select:not([disabled]):not([aria-hidden])',
  'textarea:not([disabled]):not([aria-hidden])',
  'button:not([disabled]):not([aria-hidden])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex^="-"])',
];

const focusController = (e, container) => {
  const focusableElements = [...container.querySelectorAll(focusableSelector)];

  if (!focusableElements.length) {
    container.focus();
    e.preventDefault();
    return;
  }

  if (!container.contains(document.activeElement)) {
    focusableElements[0].focus();
    e.preventDefault();
  } else {
    const focusedElementIndex = focusableElements.indexOf(
      document.activeElement
    );
    if (e.shiftKey && focusedElementIndex === 0) {
      focusableElements[focusableElements.length - 1].focus();
      e.preventDefault();
    }
    if (!e.shiftKey && focusedElementIndex === focusableElements.length - 1) {
      focusableElements[0].focus();
      e.preventDefault();
    }
  }
};

export default focusController;
