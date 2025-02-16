type Props = {
  time: string;
  icon: string;
  main: string;
  temp: number;
  speed: number;
  deg: string;
  rain?: number;
  humidity: number;
};

export default function HourlyWeather({
  time,
  icon,
  main,
  temp,
  speed,
  deg,
  rain,
  humidity,
}: Props) {
  return (
    <tr className="border-b border-gray-200 last:border-0">
      <td className="p-2">{time.split(":")[0]}시</td>
      <td className="p-2">
        <img className="w-10 mx-auto" src={icon} alt={main} />
        <span className="text-sm">{main}</span>
      </td>
      <td className="p-2">{temp}</td>
      <td className="p-2">{rain}</td>
      <td className="p-2">
        <div className="flex flex-col items-center">
          <span className="text-sm">{deg}</span>
          <span>{speed}</span>
        </div>
      </td>
      <td className="p-2">{humidity}</td>
    </tr>
  );
}
