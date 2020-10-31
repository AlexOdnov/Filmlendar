export const getRandomNumber = (min, max) => {
  return Math.floor(min + (max + 1 - min) * Math.random());
};
