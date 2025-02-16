import { WeeklyWeatherType } from "../model/weather";

export default function WeeklyWeatherCard({
  date,
  am,
  pm,
  temp_max,
  temp_min,
}: WeeklyWeatherType) {
  if (!am || !pm) return;
  return (
    <li className="flex gap-3 text-center items-center justify-between border-b border-b-gray-200 last:border-0">
      <h3 className="basis-1/6">{date.split("").slice(-5)}</h3>
      <div className="flex basis-5/6 items-center text-xs justify-center">
        <p>오전</p>
        <img className="w-18" src={am.icon} alt={am.main} />
        <p>오후</p>
        <img className="w-18" src={pm.icon} alt={pm.main} />
      </div>
      <div className="flex basis-1/6 w-1/6 gap-2 items-center justify-center">
        <span aria-label="최저 온도">{temp_min}</span>
        <span aria-label="최고 온도">{temp_max}</span>
      </div>
    </li>
  );
}
