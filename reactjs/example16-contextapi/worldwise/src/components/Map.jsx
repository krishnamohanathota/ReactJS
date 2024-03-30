import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useState, useEffect } from "react";
import { useCities } from "../contexts/CityContext";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";

import Button from "./Button";

export default function Map() {
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);

  //Context API
  const { cities } = useCities();

  //Custom Hook
  const {
    isLoading: isPositionLoading,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  //Custom Hook
  const { lat: cityLat, lng: cityLng } = useUrlPosition();

  useEffect(() => {
    if (cityLat && cityLng) setMapPosition([cityLat, cityLng]);
  }, [cityLat, cityLng]);

  //When "geoLocationPosition" is updated (i.e. Current Location), update "mapPosition" also
  useEffect(() => {
    if (geoLocationPosition)
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isPositionLoading ? "Loading....." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

/*
To move map position
*/
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => {
      //console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
