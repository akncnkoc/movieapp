import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
function Movie() {
  const location = useLocation();
  const id = location.state.id;
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "?api_key=ca4c57c6922e4c6efa7edb27e8175abe&language=tr"
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setMovie(res);
      });
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "/credits?api_key=ca4c57c6922e4c6efa7edb27e8175abe&language=tr"
    )
      .then((res) => res.json())
      .then((res) => {
        setCredits(res);
      });
  }, []);
  return (
    <div className="container p-0 h-100 bg-white">
      {movie != null && (
        <div>
          {/* <div
            className="movie-backdrop h-100"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
            }}
          ></div> */}
          <div className="row">
            <div className="col-3">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="col-9 my-3">
              <h3>{movie.title}</h3>
              <span>{movie.overview}</span>
              <h3>Puan</h3>
              <span>{movie.vote_average}</span>
              <h3>Etiketler</h3>
              <span>{movie.tagline}</span>
              <h3>Bütçe</h3>
              <span>{movie.budget}</span>
              <div className="my-5 categories">
                <h3>Kategoriler</h3>
                {movie.genres.map((genre) => (
                  <p key={genre.id}>{genre.name}</p>
                ))}
              </div>
              <div className="my-5 companies">
                <h3>Yapımcılar</h3>
                <div className="d-flex flex-wrap text-center align-items-center">
                  {movie.production_companies.map((company) => (
                    <div key={company.id} className="p-5">
                      {company.logo_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w154${company.logo_path}`}
                          alt=""
                        />
                      ) : (
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png"
                          alt=""
                          width="185"
                        />
                      )}

                      <p>{company.name}</p>
                    </div>
                  ))}
                </div>
              </div>
              {credits && (
                <div className="my-5 casts">
                  <h3>Oyuncular</h3>
                  <div className="d-flex flex-wrap align-items-center justify-content-center text-center">
                    {credits.cast.map((cast) => (
                      <div key={cast.id} className="p-5">
                        <div className="d-flex align-items-center">
                          {cast.profile_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`}
                              alt=""
                            />
                          ) : (
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png"
                              alt=""
                              width="185"
                            />
                          )}
                        </div>
                        <p className="flex-grow-1">{cast.original_name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Movie;
