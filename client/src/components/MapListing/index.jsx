/* eslint-disable react/prop-types */

import {
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

const Index = ({ latitude, longitude }) => {
    return (
        <Map
            mapboxAccessToken={MAPBOX_TOKEN}
            initialViewState={{
                longitude: longitude,
                latitude: latitude,
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
            <Marker latitude={latitude} longitude={longitude}>
                <div className="bg-[#50C87860]  p-10  rounded-full border bg-opacity-70">
                    <div className="p-4 bg-[#50C878] rounded-full border ">
                        <IoHome size={32} color="#fff" />
                    </div>
                </div>
            </Marker>
        </Map>
    );
};

export default Index;
