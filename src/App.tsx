import useGeolocation from "./hooks/useGeolocation";
import useWeather from "./hooks/useWeather";

export default function App() {
  const { location, address } = useGeolocation();
  const { weather, todayHourly, weekelyWeather } = useWeather(location);

  if (!weather) return <p>날씨정보를 가져오는 중입니다...</p>;
  if (!location || !address) return <p>위치정보를 가져오는 중입니다...</p>;
  return (
    <div>
      <p>{address[0]}</p>
      <p>{address[1]}</p>
      <img src={weather.icon} alt={weather.main} />
      {todayHourly?.map((item) => (
        <li key={item.time}>{item.time}</li>
      ))}
      {weekelyWeather?.map((item) => (
        <li key={item.date}>{item.date}</li>
      ))}
    </div>
  );
}
