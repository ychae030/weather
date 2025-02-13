import { Location } from "../hooks/useGeolocation";

export const getAdress = async ({ lat, lon }: Location) => {
  const url = `${import.meta.env.VITE_KAKAO_URL}?x=${lon}&y=${lat}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    if (data.documents.length < 1) return "알수 없음";
    return data.documents[0].address_name;
  } catch (error) {
    console.error("행정구역을 가져오지 못했습니다.", error);
    return "오류 발생";
  }
};
