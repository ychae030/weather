import { WeatherWithDate, WeeklyWeatherType } from "./../model/weather";
import { useEffect, useState } from "react";
import { Location } from "../model/location";
import { getWeatherList, getWeather } from "../api/getWeather";
import { Weather } from "../model/weather";
import { getWeeklyWeather } from "../util/getWeeklyWeather";

export default function useWeather(location: Location) {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [todayHourly, setTodayHourly] = useState<WeatherWithDate[]>([]);
  const [weekelyWeather, setWeeklyWeather] = useState<WeeklyWeatherType[]>([]);

  useEffect(() => {
    if (!location.lat || !location.lon) {
      return;
    }

    // 오늘 날씨
    const fetchWeather = async () => {
      const data = await getWeather(location);
      setWeather(data);
    };

    const fetchWeatherList = async () => {
      const today = new Date().toISOString().split("T")[0];
      const dataList = await getWeatherList(location);
      // 시간대별 날씨
      setTodayHourly(
        dataList.filter((data: WeatherWithDate) => data.date === today)
      );

      // 주간 날씨
      setWeeklyWeather(getWeeklyWeather(dataList));
    };

    fetchWeather();
    fetchWeatherList();
  }, [location]);

  return { weather, todayHourly, weekelyWeather };
}
