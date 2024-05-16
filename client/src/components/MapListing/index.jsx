import * as React from "react";

import ReactMapGL, {
  FullscreenControl,
  GeolocateControl,
  Map,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { IoHome } from "react-icons/io5";
const MAPBOX_TOKEN = import.meta.env.VITE_APP_MAPBOX_TOKEN;

const Index = () => {
  return (
    <Map
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={{
        longitude: 106.70025817254272,
        latitude: 10.783906898914676,
        zoom: 14,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      NavigationControl={true}
    >
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />
      <Marker latitude={10.783906898914676} longitude={106.70025817254272}>
        <div className="bg-[#FF385C60]  p-10  rounded-full border bg-opacity-70">
          <div className="p-4 bg-[#FF385C] rounded-full border ">
            <IoHome size={32} color="#fff" />
          </div>
        </div>
      </Marker>
    </Map>
  );
};

export default Index;
