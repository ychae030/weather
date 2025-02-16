import { WeatherMainType } from "../model/weather";
import { FaLocationDot } from "react-icons/fa6";

export default function WeatherMain({
  region,
  locality,
  temp,
  description,
  icon,
  main,
}: WeatherMainType) {
  return (
    <section className="flex">
      <div className="grid justify-center items-center">
        <p>
          <FaLocationDot className="mb-3" />
          <span className=" block text-xl"> {region}</span>
          <strong className="block text-3xl"> {locality}</strong>
        </p>
        <div>
          <h1 className="text-6xl">{temp}°C</h1>
          <h2 className="text-2xl">{main}</h2>
          <p className="text-xl">{description}</p>
        </div>
      </div>
      <img src={icon} className="w-sm" alt={main} />
    </section>
  );
}
