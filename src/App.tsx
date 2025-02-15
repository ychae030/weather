import TodayWeather from "./components/TodayWeather";
import WeeklyWeather from "./components/WeeklyWeather";
import useGeolocation from "./hooks/useGeolocation";
import useWeather from "./hooks/useWeather";

export default function App() {
  const { location, address } = useGeolocation();
  const { weather, todayHourly, weekelyWeather } = useWeather(location);

  if (!weather) return <p>날씨정보를 가져오는 중입니다...</p>;
  if (!location || !address) return <p>위치정보를 가져오는 중입니다...</p>;
  return (
    <div className="flex justify-between">
      <TodayWeather weather={weather} address={address} />
      <WeeklyWeather weathers={weekelyWeather} />
    </div>
  );
}
