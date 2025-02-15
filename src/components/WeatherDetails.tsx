import { WeatherDetailType } from "../model/weather";
import { FaTemperatureLow } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";

export default function WeatherDetails({
  feels_like,
  deg,
  speed,
  humidity,
}: WeatherDetailType) {
  const MAP_DETAIL = [
    {
      title: "체감온도",
      icon: <FaTemperatureLow />,
      data: feels_like + "°C",
    },
    {
      title: "습도",
      icon: <FaDroplet />,
      data: humidity + "%",
    },
    {
      title: deg,
      icon: <FaWind />,
      data: speed + "m/s",
    },
  ];
  return (
    <section>
      {MAP_DETAIL.map(({ title, icon, data }) => (
        <>
          <h4 className="flex">
            {icon}
            {title}
          </h4>
          <p>{data}</p>
        </>
      ))}
    </section>
  );
}
