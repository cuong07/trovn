import { useRef } from "react";
import { Map, Source, Layer } from "react-map-gl";

import {
    clusterLayer,
    clusterCountLayer,
    unclusteredPointLayer,
} from "./layers";

const MAPBOX_TOKEN = import.meta.env.VITE_APP_MAPBOX_TOKEN; //

export default function MapClusters() {
    const mapRef = useRef(null);

    const onClick = (event) => {
        const feature = event.features[0];
        const clusterId = feature.properties.cluster_id;

        const mapboxSource = mapRef.current.getSource("earthquakes");

        mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) {
                return;
            }

            mapRef.current.easeTo({
                center: feature.geometry.coordinates,
                zoom,
                duration: 500,
            });
        });
    };

    return (
        <>
            <Map
                initialViewState={{
                    latitude: 19.8222,
                    longitude: 105.7972,
                    zoom: 6,
                }}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                mapboxAccessToken={MAPBOX_TOKEN}
                interactiveLayerIds={[clusterLayer.id]}
                onClick={onClick}
                ref={mapRef}
                style={{
                    width: "100%",
                    height: 600,
                }}
            >
                <Source
                    id="earthquakes"
                    type="geojson"
                    data="http://localhost:8891/api/v1/listings/get/json"
                    cluster={true}
                    clusterMaxZoom={14}
                    clusterRadius={50}
                >
                    <Layer {...clusterLayer} />
                    <Layer {...clusterCountLayer} />
                    <Layer {...unclusteredPointLayer} />
                </Source>
            </Map>
        </>
    );
}
