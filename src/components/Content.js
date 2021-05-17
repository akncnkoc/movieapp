import { createBrowserHistory } from "history";

import { Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import About from "./About";
import Movie from "./Movie";
import Home from "./Home";

function Content() {
  const historyInstance = createBrowserHistory();
  return (
    <div className="content">
      <Router history={historyInstance}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/movie/:id"
            render={(props) => {
              return <Movie id={props.match.params.id} />;
            }}
          />
          <Route path="/about" component={About} />
        </Switch>
      </Router>
    </div>
  );
}
export default Content;
