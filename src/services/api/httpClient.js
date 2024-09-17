import axios from "axios";

const filterParams = (params) => {
  for (let key in params) {
    if (params[key] === "")
      delete params[key];
  }
  return params;
};

const makeRequest = ({
  url = "/",
  method = "get",
  responseType = "json",
  headers,
  params,
  data,
  paramsSerializer = filterParams(params),
}) =>
  axios({
    url,
    method,
    responseType,
    headers,
    params,
    data,
    paramsSerializer,
  });

export default makeRequest;
