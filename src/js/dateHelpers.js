export const getDaysInMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

export const getFirstDayOfMonth = (date) =>
  Math.abs(
    (7 + new Date(date.getFullYear(), date.getMonth(), 1).getDay() - 1) % 7
  );

export const getDateWithoutMs = (date) => new Date(date.setHours(0, 0, 0, 0));

export const getPrevMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() - 1);

export const getNextMonth = (date) =>
  new Date(date.getFullYear(), date.getMonth() + 1);

export const getMonthName = (date) =>
  date.toLocaleString(navigator.language, {
    month: 'long',
  });
