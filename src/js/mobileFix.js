export const mobileFix = () => {
  if (/android/i.test(window.navigator.userAgent)) {
    const app = document.querySelector('.app');
    const bg = document.querySelector('main');

    const fixAppHeight = () => {
      const visibleHeight = document.documentElement.clientHeight;

      app.style.height = `${visibleHeight}px`;
      bg.style.maxHeight = `${visibleHeight}px`;
    };

    fixAppHeight();

    window.addEventListener('resize', fixAppHeight);
  }
};
