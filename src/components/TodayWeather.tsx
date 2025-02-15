import { Address } from "../model/location";
import { Weather } from "../model/weather";
import WeatherDetails from "./WeatherDetails";
import WeatherMain from "./WeatherMain";
type Props = {
  weather: Weather;
  address: Address;
};

export default function TodayWeather({ weather, address }: Props) {
  const { temp, description, icon, main, feels_like, deg, speed, humidity } =
    weather;
  return (
    <>
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
    </>
  );
}
