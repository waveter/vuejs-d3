import axios from "axios";

export const getCountryTimeline = country => {
  axios.get(`https://corona-api.com/countries/${country}`);
};
