import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { DefaultMarker, UserMarker, NearbyMarker } from "./markers";
import ChangeView from "./ChangeView";

const Map = ({ lat, lng, jobs, nearbyJobs, zoom = 14 }) => (
  <MapContainer zoom={zoom} scrollWheelZoom={false} style={{ height: "80vh" }}>
    <ChangeView lat={lat} lng={lng} zoom={zoom} />
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {lat && lng && (
      <Marker position={[lat, lng]} icon={UserMarker}>
        <Popup>User Location</Popup>
      </Marker>
    )}
    {jobs?.map(({ lat: lt, lng: lg, title }, key) => (
      <Marker key={key} position={[lt, lg]} icon={DefaultMarker}>
        <Popup>{title}</Popup>
      </Marker>
    ))}
    {nearbyJobs?.map(({ lat: lt, lng: lg, title }, key) => (
      <Marker key={key} position={[lt, lg]} icon={NearbyMarker}>
        <Popup>{title}</Popup>
      </Marker>
    ))}
  </MapContainer>
);

export default Map;
