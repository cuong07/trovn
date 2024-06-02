/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import GeocoderControl from "@/components/MapLocation/GeocoderControl";
import { Map } from "react-map-gl";
import { Button } from "@/components";
import { Spin, message } from "antd";
import { isEmpty } from "lodash";
import { createLocation } from "@/apis/location";
const MAPBOX_TOKEN = import.meta.env.VITE_APP_MAPBOX_TOKEN;

const Index = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  let locationData = {
    name: "",
    country: "",
    city: "",
    latitude: null,
    longitude: null,
  };

  useEffect(() => {
    console.log(result);
    if (result) {
      locationData.latitude = parseFloat(result.result.center[1]);
      locationData.longitude = parseFloat(result.result.center[0]);
      locationData.name = result.result.text;
      locationData.city = result.result.context[0].text_vi;
      locationData.country = result.result.context[1].text_vi;
    }
  }, [result]);

  const handleCreateLocation = async () => {
    console.log(
      isEmpty(locationData.name) &&
        isEmpty(locationData.city) &&
        isEmpty(locationData.country)
    );
    if (
      isEmpty(locationData.name) &&
      isEmpty(locationData.city) &&
      isEmpty(locationData.country)
    ) {
      return message.error("Vui lòng chọn vị trí");
    }
    try {
      setLoading(true);
      const { success, data } = await createLocation(locationData);
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
            placeholder="Tìm kiếm"
            countries="vn"
            onResult={setResult}
            mapboxAccessToken={MAPBOX_TOKEN}
            position="top-left"
          />
        </Map>
      </div>
    </div>
  );
};

export default Index;
