/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import GeocoderControl from "@/components/MapLocation/GeocoderControl";
import { Map, Marker } from "react-map-gl";
import { Button } from "@/components";
import { Spin, Tooltip, message } from "antd";
import { isEmpty } from "lodash";
import { createLocation, getLocations } from "@/apis/location";
import { GiPositionMarker } from "react-icons/gi";
const MAPBOX_TOKEN = import.meta.env.VITE_APP_MAPBOX_TOKEN;

const Index = () => {
    const [result, setResult] = useState(null);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    let locationData = {
        name: "",
        country: "",
        city: "",
        latitude: null,
        longitude: null,
    };

    useEffect(() => {
        if (result) {
            locationData.latitude = parseFloat(result.result.center[1]);
            locationData.longitude = parseFloat(result.result.center[0]);
            locationData.name = result.result.text;
            locationData.city = result.result.context[0]?.text_vi;
            locationData.country = result.result.context[1]?.text_vi;
        }
    }, [result]);

    useEffect(() => {
        (async () => {
            try {
                const { data, success } = await getLocations(0, 10000);
                if (success) {
                    setLocations(data?.contents);
                }
            } catch (error) {
                message.error(error.response.data.message);
            }
        })();
    }, []);

    const handleCreateLocation = async () => {
        if (
            isEmpty(locationData.name) &&
            isEmpty(locationData.city) &&
            isEmpty(locationData.country)
        ) {
            return message.error("Vui lòng chọn vị trí");
        }
        try {
            setLoading(true);
            const { success } = await createLocation(locationData);
            setLoading(false);
            if (success) {
                message.success("Thêm thành công");
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <div className="grid gap-4">
            <Spin spinning={loading} fullscreen />
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Thêm địa chỉ</h2>
                <Button type="primary" onClick={handleCreateLocation}>
                    Thêm
                </Button>
            </div>
            <div>
                <Map
                    initialViewState={{
                        longitude: 106.14350164817394,
                        latitude: 10.345904158216838,
                        zoom: 7,
                    }}
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                    mapboxAccessToken={MAPBOX_TOKEN}
                    style={{
                        width: "100%",
                        height: "700px",
                    }}
                >
                    <GeocoderControl
                        placeholder="Tìm kiếm"
                        countries="vn"
                        onResult={setResult}
                        mapboxAccessToken={MAPBOX_TOKEN}
                        position="top-left"
                    />
                    {locations?.map((item) => (
                        <Marker
                            key={item?.id}
                            latitude={item?.latitude}
                            longitude={item?.longitude}
                        >
                            <Tooltip
                                title={`${item.name} ${item.city} ${item.country}`}
                            >
                                <GiPositionMarker
                                    size={38}
                                    color="#FF385C"
                                    className="shadow-2xl"
                                />
                            </Tooltip>
                        </Marker>
                    ))}
                </Map>
            </div>
        </div>
    );
};

export default Index;
