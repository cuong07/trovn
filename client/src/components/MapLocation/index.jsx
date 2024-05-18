import { Map } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import GeocoderControl from "./GeocoderControl";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import useListingStore from "../../hooks/useListingStore";
import { getLocationByLatLng } from "../../apis/location";
import { Modal } from "antd";

const MAPBOX_TOKEN = import.meta.env.VITE_APP_MAPBOX_TOKEN;

const Index = () => {
  const { updateListing, newListing } = useListingStore();
  const [events, setEvent] = useState({});
  const [value] = useDebounce(events, 500);
  const [result, setResult] = useState(null);

  const updateLatLng = useCallback(
    (lat, lng) => {
      updateListing("latitude", lat);
      updateListing("longitude", lng);
    },
    [updateListing]
  );

  useEffect(() => {
    if (value?.onDragEnd) {
      updateLatLng(value.onDragEnd.lat, value.onDragEnd.lng);
    }
  }, [value, updateLatLng]);

  useEffect(() => {
    if (newListing?.latitude && newListing?.longitude) {
      (async () => {
        const data = await getLocationByLatLng(
          newListing.latitude,
          newListing.longitude
        );
        if (data) {
          updateListing("address", data.display_name);
        }
        console.log(data);
      })();
    }
  }, [newListing.latitude, newListing.longitude, updateListing]);

  useEffect(() => {
    if (result?.result) {
      const [lng, lat] = result.result.geometry.coordinates;
      updateLatLng(lat, lng);
    }
  }, [result, updateLatLng]);

  // useEffect(() => {
  //   console.log(newListing);
  // }, [newListing]);
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
          onSetEvent={setEvent}
          placeholder="Tìm kiếm"
          countries="vn"
          onResult={setResult}
          mapboxAccessToken={MAPBOX_TOKEN}
          position="top-left"
        />
      </Map>
    </div>
  );
};

export default Index;
