export type WeatherAPI = {
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  pop: number;
};

export type Weather = {
  main: string;
  description: string;
  icon: string;
  feels_like: number;
  humidity: number;
  temp: number;
  temp_max: number;
  temp_min: number;
  deg: string;
  speed: number;
  rain?: number;
};

export type WeatherWithDate = Weather & {
  date: string;
  time: string;
};

export type WeeklyWeatherType = {
  date: string;
  am?: Weather;
  pm?: Weather;
  temp_min?: number;
  temp_max?: number;
};

export type WeatherMainType = Pick<
  Weather,
  "temp" | "description" | "icon" | "main"
> & {
  region: string;
  locality: string;
};

export type WeatherDetailType = Pick<
  Weather,
  "feels_like" | "deg" | "speed" | "humidity"
>;
