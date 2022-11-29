import { useEffect, createContext, useState, useContext } from "react";

export const GeoContext = createContext({});

export const GeoLocationProvider = ({ children }) => {
  const [geo, setGeo] = useState({ lat: null, lng: null });
  const [timer, setTimer] = useState();

  useEffect(() => {
    setTimer(
      setTimeout(() => {
        setGeo({ lat: "", lng: "" });
      }, 5000)
    );

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        console.log(lat, lng)
        setGeo({ lat, lng });
        clearTimeout(timer);
      }
    );
  }, []);

  return (
    <GeoContext.Provider value={{ ...geo }}>{children}</GeoContext.Provider>
  );
};

export const useGeoLocation = () => useContext(GeoContext);
