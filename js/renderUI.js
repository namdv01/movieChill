import {
  genre,
  popular,
  upComing,
  topRate,
  getDetail,
  nowPlaying,
  getFilmsByGenre,
  getFilmsRecomment,
  getVideoByIdFilm,
  getFilmRecently,
  searchFilmByKey,
} from "./callApi.js";
import { linkBackDrop } from "./common.js";

// genre: thể loại film
const genresEle = document.querySelector(".genres");
const showGenre = () => {
  const genres = genre.genres;
  genresEle.innerHTML += genres
    .map((item, i) => {
      if (i == 0) {
        return `
      <ul>
        <div class="genre" idGenre="${item.id}">
          <a href="./listFilms.html?type=genre&idGenre=${item.id}&titleFilm=${item.name}">${item.name}</a>
        </div>  
      `;
      } else if (i == genres.length - 1) {
        return `
    <div class="genre" idGenre="${item.id}">
    <a href="./listFilms.html?type=genre&idGenre=${item.id}&titleFilm=${item.name}">${item.name}</a>
    </div>
    </ul>
    `;
      } else
        return `
    <div class="genre" idGenre="${item.id}">
    <a href="./listFilms.html?type=genre&idGenre=${item.id}&titleFilm=${item.name}">${item.name}</a>
    </div>
    `;
    })
    .join("");
};
showGenre();
genresEle.onclick = (e) => {
  genresEle.querySelector("ul").classList.toggle("toggleFlex");
  genresEle.querySelector(".fa-solid").classList.toggle("fa-caret-down");
  genresEle.querySelector(".fa-solid").classList.toggle("fa-caret-up");
};

const inputSearch = document.getElementById("inputSearch");
const resultSearch = document.querySelector(".resultSearch");
const iconSearch = document.querySelector(".icon-search");
const callSearch = async () => {
  resultSearch.classList.add("toggleBlock");
  const result = await searchFilmByKey(inputSearch.value);
  console.log(result);
  resultSearch.innerHTML = result.results
    .map((item) => {
      return `<a href="./detailFilm.html?idFilm=${item.id}" class="searchItem">
        <img src='${linkBackDrop}${item.backdrop_path}' />
        <div>${item.title}</div>
      </a>`;
    })
    .join("");
};

iconSearch.addEventListener("click", async (e) => {
  if (inputSearch.value !== "") callSearch();
});

inputSearch.addEventListener("focus", (e) => {
  resultSearch.classList.add("toggleBlock");
  if (inputSearch.value == "") {
    resultSearch.classList.remove("toggleBlock");
    resultSearch.innerHTML = "";
  }
});

//film năm 2022
const recentlyFilmEle = document.querySelector(".recentlyFilm");
const showRecentlyFilm = async () => {
  const { year, result } = await getFilmRecently();
  // console.log(result.results);
  const h2 = document.createElement("h2");
  const textNode = document.createTextNode(`Phim năm ${year}`);
  h2.appendChild(textNode);
  document
    .querySelector(".border-recentlyFilm")
    .insertBefore(h2, recentlyFilmEle.parentElement);

  recentlyFilmEle.innerHTML += result.results
    .map((item, i) => {
      return `
      <div class="swiper-slide" film=${item.id}>
        <a href="./detailFilm.html?idFilm=${item.id}">
          <div class="film" title="${item.title} - ${item.overview}">
            <img src="${linkBackDrop}${item.backdrop_path}" />
            <div class="titleFilm" >
              ${item.title}
            </div>
            <div class="btn-playFilm">
              <i class="fa-solid fa-circle-play"></i>
            </div>
          </div>
        </a>
      </div>
    `;
    })
    .join("");

  // Initialize Swiper
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 60,
    slidesPerGroup: 1,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
        spaceBetween: 40,
        slidesPerGroup: 2,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
        slidesPerGroup: 3,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 10,
        slidesPerGroup: 4,
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
};

//film sắp ra
const upCommingFilmEle = document.querySelector(".upCommingFilm");
const showUpCommingFilm = async () => {
  const { results } = await upComing;
  // console.log(results);
  upCommingFilmEle.innerHTML += results
    .map((item, i) => {
      return `
      <a href="./detailFilm.html?idFilm=${item.id}" class="film">
        <div film=${item.id} title="${item.title} - ${item.overview}">
          <img src="${linkBackDrop}${item.backdrop_path}" />
            <div class="titleFilm" >
              ${item.title}
            </div>
            <div class="btn-playFilm">
              <i class="fa-solid fa-circle-play"></i>
            </div>
        </div>
      </a>
      `;
    })
    .join("");
};

//type film
// const showTypeFilm = async () => {};

// openMenu
const menu = document.querySelector(".container-menu");
menu.onclick = (e) => {
  const typeFilm = document.querySelector(".typeFilm");
  // console.log(typeFilm);
  typeFilm.classList.toggle("toggleFlex");
};

//pagination
// const pagination = creat

if (window.location.href.includes("index.html")) {
  showRecentlyFilm();
  showUpCommingFilm();
} else if (window.location.href.includes("detailFilm.html")) {
  const idFilm = window.location.search.substr(1).split("=")[1];
  const result = await getDetail(idFilm);
  const result2 = await getFilmsRecomment(idFilm);
  createDetailFilm(result, result2);
  console.log(result);
} else if (window.location.href.includes("listFilms.html")) {
  const arrSearch = window.location.search.substr(1).split("&");
  const objSearch = {};
  arrSearch.forEach((item) => {
    const a = item.split("=");
    objSearch[a[0]] = a[1];
  });
  objSearch.page = 1;
  console.log(objSearch);
  console.log(window.location.search.split(1));
  createFilmType(objSearch.type, objSearch.idGenre, objSearch.titleFilm);
} else if (window.location.href.includes("watchFilm.html")) {
  const idFilm = window.location.search.substr(1).split("=")[1];
  const result = await getVideoByIdFilm(idFilm);
  console.log(result);
  const iframe = document.querySelector(".border-watchFilm iframe");
  iframe.setAttribute(
    "src",
    `https://www.youtube.com/embed/${result.results[0].key}`
  );
}

async function createFilmType(type, idGenre = null, titleFilm = "") {
  let arrItems = "";
  let textNode = "";
  if (type == "popular") {
    arrItems = await popular.results;
    textNode = document.createTextNode("Phim phổ biến");
  } else if (type == "topRate") {
    arrItems = await topRate.results;
    textNode = document.createTextNode("Phim đánh giá cao");
  } else if (type == "upComing") {
    arrItems = await upComing.results;
    textNode = document.createTextNode("Phim sắp ra");
  } else if (type == "nowPlaying") {
    arrItems = await nowPlaying.results;
    textNode = document.createTextNode("Phim chiếu rạp");
  } else if (type == "genre") {
    arrItems = (await getFilmsByGenre(idGenre)).results;
    console.log(arrItems);
    textNode = document.createTextNode(
      `Thể loại ${decodeURIComponent(titleFilm)}`
    );
  }
  const typeFilmEle = document.querySelector(".film-type");
  const typeFilmBorderEle = document.querySelector(".border-film-type");
  typeFilmEle.innerHTML += arrItems
    .map(
      (item) => `<a href="./detailFilm.html?idFilm=${item.id}" class="film">
        <div film=${item.id} title="${item.title} - ${item.overview}">
          <img src="${linkBackDrop}${item.backdrop_path}" />
            <div class="titleFilm" >
              ${item.title}
            </div>
            <div class="btn-playFilm">
              <i class="fa-solid fa-circle-play"></i>
            </div>
        </div>
      </a>`
    )
    .join("");
  const textEle = document.createElement("h2");
  textEle.appendChild(textNode);
  typeFilmBorderEle.insertBefore(textEle, typeFilmEle);
}

function createDetailFilm(result, result2) {
  const filmIntro = document.querySelector(".topicFilm-intro");
  const filmDetail = document.querySelector(".topicFilm-detail");
  const imgFilmIntro = filmIntro.querySelector(".img");
  const filmSimilar = document.querySelector(".filmSimilar");
  const descFilmIntro = filmIntro.querySelector(".desc");
  imgFilmIntro.innerHTML += `
  <img src="${linkBackDrop}${result.poster_path}" />
  <button><a href='./watchFilm.html?idFilm=${result.id}'>Xem trailer</a></button>
  `;
  descFilmIntro.innerHTML += `
    <h3>${result.title}</h3>
    <p>Thể loại: ${result.genres.map((item) => item.name).join(",")}</p>
    <p>Phát hành: ${formatDate(result.release_date)}</p>
    <p>Điểm đánh giá: ${formatScore(result.vote_average)}</p>
    <p>Số lượt đánh giá: ${result.vote_count}</p>
    <p>Quốc gia: ${result.production_countries
      .map((item) => item.name)
      .join(",")}</p>
  `;
  filmDetail.innerHTML += `
    <h2>Nội dung phim</h2>  
    <p>${result.overview}</p>
  `;
  filmSimilar.innerHTML += result2.results
    .map((item) => {
      return `
        <a href="detailFilm.html?idFilm=${item.id}" class='filmRecomment'>
          <img src=${
            item.backdrop_path ? linkBackDrop + item.backdrop_path : ""
          } />
        <span>${item.title}</span>
        </a>
    `;
    })
    .join("");
}

function formatDate(fullDate) {
  const day = new Date(fullDate);
  const date = day.getDate();
  const month = day.getMonth();
  const year = day.getFullYear();
  return `${date}/${month}/${year}`;
}
function formatScore(score) {
  return Number(score).toFixed(2);
}
