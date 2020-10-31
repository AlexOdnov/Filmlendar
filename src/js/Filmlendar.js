import { Calendar } from './Calendar';

export class Filmlendar extends Calendar {
  constructor(settings = {}) {
    super(settings);

    this.cb = this.settings.cb;
    this.initImg();
  }

  init() {
    super.init();
    this.activeCell = this.calendarGridWrapper.querySelector(
      '.calendar__cell--active'
    );

    this.calendarGridWrapper.addEventListener(
      'click',
      function (e) {
        const target = e.target;
        if (!target.classList.contains('calendar__cell--disabled')) {
          this.updateImg(e);
          this.activeCell.classList.remove('calendar__cell--active');
          this.activeCell = target;
          target.classList.add('calendar__cell--active');
        }
      }.bind(this)
    );
  }

  initImg() {
    this.cb(this.currentDate.getDate());
  }

  updateImg(e) {
    const date = +e.target.textContent;
    this.cb(date);
  }
}
