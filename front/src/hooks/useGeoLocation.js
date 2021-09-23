import { useEffect, createContext, useState, useContext } from "react";

export const GeoContext = createContext({});

export const GeoLocationProvider = ({ children }) => {
  const [geo, setGeo] = useState({ lat: null, lng: null });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        setGeo({ lat, lng });
      }
    );
  }, []);

  return (
    <GeoContext.Provider value={{ ...geo }}>{children}</GeoContext.Provider>
  );
};

export const useGeoLocation = () => useContext(GeoContext);
