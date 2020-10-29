export const mobileFix = () => {
  if (/android/i.test(window.navigator.userAgent)) {
    const app = document.querySelector('.app');

    const fixAppHeight = () => {
      const visibleHeight = document.documentElement.clientHeight;

      app.style.height = `${visibleHeight}px`;
    };

    fixAppHeight();

    window.addEventListener('resize', fixAppHeight);
  }
};
