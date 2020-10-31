import { QUERY } from './query';
import { API_KEY } from './api_key';
import { getRandomNumber } from './getRandomNumber';
import FastAverageColor from 'fast-average-color';

const fac = new FastAverageColor();

export class Film {
  constructor() {
    this.poster = document.querySelector('.poster');
    this.title = document.querySelector('.film-title__title');
    this.score = document.querySelector('.film-title__score');
    this.bg = document.querySelector('main');
    this.calendar = document.querySelector('.app__calendar');
    this.copyright = document.querySelector('.copyright');
    this.update = this.update.bind(this);
    this.init();
  }

  init() {
    this.poster.addEventListener('click', () => {
      this.calendar.classList.toggle('app__calendar--hide');
      this.copyright.classList.toggle('copyright--visible');
    });
  }

  async update(number) {
    try {
      this.poster.style.opacity = '0';
      const { title, id, score, poster } = await this.chooseData(number);
      this.title.textContent = title;
      this.title.setAttribute('href', `https://www.themoviedb.org/movie/${id}`);
      this.score.textContent = `${score * 10}%`;
      this.poster.setAttribute(
        'src',
        `https://image.tmdb.org/t/p/original${poster}`
      );
      this.poster.onload = function () {
        this.poster.style.opacity = '';
        this.setGradient(this.poster);
      }.bind(this);
    } catch (error) {
      console.warn(error);
      this.poster.style.opacity = '';
    }
  }

  async loadData(number) {
    const generateQuery = (number) => {
      return QUERY[number][getRandomNumber(0, QUERY[number].length - 1)];
    };

    const query = generateQuery(number);
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&include_adult=false`;

    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.warn(error);
    }
  }

  async chooseData(number) {
    try {
      const response = await this.loadData(number);
      const result = response.results;

      let rnd = getRandomNumber(0, result.length - 1);
      let isPoster = result[rnd].poster_path;

      if (isPoster) {
        return {
          title: result[rnd].title,
          id: result[rnd].id,
          score: result[rnd].vote_average,
          poster: result[rnd].poster_path,
        };
      } else {
        for (const film of result) {
          if (film.poster_path) {
            return {
              title: film.title,
              id: film.id,
              score: film.vote_average,
              poster: film.poster_path,
            };
          }
        }
      }
    } catch (error) {
      console.warn(error);
    }
  }

  setGradient(img) {
    const partsCount = 5;
    const naturalHeight = img.naturalHeight;
    const naturalHeightPart = Math.floor(naturalHeight / partsCount);

    const parts = [];
    let bottomColor = null;

    for (let i = 0; i < partsCount; i++) {
      const color = fac.getColor(img, {
        left: 0,
        top: i * naturalHeightPart,
        height: naturalHeightPart,
      });

      parts.push(`${color.rgb} ${(i * 100) / (partsCount - 1)}%`);

      if (partsCount - i === 1) {
        bottomColor = color;
      }
    }

    this.bg.style.background = `linear-gradient(to bottom, ${parts.join(
      ', '
    )})`;

    this.copyright.style.color = bottomColor.isDark ? '#fff' : '#000';
  }
}
