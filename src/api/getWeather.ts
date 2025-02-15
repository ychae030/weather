import { Weather, WeatherAPI } from "../model/weather";
import { Location } from "../model/location";

const API_KEY = import.meta.env.VITE_WEATHER_API;
const BASE_URL = import.meta.env.VITE_WEATHER_URL;

export const getWeather = async ({
  lat,
  lon,
}: Location): Promise<Weather | null> => {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    const { main, description, icon } = data.weather[0];
    const { feels_like, humidity, temp, temp_max, temp_min } = data.main;
    const { deg, speed } = data.wind;
    return {
      main,
      description,
      icon: getWeatherIcon(icon),
      feels_like,
      humidity,
      temp,
      temp_max,
      temp_min,
      deg: getWindDirection(deg),
      speed,
    };
  } catch (error) {
    console.error("날씨정보를 가져오지 못했습니다.", error);
    return null;
  }
};

export const getWeatherList = async ({ lat, lon }: Location) => {
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data.list.map((item: WeatherAPI) => {
      const { main, description, icon } = item.weather[0];
      const { feels_like, humidity, temp, temp_max, temp_min } = item.main;
      const { deg, speed } = item.wind;
      return {
        date: item.dt_txt.split(" ")[0],
        time: item.dt_txt.split(" ")[1],
        main,
        description,
        icon: getWeatherIcon(icon),
        feels_like,
        humidity,
        temp,
        temp_max,
        temp_min,
        deg: getWindDirection(deg),
        speed,
      };
    });
  } catch (error) {
    console.error("날씨정보를 가져오지 못했습니다.", error);
    return null;
  }
};

function getWindDirection(deg: number): string {
  const directios = [
    "북풍",
    "북북동풍",
    "북동풍",
    "동북동풍",
    "동풍",
    "동남동풍",
    "남동풍",
    "남남동풍",
    "남풍",
    "남남서풍",
    "남서풍",
    "서남서풍",
    "서풍",
    "서북서풍",
    "북서풍",
    "북북서풍",
  ];
  const index = Math.round(deg / 22.5) % 16;
  return directios[index];
}
function getWeatherIcon(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}
