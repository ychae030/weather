import { WeatherMainType } from "../model/weather";

export default function WeatherMain({
  region,
  locality,
  temp,
  description,
  icon,
  main,
}: WeatherMainType) {
  return (
    <div className="flex">
      <div className="grid justify-center items-center">
        <p>
          <span className=" block text-xl">{region}</span>
          <strong className="block text-3xl">{locality}</strong>
        </p>
        <div>
          <h1 className="text-6xl">{temp}°C</h1>
          <h2 className="text-2xl">{description}</h2>
        </div>
      </div>
      <img src={icon} className="w-sm" alt={main} />
    </div>
  );
}
