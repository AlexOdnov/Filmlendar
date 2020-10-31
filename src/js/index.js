import { mobileFix } from './mobileFix';
import { Film } from './Film';
import { Filmlendar } from './Filmlendar';

mobileFix();
const film = new Film();
const filmlendar = new Filmlendar({
  cb: film.update,
});
