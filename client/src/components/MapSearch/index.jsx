/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  FullscreenControl,
  GeolocateControl,
  Map,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import { formatMoney } from "../../utils/helpers";
import { ListingCard } from "..";
const MAPBOX_TOKEN = import.meta.env.VITE_APP_MAPBOX_TOKEN;

const Index = ({ listings }) => {
  const [openCardId, setOpenCardId] = useState(null);

  const onOpen = (id) => {
    if (openCardId === id) {
      onClose();
      return;
    }
    setOpenCardId(id);
  };

  const onClose = () => {
    setOpenCardId(null);
  };
  return (
    <Map
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={{
        longitude: listings[0].longitude,
        latitude: listings[0].latitude,
        zoom: 14,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      NavigationControl={true}
    >
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />
      {listings?.map((item) => (
        <Marker
          latitude={item.latitude}
          longitude={item.longitude}
          key={item.id}
        >
          <div className="  relative">
            <div
              className="py-1 border px-4 leading-7 cursor-pointer transition-all font-semibold rounded-full text-base hover:bg-black bg-white  hover:text-white"
              onClick={() => onOpen(item.id)}
            >
              {formatMoney(item.price)}
            </div>
            {openCardId === item.id && (
              <div className="p-2  absolute bottom-0 bg-white mb-12 rounded-2xl hover:text-black w-[280px]">
                <ListingCard listing={item} onClose={onClose} />
              </div>
            )}
          </div>
        </Marker>
      ))}
    </Map>
  );
};

export default Index;
