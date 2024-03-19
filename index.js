const parentElement = document.querySelector('.main');
const apiKey = "eda08b1cc545e927809e4bfb1fed1676";
const URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
const getMovies = async (url) => {
  try {
    const data = await axios.get(url);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
getMovies(URL);

let movies = await getMovies(URL);
const movieList = movies.data.results;
console.log(movies.data.results);

const createElement = (element) => document.createElement(element);

// fetch(URL)
// .then((response) => response.json())
// .then((data)=> console.log(data))
// .catch((err)=>console.log(err))

//function to create movie cards

const createMovieCard = (movies) => {
  for (let movie of movieList) {
    // creating parent container
    const cardContainer = createElement("div");
    cardContainer.classList.add("card", "shadow");

    //creating image container
    const imageContainer = createElement("div");
    imageContainer.classList.add("card-image-container");

    //creating card image
    const imageEle = createElement("img");
    imageEle.classList.add("card-image");
    imageEle.setAttribute("src", `https://image.tmdb.org/t/p/w300${movie.poster_path}`);
    imageEle.setAttribute("alt", movie.title);
    imageContainer.appendChild(imageEle);
    cardContainer.appendChild(imageContainer);

    // creating card details container

    const cardDetails = createElement('div');
    cardDetails.classList.add('movie-details');

    // card title

    const titleEle = createElement('p');
    titleEle.classList.add('title');
    titleEle.innerText=movie.original_title;
    cardDetails.appendChild(titleEle);

    //card genre

    // const genreEle = createElement('p');
    // genreEle.classList.add('genre');
    // genreEle.innerText=movie.vote_average;
    // cardDetails.appendChild(genreEle);

    // ratings and length container
    const movieRatings = createElement('div');
    movieRatings.classList.add('ratings');

    // star/ratings component

    const ratings = createElement('div');
    ratings.classList.add('star-rating');

    //star icon
    const starIcon = createElement('span');
    starIcon.classList.add('material-symbols-outlined');
    starIcon.innerText='star';
    ratings.appendChild(starIcon)

    //ratings
    const ratingValue = createElement('span');
    ratingValue.innerText=movie.vote_average;
    ratings.appendChild(ratingValue);
    movieRatings.appendChild(ratings);

    //length
    const length = createElement('p');
    length.innerText=`Votes: ${movie.vote_count}`
    movieRatings.appendChild(length);

    cardDetails.appendChild(movieRatings);
    cardContainer.appendChild(cardDetails);
    parentElement.appendChild(cardContainer);

  
}
}

createMovieCard(movieList);
