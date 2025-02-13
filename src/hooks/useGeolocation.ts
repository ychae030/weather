import { useEffect, useState } from "react";
import { getAdress } from "../api/getAdress";

export type Location = {
  lat: number | null;
  lon: number | null;
};

export default function useGeolocation() {
  const [location, setLocation] = useState<Location>({ lat: null, lon: null });
  const [address, setAddress] = useState("로딩중...");

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation을 지원하지 않는 브라우저입니다.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude: lat, longitude: lon } = position.coords;
        setLocation({ lat, lon });

        const data = await getAdress({ lat, lon });
        setAddress(data);
      },
      (error) => {
        console.error("위치 정보를 가져오지 못했습니다.", error);
      },
      {
        enableHighAccuracy: false, // GPS 정확도 낮춰서 배터리 절약
        maximumAge: 60000, // 1분 동안 캐싱된 위치 사용
        timeout: 10000, // 10초 동안 위치 못 가져오면 요청 중단
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);
  return { location, address };
}
