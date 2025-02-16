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
    <section className="flex gap-5 mt-7">
      {MAP_DETAIL.map(({ title, icon, data }) => (
        <div className="card rounded-xl w-1/3 px-4 py-6">
          <h4 className="flex gap-2 items-center mb-3">
            {icon}
            {title}
          </h4>
          <p className="text-xl">{data}</p>
        </div>
      ))}
    </section>
  );
}
