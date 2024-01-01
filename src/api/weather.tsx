import axios from "axios";
import { api_key } from "../constants";

const weatherAPI = {
  getCurrentWeather: async () => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=Cebu&appid=${api_key}&units=metric`
    );

    return response.data;
  },
  getHourlyWeather: async () => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=Cebu&appid=${api_key}&units=metric`
    );
    return response.data;
  },
};

export { weatherAPI };
