import routes from "./routes";
import axios from "axios";

export const apiRequest = (name, parameters) => {
  const method = routes[name][1],
    websiteUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:8080"
        : "https://gallant-franklin-bab9b7.netlify.com/api", //change when domain changes
    url = websiteUrl + "/database",
    body =
      parameters &&
      JSON.stringify({
        parameters
      }),
    fetchData = {
      url,
      method,
      body
    };
  axios(fetchData);
};
