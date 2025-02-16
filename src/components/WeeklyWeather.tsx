import { WeeklyWeatherType } from "../model/weather";

import WeeklyWeatherCard from "./WeeklyWeatherCard";

type Props = {
  weathers: WeeklyWeatherType[];
};
export default function WeeklyWeather({ weathers }: Props) {
  return (
    <section className="basis-1/3">
      <div className="flex justify-between px-6 mb-4 text-gray-400">
        <h3>주간온도</h3>
        <p>최저 최고</p>
      </div>
      <ul className="card px-6 py-2 rounded-xl">
        {weathers.map(({ date, am, pm, temp_max, temp_min }) => (
          <WeeklyWeatherCard
            key={date}
            date={date}
            am={am}
            pm={pm}
            temp_max={temp_max}
            temp_min={temp_min}
          />
        ))}
      </ul>
      <p className="mt-4">
        사용 API: <a href="https://openweathermap.org/api">Open Weather</a>
      </p>
    </section>
  );
}
