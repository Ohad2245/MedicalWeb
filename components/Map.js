import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "200px",
};

function Map() {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.log(error);
      }
    );
    setLocations([
      { lat: 31.7683, lng: 35.2137 }, // ירושלים
      { lat: 32.0853, lng: 34.7818 }, // תל אביב
      { lat: 32.794, lng: 34.9896 }, // חיפה
      // הוספת מיקומים של בתי מרקחת בישראל:
      { lat: 32.0757038, lng: 34.9055235 }, // בת ים
      { lat: 32.030291, lng: 34.779791 }, // הרצליה
      { lat: 31.252973, lng: 34.791462 }, // אשדוד
      { lat: 31.939718, lng: 34.874565 }, // ראשון לציון
      { lat: 32.9733, lng: 35.0775 }, // אור עקיבא
      { lat: 32.9695, lng: 35.0835 }, // אור עקיבא
      { lat: 32.9725, lng: 35.0785 }, // אור עקיבא
    ]);
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCkxxy1RdAq21NHwKn8gWN8TApRF6aRXl0",
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentPosition}
      zoom={10}
    >
      {/* מפעילים תגי Marker עבור כל מיקום במערך */}
      {locations.map((location) => (
        <Marker key={`${location.lat}-${location.lng}`} position={location} />
      ))}

      {/* מפעילים תגי Marker עבור המיקום הנוכחי */}
      {currentPosition && <Marker position={currentPosition} />}
    </GoogleMap>
  ) : (
    ""
  );
}
export default React.memo(Map);
