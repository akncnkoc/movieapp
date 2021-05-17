import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";
import "swiper/components/effect-fade/effect-fade.min.css";
import ContentLoader from "react-content-loader";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const MyLoader = (props) => (
  <ContentLoader
    width={450}
    height={400}
    viewBox="0 0 450 400"
    backgroundColor="#f0f0f0"
    foregroundColor="#dedede"
    {...props}
  >
    <rect x="43" y="304" rx="4" ry="4" width="271" height="9" />
    <rect x="44" y="323" rx="3" ry="3" width="119" height="6" />
    <rect x="42" y="77" rx="10" ry="10" width="388" height="217" />
  </ContentLoader>
);
function Home() {
  const history = useHistory();
  const [popularMovies, setPopularMovies] = useState({});
  const [topRatedMovies, setTopRatedMovies] = useState({});
  const [upcomingMovies, setUpcomingMovies] = useState({});
  const [searchText, setSearchText] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchedMovies, setSearchedMovies] = useState({});
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "0",
      padding: "0",
    },
  };
  const showMovie = (id) => {
    history.push("/movie/" + id);
  };
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular/?api_key=ca4c57c6922e4c6efa7edb27e8175abe&language=tr&page=1"
    )
      .then((res) => {
        return res.json();
      })
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

  useEffect(() => {
    return () => {
      setSearchLoading(true);
      if (searchText) {
        fetch(
          "https://api.themoviedb.org/3/search/movie/?api_key=ca4c57c6922e4c6efa7edb27e8175abe&query=" +
            searchText +
            "&language=tr"
        )
          .then((res) => res.json())
          .then((res) => {
            setSearchLoading(false);
            setSearchedMovies(res.results);
          });
      }
    };
  }, [searchText]);
  return (
    <div className="container movies p-0" id="popular-movies">
      <div className="jumbotron jumbotron-fluid p-3 my-5" style={{background: '#ececec'}}>
        <h1 className="display-4">Herkes için film</h1>
        <p className="lead">
          Film
        </p>
      </div>
      <div className="form-group">
        <label htmlFor="searchText">Film Ara</label>
        <input
          type="text"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          className="form-control"
          id="searchText"
        />
      </div>
      {!searchText ? (
        <div>
          <h3>Popüler Filmler</h3>
          <div className="movies-inner">
            <Swiper
              spaceBetween={50}
              effect="fade"
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 50,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
              }}
              onSlideChange={() => console.log("slide change")}
            >
              {popularMovies.length > 0 ? (
                popularMovies.map((movie) => (
                  <SwiperSlide
                    onClick={(e) => showMovie(movie.id)}
                    className="d-flex flex-column movie-item position-relative"
                    key={movie.id}
                    style={{
                      minHeight: "350px",
                      height: "500px",
                      maxHeight: "550px",
                    }}
                  >
                    <div className="m-3 m-lg-0 border rounded">
                      <div
                        style={{
                          position: "absolute",
                          top: "20px",
                          right: "20px",
                          width: "50px",
                          height: "50px",
                          zIndex: 3,
                          backgroundColor: "#081C22",
                          borderRadius: "50%",
                          border: "5px solid #081C22",
                        }}
                      >
                        <CircularProgressbar
                          value={movie.vote_average * 10}
                          text={`${movie.vote_average * 10}%`}
                          styles={buildStyles({
                            trailColor: "#204529",
                            pathColor: "#1DA865",
                            textColor: "white",
                            textSize: "24px",
                          })}
                        />
                      </div>
                      <div
                        style={{
                          width: "100%",
                          height: "400px",
                          filter: "brightness(50%)",
                        }}
                      >
                        <img
                          width="100%"
                          height="400px"
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt=""
                          style={{
                            borderRadius: "5px 5px 0 0",
                          }}
                        />
                      </div>
                      <div className="p-2 mt-3 d-flex flex-column align-items-center text-center">
                        <p>{movie.title}</p>
                        <p className="release-date">{movie.release_date}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <p>Yükleniyor</p>
              )}
            </Swiper>
          </div>
          <h3>En Çok Oy Alan Filmler</h3>
          <div className="movies-inner">
            <Swiper
              spaceBetween={50}
              effect="fade"
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 50,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
              }}
              onSlideChange={() => console.log("slide change")}
            >
              {topRatedMovies.length > 0 ? (
                topRatedMovies.map((movie) => (
                  <SwiperSlide
                    onClick={(e) => showMovie(movie.id)}
                    className="d-flex flex-column movie-item position-relative"
                    key={movie.id}
                    style={{
                      minHeight: "350px",
                      height: "500px",
                      maxHeight: "550px",
                    }}
                  >
                    <div className="m-3 m-lg-0 border rounded">
                      <div
                        style={{
                          position: "absolute",
                          top: "20px",
                          right: "20px",
                          width: "50px",
                          height: "50px",
                          zIndex: 3,
                          backgroundColor: "#081C22",
                          borderRadius: "50%",
                          border: "5px solid #081C22",
                        }}
                      >
                        <CircularProgressbar
                          value={movie.vote_average * 10}
                          text={`${movie.vote_average * 10}%`}
                          styles={buildStyles({
                            trailColor: "#204529",
                            pathColor: "#1DA865",
                            textColor: "white",
                            textSize: "24px",
                          })}
                        />
                      </div>
                      <div
                        style={{
                          width: "100%",
                          height: "400px",
                          filter: "brightness(50%)",
                        }}
                      >
                        <img
                          width="100%"
                          height="400px"
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt=""
                          style={{
                            borderRadius: "5px 5px 0 0",
                          }}
                        />
                      </div>
                      <div className="p-2 mt-3 d-flex flex-column align-items-center text-center">
                        <p>{movie.title}</p>
                        <p className="release-date">{movie.release_date}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <p>Yükleniyor</p>
              )}
            </Swiper>
          </div>

          <h3>Yeni Çıkacak Filmler</h3>
          <div className="movies-inner">
            <Swiper
              spaceBetween={50}
              effect="fade"
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 50,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
              }}
              onSlideChange={() => console.log("slide change")}
            >
              {upcomingMovies.length > 0 ? (
                upcomingMovies.map((movie) => (
                  <SwiperSlide
                    onClick={(e) => showMovie(movie.id)}
                    className="d-flex flex-column movie-item position-relative"
                    key={movie.id}
                    style={{
                      minHeight: "350px",
                      height: "500px",
                      maxHeight: "550px",
                    }}
                  >
                    <div className="m-3 m-lg-0 border rounded">
                      <div
                        style={{
                          position: "absolute",
                          top: "20px",
                          right: "20px",
                          width: "50px",
                          height: "50px",
                          zIndex: 3,
                          backgroundColor: "#081C22",
                          borderRadius: "50%",
                          border: "5px solid #081C22",
                        }}
                      >
                        <CircularProgressbar
                          value={movie.vote_average * 10}
                          text={`${movie.vote_average * 10}%`}
                          styles={buildStyles({
                            trailColor: "#204529",
                            pathColor: "#1DA865",
                            textColor: "white",
                            textSize: "24px",
                          })}
                        />
                      </div>
                      <div
                        style={{
                          width: "100%",
                          height: "400px",
                          filter: "brightness(50%)",
                        }}
                      >
                        <img
                          width="100%"
                          height="400px"
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt=""
                          style={{
                            borderRadius: "5px 5px 0 0",
                          }}
                        />
                      </div>
                      <div className="p-2 mt-3 d-flex flex-column align-items-center text-center">
                        <p>{movie.title}</p>
                        <p className="release-date">{movie.release_date}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <p>Yükleniyor</p>
              )}
            </Swiper>
          </div>
        </div>
      ) : (
        <div>
          {!searchLoading ? (
            <div>
              <h3>Bulunan Filmler</h3>
              <div className="movies-inner">
                <Swiper
                  spaceBetween={50}
                  slidesPerView={5}
                  onSlideChange={() => console.log("slide change")}
                >
                  {searchedMovies.length > 0 ? (
                    searchedMovies.map((movie) => (
                      <SwiperSlide
                        onClick={(e) => showMovie(movie.id)}
                        className="d-flex border rounded flex-column movie-item"
                        key={movie.id}
                        style={{
                          minHeight: "350px",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            bottom: "50px",
                            left: "20px",
                            width: "50px",
                            height: "50px",
                            zIndex: 3,
                            backgroundColor: "#081C22",
                            borderRadius: "50%",
                            border: "5px solid #081C22",
                          }}
                        >
                          <CircularProgressbar
                            value={movie.vote_average * 10}
                            text={`${movie.vote_average * 10}%`}
                            styles={buildStyles({
                              trailColor: "#204529",
                              pathColor: "#1DA865",
                              textColor: "white",
                              textSize: "24px",
                            })}
                          />
                        </div>
                        <img
                          width="100%"
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt=""
                          style={{
                            borderRadius: "5px 5px 0 0",
                          }}
                        />
                        <div className="p-2 d-flex flex-column align-items-center text-center">
                          <p>{movie.title}</p>
                          <p className="release-date">{movie.release_date}</p>
                        </div>
                      </SwiperSlide>
                    ))
                  ) : (
                    <p>Film Bulunamadı</p>
                  )}
                </Swiper>
              </div>
            </div>
          ) : (
            <MyLoader />
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
