import { useEffect, useState } from "react";
import { Location } from "./useGeolocation";
import { getWeather } from "../api/getWeather";

export default function useWeather(location: Location) {
  const [weather, setWeather] = useState("로딩중...");

  useEffect(() => {
    if (!location.lat || !location.lon) {
      return;
    }

    const fetchWeather = async () => {
      const data = await getWeather(location);
      setWeather(data?.name);
      console.log(data);
    };

    fetchWeather();
  }, [location]);

  return { weather };
}
