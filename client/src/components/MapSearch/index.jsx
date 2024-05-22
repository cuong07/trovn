/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import {
  FullscreenControl,
  GeolocateControl,
  Map,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import { debounce } from "lodash";
import axios from "axios";

import { formatMoney } from "../../utils/helpers";
import { ListingCard } from "..";
const MAPBOX_TOKEN = import.meta.env.VITE_APP_MAPBOX_TOKEN;

const Index = ({ listings }) => {
  const [openCardId, setOpenCardId] = useState(null);
  const [mapBounds, setMapBounds] = useState(null);
  const [mapInfo, setMapInfo] = useState({
    center: { lat: 10.79744042085094, lng: 106.66571997369292 },
    corners: {
      topLeft: { lat: 0, lng: 0 },
      topRight: { lat: 0, lng: 0 },
      bottomLeft: { lat: 0, lng: 0 },
      bottomRight: { lat: 0, lng: 0 },
    },
  });
  const mapRef = useRef(null);

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

  const updateBounds = async () => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      const bounds = map.getBounds();
      const center = map.getCenter();
      setMapBounds({ bounds, center });
    }
  };

  // useEffect(() => {
  //   if (mapRef.current) {
  //     updateBounds();
  //   }
  // }, [mapRef.current]);

  const handleMove = (evt) => {
    const { viewState } = evt;
    const map = evt.target;
    const bounds = map.getBounds();
    const newMapInfo = {
      center: { lat: viewState.latitude, lng: viewState.longitude },
      corners: {
        topLeft: {
          lat: bounds.getNorthWest().lat,
          lng: bounds.getNorthWest().lng,
        },
        topRight: {
          lat: bounds.getNorthEast().lat,
          lng: bounds.getNorthEast().lng,
        },
        bottomLeft: {
          lat: bounds.getSouthWest().lat,
          lng: bounds.getSouthWest().lng,
        },
        bottomRight: {
          lat: bounds.getSouthEast().lat,
          lng: bounds.getSouthEast().lng,
        },
      },
    };
    setMapInfo(newMapInfo);
  };

  console.log(mapInfo);

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={{
        longitude: listings[0]?.longitude,
        latitude: listings[0]?.latitude,
        zoom: 14,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      onLoad={updateBounds}
      onMoveEnd={handleMove}
    >
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />
      {mapBounds && (
        <>
          <Marker
            latitude={mapInfo?.center.lat + 0.00027}
            longitude={mapInfo?.center.lng + 0.00027}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "blue",
                opacity: 0.6,
              }}
            />
          </Marker>
          {mapInfo?.corners && (
            <>
              {[
                {
                  lat: mapInfo.corners.topLeft.lat - 0.00027,
                  lng: mapInfo.corners.topLeft.lng - 0.00027,
                },
                {
                  lat: mapInfo.corners.topRight.lat + 0.00027,
                  lng: mapInfo.corners.topRight.lng - 0.00027,
                },
                {
                  lat: mapInfo.corners.bottomLeft.lat + 0.00027,
                  lng: mapInfo.corners.bottomLeft.lng + 0.00027,
                },
                {
                  lat: mapInfo.corners.bottomRight.lat - 0.00027,
                  lng: mapInfo.corners.bottomRight.lng + 0.00027,
                },
              ].map((corner, index) => (
                <Marker
                  key={index}
                  latitude={corner.lat}
                  longitude={corner.lng}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "red",
                      opacity: 0.6,
                    }}
                  />
                </Marker>
              ))}
            </>
          )}
        </>
      )}
      {listings?.map((item) => (
        <Marker
          latitude={item.latitude}
          longitude={item.longitude}
          key={item.id}
        >
          <div className="relative">
            <div
              className="py-1 border px-4 leading-7 cursor-pointer transition-all font-semibold rounded-full text-base hover:bg-black bg-white hover:text-white"
              onClick={() => onOpen(item.id)}
            >
              {formatMoney(item.price)}
            </div>
            {openCardId === item.id && (
              <div className="p-2 absolute bottom-0 bg-white mb-12 rounded-2xl hover:text-black w-[280px]">
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
