import { WeeklyWeatherType } from "../model/weather";

import WeeklyWeatherCard from "./WeeklyWeatherCard";

type Props = {
  weathers: WeeklyWeatherType[];
};
export default function WeeklyWeather({ weathers }: Props) {
  return (
    <section className="px-2">
      <div className="flex justify-between">
        <h3>주간온도</h3>
        <p>최저 최고</p>
      </div>

      <ul>
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
    </section>
  );
}
