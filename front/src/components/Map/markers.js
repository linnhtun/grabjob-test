import L from "leaflet";
import iconShadow from "./markers/marker-shadow.png";

import userIcon from "./markers/user-marker.png";
import userIconRetina from "./markers/user-marker-2x.png";

import defaultIcon from "./markers/marker.png";
import defaultIconRetina from "./markers/marker-2x.png";

import nearbyIcon from "./markers/nearby-marker.png";
import nearbyIconRetina from "./markers/nearby-marker-2x.png";

export const DefaultMarker = L.icon({
  iconUrl: defaultIcon,
  iconRetinaUrl: defaultIconRetina,
  shadowUrl: iconShadow,
});

export const UserMarker = L.icon({
  iconUrl: userIcon,
  iconRetinaUrl: userIconRetina,
  shadowUrl: iconShadow,
});

export const NearbyMarker = L.icon({
  iconUrl: nearbyIcon,
  iconRetinaUrl: nearbyIconRetina,
  shadowUrl: iconShadow,
});
