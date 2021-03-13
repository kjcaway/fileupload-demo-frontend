import { createBrowserHistory } from "history";
import { createStore } from "redux";
import rootReducer from "./reducer";

const store = createStore(rootReducer);

const history = createBrowserHistory();
export { history };
export default store;
