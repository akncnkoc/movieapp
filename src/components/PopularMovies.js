import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

function PopularMovies() {
  const history = useHistory();
  const [popularMovies, setPopularMovies] = useState({});
  const [topRatedMovies, setTopRatedMovies] = useState({});
  const [upcomingMovies, setUpcomingMovies] = useState({});
  const showMovie = (id) => {
    history.push("/movie", { id });
  };
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular/?api_key=ca4c57c6922e4c6efa7edb27e8175abe&language=tr"
    )
      .then((res) => res.json())
      .then((res) => {
        setPopularMovies(res.results);
      })
      .catch((err) => console.error(err));
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated/?api_key=ca4c57c6922e4c6efa7edb27e8175abe&language=tr"
    )
      .then((res) => res.json())
      .then((res) => {
        setTopRatedMovies(res.results);
      })
      .catch((err) => console.error(err));
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming/?api_key=ca4c57c6922e4c6efa7edb27e8175abe&language=tr"
    )
      .then((res) => res.json())
      .then((res) => {
        setUpcomingMovies(res.results);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="container movies p-0" id="popular-movies">
      <h3>Popüler Filmler</h3>
      <div className="movies-inner">
        <Swiper
          spaceBetween={50}
          slidesPerView={8}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {popularMovies.length > 0 &&
            popularMovies.map((movie) => (
              <SwiperSlide
                onClick={(e) => showMovie(movie.id)}
                className="d-flex flex-column justify-content-center text-center align-items-center p-3  movie-item"
                key={movie.id}
              >
                <img
                  width="100"
                  height="100"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt=""
                />
                <p className="text-break">{movie.title}</p>
                <p className="release-date">{movie.release_date}</p>
                <p className="vote-average">{movie.vote_average}</p>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <h3>En Çok Oy Alan Filmler</h3>
      <div className="movies-inner">
        <Swiper
          spaceBetween={50}
          slidesPerView={8}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {topRatedMovies.length > 0 &&
            topRatedMovies.map((movie) => (
              <SwiperSlide
                onClick={(e) => showMovie(movie.id)}
                className="d-flex flex-column justify-content-center text-center align-items-center p-3  movie-item"
                key={movie.id}
              >
                <img
                  width="100"
                  height="100"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt=""
                />
                <p className="text-break">{movie.title}</p>
                <p className="release-date">{movie.release_date}</p>
                <p className="vote-average">{movie.vote_average}</p>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <h3>Yeni Çıkacak Filmler</h3>
      <div className="movies-inner">
        <Swiper
          spaceBetween={50}
          slidesPerView={8}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {upcomingMovies.length > 0 &&
            upcomingMovies.map((movie) => (
              <SwiperSlide
                onClick={(e) => showMovie(movie.id)}
                className="d-flex flex-column justify-content-center text-center align-items-center p-3  movie-item"
                key={movie.id}
              >
                <img
                  width="100"
                  height="100"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt=""
                />
                <p className="text-break">{movie.title}</p>
                <p className="release-date">{movie.release_date}</p>
                <p className="vote-average">{movie.vote_average}</p>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default PopularMovies;
