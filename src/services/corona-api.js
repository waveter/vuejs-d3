import axios from "axios";

export const getCountryTimeline = country => {
  return axios.get(`https://corona-api.com/countries/${country}`);
};
