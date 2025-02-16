import { Address } from "../model/location";
import { Weather, WeatherWithDate } from "../model/weather";
import WeatherByHour from "./WeatherByHour";
import WeatherDetails from "./WeatherDetails";
import WeatherMain from "./WeatherMain";
type Props = {
  weather: Weather;
  address: Address;
  hours: WeatherWithDate[];
};

export default function TodayWeather({ weather, address, hours }: Props) {
  const { temp, description, icon, main, feels_like, deg, speed, humidity } =
    weather;
  return (
    <div className="basis-2/3">
      <WeatherMain
        region={address[0]}
        locality={address[1]}
        temp={temp}
        description={description}
        icon={icon}
        main={main}
      />
      <WeatherDetails
        feels_like={feels_like}
        deg={deg}
        speed={speed}
        humidity={humidity}
      />
      <WeatherByHour hours={hours} />
    </div>
  );
}
