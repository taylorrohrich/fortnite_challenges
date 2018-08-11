import routes from "./routes";
import axios from "axios";

export const apiRequest = (name, parameters) => {
  const method = routes[name][1],
    websiteUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:8080"
        : "https://gallant-franklin-bab9b7.netlify.com/api",
    url = websiteUrl + "/database",
    body = JSON.stringify({
      ...parameters
      // api_secret: process.env.REACT_APP_API_SECRET
    }),
    fetchData = {
      url,
      method: "get",
      body
    };
  console.log(url, fetchData);
  axios(fetchData);
  // fetch(url, fetchData)
  //   .then(function(data) {
  //     console.log(data);
  //   })
  //   .catch(function(error) {
  //     console.log(error);
  //   });
};
