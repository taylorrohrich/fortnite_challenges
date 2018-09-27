import routes from "./routes";
import axios from "axios";
import { forEach, some } from "lodash";
import netlifyIdentity from "netlify-identity-widget";
export const apiRequest = async ({ name, body, parameters, formData }) => {
  if (parameters && some(parameters, parameter => parameter === null)) {
    alert("not all fields filled out");
  } else {
    const token = getUserToken();
    const method = routes[name][1],
      websiteUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:8080"
          : "/api",
      url = websiteUrl + routes[name][0],
      data = formData ? formDataBody({ name, formData }) : body,
      fetchData = {
        url,
        method,
        data,
        params: parameters,
        headers: getHeaders({ formData, token })
      };
    return axios(fetchData).then(response => {
      return response;
    });
  }
};

const getHeaders = ({ formData, token }) => {
  let headers = {};
  if (formData) {
    headers["Content-Type"] = "multipart/form-data";
  }
  if (token) {
    headers["Authorization"] = `bearer ${token}`;
  }
  return headers;
};
const getUserToken = () => {
  const user = netlifyIdentity.currentUser();
  if (user && user.token && user.token.access_token) {
    return user.token.access_token;
  }
};
const formDataBody = ({ name, formData }) => {
  let bodyFormData = new FormData();
  forEach(formData, (value, key) => bodyFormData.set(key, value));
  return bodyFormData;
};
