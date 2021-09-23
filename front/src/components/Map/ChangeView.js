import { useMap } from "react-leaflet";

const ChangeView = ({ lat, lng, zoom }) => {
  const map = useMap();
  if (lat && lng) {
    map.setView([lat, lng], zoom);
  }
  return null;
};

export default ChangeView;
