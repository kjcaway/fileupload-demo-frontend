import { Route, Router, Switch } from "react-router-dom";
import Main from "./pages/Main";
import { history } from "./store/configureStore";

/**
 * 페이지 라우트
 */
function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Main}></Route>
      </Switch>
    </Router>
  );
}

export default App;
