import { Route } from "react-router-dom";
import { Router } from "react-router";

import About from "./About";
import Movie from "./Movie";
import PopularMovies from "./PopularMovies";
import createHistory from "history/createBrowserHistory";

function Content() {
  const history = createHistory();

  return (
    <div className="content">
      <Router history={history}>
        <Route exact path="/" component={PopularMovies} />
        <Route path="/movie" component={Movie} />
        <Route path="/about" component={About} />
      </Router>
    </div>
  );
}
export default Content;
