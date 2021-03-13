import axios from "axios";
import config from "../config/config.json";

/**
 * http 통신을 위한 모듈
 */
const baseURL = (() => {
  if (process.env.NODE_ENV === "development") {
    return `http://${config.server.host}:${config.server.port}`;
  } else if (process.env.NODE_ENV === "production") {
    return "/";
  } else {
    return "/";
  }
})();

const httpClient = axios.create({
  baseURL,
});

export default httpClient;
