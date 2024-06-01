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

import { formatMoney } from "@/utils/helpers";
import { ListingCard } from "..";
import useListingStore from "@/hooks/useListingStore";
import useMapStore from "@/hooks/useMapStore";

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

  const {
    searchMap: { latitude, longitude },
  } = useMapStore();

  const {
    updateSearchListings,
    searchListings: { isLoading },
  } = useListingStore();

  const mapRef = useRef(null);
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [longitude, latitude],
        zoom: 9,
        essential: true,
      });
    }
  }, [latitude, longitude]);

  // useEffect(() => {
  //   if (mapRef.current && listings?.length > 0) {
  //     mapRef.current.flyTo({
  //       center: [listings[0]?.longitude, listings[0]?.latitude],
  //       zoom: 9,
  //       essential: true,
  //     });
  //   }
  // }, [listings]);

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

  const handleMove = async (evt) => {
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

    let latCoords = [
      bounds.getNorthWest().lat,
      bounds.getNorthEast().lat,
      bounds.getSouthWest().lat,
      bounds.getSouthEast().lat,
    ].join(",");
    let lngCoords = [
      bounds.getNorthWest().lng,
      bounds.getNorthEast().lng,
      bounds.getSouthWest().lng,
      bounds.getSouthEast().lng,
    ].join(",");
    try {
      updateSearchListings("latCoords", latCoords);
      updateSearchListings("lngCoords", lngCoords);
      // const { data, success } = await getFilterListing();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(listings);

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={MAPBOX_TOKEN}
      initialViewState={{
        longitude: (listings && listings[0]?.longitude) ?? longitude,
        latitude: (listings && listings[0]?.latitude) ?? latitude,
        zoom: 10,
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
            <div className="text-red-500 font-black text-3xl">Y</div>
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
                  <div className="text-red-500 font-black text-3xl">X</div>
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
      {isLoading && (
        <div className="absolute top-10 right-0 w-full  flex justify-center">
          <div className="w-20 h-8 overflow-hidden bg-white  rounded-xl shadow-md">
            <img
              src="https://i.pinimg.com/originals/86/e8/f6/86e8f6313548f01396b4b43c2ce2f87f.gif"
              alt="loading..."
              className="w-full h-full  object-cover scale-150"
            />
          </div>
        </div>
      )}
    </Map>
  );
};

export default Index;
