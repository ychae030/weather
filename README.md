## 마인드스위치앤코웨이브 과제

### gps → geolocation → 경도, 위도 위치 가져옴

### 행정동 → kakao map api

### 날씨 → open api

---

### api 요청을 줄이기 위해 할 수 있는 것

1. ~~위치를 추적하다가 바뀌면 ‘이 곳이 맞나요?’ 물음 뒤에 버튼 누르면 api요청 (배민, 쿠팡이츠 st)~~
    1. ~~불필요한 api요청을 최소화할 수 있으나 타 날씨 어플에 비교해 봤을 때 적합하지 않은 방법~~
    2. ~~자동 반영이 안되기 때문에 UX 불편~~
2. 일정한 거리내에서는 api 요청을 하지 않음 (ex. 50m)
    1. 이동이 적을 때 api요청을 줄일 수 있음
    2. 지역의 경계에 있을 때는 행정동이 반영이 안될 수 있음
3. `watchposition` 설정 조절함 gps 받아오는 주기를 줄임(gps 요청을 줄임)
    1. 일정 시간마다 api가 요청됨 -> 챌린지!

### ✅ **왜 `watchPosition`을 `clearWatch`하지 않으면 메모리 누수가 생길까?**

---

### 🔍 **1️⃣ `watchPosition`이 어떻게 동작하는지 이해하자**

`navigator.geolocation.watchPosition()`은 단순한 함수 호출이 아니라 **이벤트 리스너처럼 동작**한다.

- 즉, **위치가 변경될 때마다** 내부적으로 콜백 함수를 실행하는 **구독(subscribe) 방식**
- 이 말은 곧, **컴포넌트가 언마운트되더라도 `watchPosition`이 계속 실행될 수 있음**을 의미

```jsx
useEffect(() => {
  const watchId = navigator.geolocation.watchPosition((position) => {
    console.log("위치 업데이트됨:", position.coords.latitude, position.coords.longitude);
  });

  return () => navigator.geolocation.clearWatch(watchId); // 👈 정리 필요!
}, []);
```

✅ **`clearWatch(watchId)`를 실행해야 기존의 `watchPosition`을 정리할 수 있음.**

---

### 🔴 **2️⃣ `watchPosition`을 `clearWatch`하지 않으면 생기는 문제**

### 🚨 **1. 메모리 누수 (Memory Leak)**

- `watchPosition`이 한 번 실행되면, **브라우저는 계속해서 위치 업데이트를 수행**함.
- 하지만 **컴포넌트가 언마운트되어도 기존의 `watchPosition`이 계속 실행됨.**
- 💣 **즉, 사라진 컴포넌트에서도 계속 위치 업데이트가 실행되어 메모리가 낭비됨.**

### 🚨 **2. 중복 호출 발생**

- `useEffect`가 다시 실행될 때마다 **새로운 `watchPosition`이 추가됨**
- 그러면 **기존의 `watchPosition`이 중단되지 않고, 여러 개의 `watchPosition`이 실행됨.**
- 💣 **즉, 위치가 변경될 때마다 여러 개의 이벤트가 실행되어 불필요한 API 요청이 발생할 수도 있음.**

### getWeeklyWeather

```jsx
export function getWeeklyWeather(
  dataList: WeatherWithDate[]
): WeeklyWeatherType[] {
  
  ...

  // 객체를 { date, am, pm } 형태의 배열로 변환
  return Object.entries(groupedWeather).map(([date, { am, pm }]) => ({
    date,
    am,
    pm,
  }));
}
```

```jsx
//groupedWeather

{
  "2025-02-16": { am: {날씨 데이터}, pm: {날씨 데이터} },
  "2025-02-17": { am: {날씨 데이터} }
}

// Object.entries(groupedWeather)
[
  ["2025-02-16", { am: {날씨 데이터}, pm: {날씨 데이터} }],
  ["2025-02-17", { am: {날씨 데이터} }]
]

// map
["2025-02-16", { am: {날씨 데이터}, pm: {날씨 데이터} }]
→ { date: "2025-02-16", am: {날씨 데이터}, pm: {날씨 데이터} }

["2025-02-17", { am: {날씨 데이터} }]
→ { date: "2025-02-17", am: {날씨 데이터}, pm: undefined }
```
