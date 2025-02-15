import { Weather, WeatherWithDate, WeeklyWeatherType } from "../model/weather";

export function getWeeklyWeather(
  dataList: WeatherWithDate[]
): WeeklyWeatherType[] {
  const today = new Date().toISOString().split("T")[0];

  const groupedWeather: Record<
    string,
    { am?: Weather; pm?: Weather; temp_max: number; temp_min: number }
  > = {};

  for (const data of dataList) {
    if (data.date === today) continue; // 오늘 날짜 제외

    const hour = parseInt(data.time.split(":")[0]);
    const isAM = hour >= 6 && hour < 12; // 오전
    const isPM = hour >= 12 && hour < 18; // 오후

    if (!groupedWeather[data.date]) {
      groupedWeather[data.date] = {
        temp_max: data.temp_max, // 처음 생성할 때 최고기온 설정
        temp_min: data.temp_min, // 처음 생성할 때 최저기온 설정
      };
    } else {
      // 기존 값이 있다면 최고/최저 기온을 비교하여 업데이트
      groupedWeather[data.date].temp_max = Math.max(
        groupedWeather[data.date].temp_max!,
        data.temp_max
      );
      groupedWeather[data.date].temp_min = Math.min(
        groupedWeather[data.date].temp_min!,
        data.temp_min
      );
    }
    if (isAM && !groupedWeather[data.date].am) {
      groupedWeather[data.date].am = data; // 첫번째 am값을 저장
    }

    if (isPM && !groupedWeather[data.date].pm) {
      groupedWeather[data.date].pm = data; // 첫번째 pm값을 저장
    }
  }

  // { date, am, pm, temp_max, temp_min } 형태의 배열로 변환
  return Object.entries(groupedWeather).map(
    ([date, { am, pm, temp_max, temp_min }]) => ({
      date: date.replace(/-/g, "."),
      am,
      pm,
      temp_max: temp_max.toFixed(1),
      temp_min: temp_min.toFixed(1),
    })
  );
}
