import routes from "./routes";
import axios from "axios";
import { forEach, some } from "lodash";

export const apiRequest = async ({ name, body, parameters, formData }) => {
  if (parameters && some(parameters, parameter => parameter === null)) {
    alert("not all fields filled out");
  } else {
    const method = routes[name][1],
      websiteUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:8080"
          : "/api", //change when domain changes
      url = websiteUrl + routes[name][0],
      data = formData ? formDataBody({ name, formData }) : body,
      config = formData
        ? { headers: { "Content-Type": "multipart/form-data" } }
        : null,
      fetchData = {
        url,
        method,
        data,
        params: parameters,
        config
      };
    return axios(fetchData).then(response => {
      return response;
    });
  }
};

const formDataBody = ({ name, formData }) => {
  let bodyFormData = new FormData();
  forEach(formData, (value, key) => bodyFormData.set(key, value));
  return bodyFormData;
};
