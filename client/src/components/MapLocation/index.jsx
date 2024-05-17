import { Map } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import GeocoderControl from "./GeocoderControl";
import { useEffect, useRef, useState } from "react";

const MAPBOX_TOKEN = import.meta.env.VITE_APP_MAPBOX_TOKEN;

const Index = () => {
  const [events, setEvent] = useState({});

  return (
    <div>
      <Map
        initialViewState={{
          longitude: 106.14350164817394,
          latitude: 10.345904158216838,
          zoom: 13,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{
          width: "100%",
          height: "700px",
        }}
      >
        <GeocoderControl
          // language="vi"
          // render="Hello"
          // onResults={setInputValue}
          onSetEvent={setEvent}
          placeholder="Tìm kiếm"
          countries="vn"
          mapboxAccessToken={MAPBOX_TOKEN}
          position="top-left"
        />
      </Map>
    </div>
  );
};

export default Index;
