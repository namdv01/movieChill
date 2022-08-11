const genre = await fetch(
  "https://api.themoviedb.org/3/genre/movie/list?api_key=e9e9d8da18ae29fc430845952232787c&language=vi"
).then((res) => res.json());
const api_key = "e9e9d8da18ae29fc430845952232787c";
//link ảnh đại diện: https://www.themoviedb.org/t/p/original/ + res.results[i].backdrop_path

const popular = await fetch(
  "https://api.themoviedb.org/3/movie/popular?api_key=e9e9d8da18ae29fc430845952232787c&language=vi&page=1"
).then((res) => res.json());

const upComing = await fetch(
  "https://api.themoviedb.org/3/movie/upcoming?api_key=e9e9d8da18ae29fc430845952232787c&language=vi&page=1"
).then((res) => res.json());

// without video
const getDetail = async (idFilm) => {
  const result = await fetch(
    `https://api.themoviedb.org/3/movie/${idFilm}?api_key=e9e9d8da18ae29fc430845952232787c&append_to_response=videos&language=vi`
  ).then((res) => res.json());
  return result;
};

const getVideoByIdFilm = async (idFilm) => {
  const result = await fetch(
    `https://api.themoviedb.org/3/movie/${idFilm}/videos?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US`
  ).then((res) => res.json());
  return result;

  // https://www.youtube.com/watch?v= result.results[0].key
};

const getFilmRecently = async () => {
  const year = new Date().getFullYear();
  const result = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=e9e9d8da18ae29fc430845952232787c&language=vi&page=1&year=${year}`
  ).then((res) => res.json());
  return { year, result };
};

const topRate = await fetch(
  `https://api.themoviedb.org/3/movie/top_rated?api_key=e9e9d8da18ae29fc430845952232787c&language=vi&page=1`
).then((res) => res.json());

const nowPlaying = await fetch(
  `https://api.themoviedb.org/3/movie/now_playing?api_key=e9e9d8da18ae29fc430845952232787c&language=vi&page=1`
).then((res) => res.json());

const getFilmsByGenre = async (type) => {
  const result = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=e9e9d8da18ae29fc430845952232787c&language=vi&page=1&with_genres=${type}`
  ).then((res) => res.json());
  return result;
};

const getFilmsRecomment = async (idFilm) => {
  const result = await fetch(
    `https://api.themoviedb.org/3/movie/${idFilm}/recommendations?api_key=e9e9d8da18ae29fc430845952232787c&language=vi&page=1`
  ).then((res) => res.json());
  return result;
};

const searchFilmByKey = async (key) => {
  const result = await fetch(`
  https://api.themoviedb.org/3/search/movie?api_key=e9e9d8da18ae29fc430845952232787c&language=en-US&query=${key}&page=1`).then(
    (res) => res.json()
  );
  return result;
};

export {
  genre,
  popular,
  getDetail,
  getVideoByIdFilm,
  getFilmRecently,
  getFilmsByGenre,
  getFilmsRecomment,
  searchFilmByKey,
  upComing,
  topRate,
  nowPlaying,
};
