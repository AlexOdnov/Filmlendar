import {
  getDaysInMonth,
  getFirstDayOfMonth,
  getDateWithoutMs,
  getPrevMonth,
  getNextMonth,
  getMonthName,
} from './dateHelpers';

const DAYS_IN_GRID = 42;

export class Calendar {
  constructor(calendarSelector = '.calendar') {
    this.calendar = document.querySelector(calendarSelector);
    this.calendarGridWrapper = this.calendar.querySelector(
      '.calendar__grid-wrapper'
    );
    this.monthName = this.calendar.querySelector('.calendar__cell--month');
    this.prevMonthBtn = this.calendar.querySelector(
      '.calendar__cell--prev-month'
    );
    this.nextMonthBtn = this.calendar.querySelector(
      '.calendar__cell--next-month'
    );
    this.init();
  }

  init() {
    this.currentDate = getDateWithoutMs(new Date());
    this.visibleDate = this.currentDate;
    this.renderCurrentMonth();
    this.renderPrevMonth();
    this.renderNextMonth();
    this.setMonthName(this.currentDate);
    this.prevMonthBtn.addEventListener('click', this.decreaseMonth.bind(this));
    this.nextMonthBtn.addEventListener('click', this.increaseMonth.bind(this));
  }

  createMonth(date) {
    const prevMonthDays = getDaysInMonth(getPrevMonth(date));
    const curentMonthDays = getDaysInMonth(date);
    const firstDayOfCurrentMonth = getFirstDayOfMonth(date);

    const month = document.createElement('div');
    month.classList.add('calendar__grid');
    let helpCounter = 0;

    for (let i = 0; i < DAYS_IN_GRID; i++) {
      const cell = document.createElement('div');
      cell.classList.add('calendar__cell');
      month.append(cell);

      //create prev month days
      const prevDay = prevMonthDays - firstDayOfCurrentMonth + i + 1;
      if (prevDay <= prevMonthDays) {
        helpCounter++;
        cell.textContent = prevDay;
        cell.classList.add('calendar__cell--disabled');
        continue;
      }

      //create current month days
      const currentDay = i - helpCounter + 1;
      if (currentDay <= curentMonthDays) {
        cell.textContent = currentDay;
        if (
          !(
            new Date(date.getFullYear(), date.getMonth(), currentDay) -
            this.currentDate
          )
        ) {
          cell.classList.add('calendar__cell--active');
        }
        continue;
      }

      //create next month days
      cell.textContent = i - helpCounter + 1 - curentMonthDays;
      cell.classList.add('calendar__cell--disabled');
    }

    return month;
  }

  renderCurrentMonth() {
    this.currentMonth = this.createMonth(this.currentDate);
    this.calendarGridWrapper.append(this.currentMonth);
  }

  renderPrevMonth() {
    const date = getPrevMonth(this.visibleDate);
    this.prevMonth = this.createMonth(date);
    this.prevMonth.style.transform = 'translate(-100%, 0)';
    this.calendarGridWrapper.prepend(this.prevMonth);
  }

  renderNextMonth() {
    const date = getNextMonth(this.visibleDate);
    this.nextMonth = this.createMonth(date);
    this.nextMonth.style.transform = 'translate(100%, 0)';
    this.calendarGridWrapper.append(this.nextMonth);
  }

  setMonthName(date) {
    const monthName = getMonthName(date);
    const year = date.getFullYear();
    this.monthName.textContent = `${monthName}, ${year}`;
  }

  decreaseMonth() {
    const tempMonth = this.nextMonth;
    setTimeout(() => {
      tempMonth.remove();
    }, 300);
    this.nextMonth = this.currentMonth;
    this.nextMonth.style.transform = 'translate(100%, 0)';
    this.currentMonth = this.prevMonth;
    this.currentMonth.style.transform = 'translate(0, 0)';
    this.visibleDate = getPrevMonth(this.visibleDate);
    this.renderPrevMonth();
    this.setMonthName(this.visibleDate);
  }

  increaseMonth() {
    const tempMonth = this.prevMonth;
    setTimeout(() => {
      tempMonth.remove();
    }, 300);
    this.prevMonth = this.currentMonth;
    this.prevMonth.style.transform = 'translate(-100%, 0)';
    this.currentMonth = this.nextMonth;
    this.currentMonth.style.transform = 'translate(0, 0)';
    this.visibleDate = getNextMonth(this.visibleDate);
    this.renderNextMonth();
    this.setMonthName(this.visibleDate);
  }
}
