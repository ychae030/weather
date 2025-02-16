import { WeatherWithDate } from "../model/weather";

import HourlyWeather from "./HourlyWeather";

type Props = {
  hours: WeatherWithDate[];
};
export default function WeatherByHour({ hours }: Props) {
  console.log(hours);
  return (
    <section className="mt-7">
      <h3 className="mb-4 text-gray-400"> Today's Forecast</h3>
      <div className="card rounded-xl p-4">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="border-b border-gray-300 text-sm">
              <th className="p-2">시간</th>
              <th className="p-2">날씨</th>
              <th className="p-2">
                기온 <span className="ml-0.5 text-gray-400">(°C)</span>
              </th>
              <th className="p-2">
                강수량
                <span className="ml-0.5 text-gray-400">(%)</span>
              </th>
              <th className="p-2">
                바람 <span className="ml-0.5 text-gray-400">(m/s)</span>
              </th>
              <th className="p-2">
                습도 <span className="ml-0.5 text-gray-400">(%)</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {hours.map(
              ({ time, icon, main, temp, speed, deg, rain, humidity }) => (
                <HourlyWeather
                  key={time}
                  time={time}
                  icon={icon}
                  main={main}
                  temp={temp}
                  speed={speed}
                  deg={deg}
                  rain={rain}
                  humidity={humidity}
                />
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
