import { Location } from "../hooks/useGeolocation";

const API_KEY = import.meta.env.VITE_WEATHER_API;
const BASE_URL = import.meta.env.VITE_WEATHER_URL;

export const getWeather = async ({ lat, lon }: Location) => {
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("날씨정보를 가져오지 못했습니다.", error);
    return "오류 발생";
  }
};
