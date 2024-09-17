import makeRequest from "../httpClient";

export const fetchVehicles = (params) =>
  makeRequest({
    url: "https://api.caiman-app.de/api/cars-test",
    method: "get",
    params,
  });
