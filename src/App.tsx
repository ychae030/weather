import useGeolocation from "./hooks/useGeolocation";

export default function App() {
  const { location, address } = useGeolocation();

  if (!location) return <p>위치정보를 가져오는 중입니다...</p>;
  return (
    <div>
      <p>{address}</p>
    </div>
  );
}
