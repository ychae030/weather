import { Location } from "../model/location";
import { Address } from "../model/location";

export const getAdress = async ({
  lat,
  lon,
}: Location): Promise<Address | null> => {
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
    const parts = data.documents[0].address_name.split(" ");
    return [parts[0], parts.slice(1).join(" ")];
  } catch (error) {
    console.error("행정구역을 가져오지 못했습니다.", error);
    return null;
  }
};
