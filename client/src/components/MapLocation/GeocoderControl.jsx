/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { useControl, Marker } from "react-map-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import useLocationStore from "@/hooks/useLocationStore";

function GeocoderControl(props) {
    const [marker, setMarker] = useState(null);
    const geocoderRef = useRef(null);
    const { locationSearch } = useLocationStore();

    const onMarkerDragStart = React.useCallback((event) => {
        props.onSetEvent((_events) => ({
            ..._events,
            onDragStart: event.lngLat,
        }));
    }, []);

    const onMarkerDrag = React.useCallback((event) => {
        props.onSetEvent((_events) => ({ ..._events, onDrag: event.lngLat }));

        setMarker(
            (prevMarker) =>
                prevMarker &&
                React.cloneElement(prevMarker, {
                    longitude: event.lngLat.lng,
                    latitude: event.lngLat.lat,
                })
        );
    }, []);

    const onMarkerDragEnd = React.useCallback((event) => {
        props.onSetEvent((_events) => ({
            ..._events,
            onDragEnd: event.lngLat,
        }));
    }, []);

    useEffect(() => {
        if (geocoderRef.current && locationSearch) {
            geocoderRef.current.query(locationSearch);
        }
    }, [locationSearch]);

    const geocoder = useControl(
        () => {
            const ctrl = new MapboxGeocoder({
                ...props,
                marker: false,
                accessToken: props.mapboxAccessToken,
                countries: "vn",
                types: "region,district,place,locality,neighborhood,address",
                language: "vi",
            });
            geocoderRef.current = ctrl;

            ctrl.on("result", (evt) => {
                props.onResult(evt);
                const { result } = evt;
                const location =
                    result &&
                    (result.center ||
                        (result.geometry?.type === "Point" &&
                            result.geometry.coordinates));
                if (location && props.marker) {
                    setMarker(
                        <Marker
                            {...props.marker}
                            // ref={props.ref2}
                            longitude={location[0]}
                            latitude={location[1]}
                            draggable
                            onDragStart={onMarkerDragStart}
                            onDrag={onMarkerDrag}
                            onDragEnd={onMarkerDragEnd}
                        />
                    );
                } else {
                    setMarker(null);
                }
            });
            ctrl.on("loading", props.onLoading);
            ctrl.on("results", props.onResults);
            ctrl.on("error", props.onError);

            return ctrl;
        },
        {
            position: props.position,
        }
    );

    useEffect(() => {
        if (geocoderRef.current) {
            if (
                geocoder.getProximity() !== props.proximity &&
                props.proximity !== undefined
            ) {
                geocoder.setProximity(props.proximity);
            }
            if (
                geocoder.getRenderFunction() !== props.render &&
                props.render !== undefined
            ) {
                geocoder.setRenderFunction(props.render);
            }
            if (
                geocoder.getLanguage() !== props.language &&
                props.language !== undefined
            ) {
                geocoder.setLanguage(props.language);
            }
            if (geocoder.getZoom() !== props.zoom && props.zoom !== undefined) {
                geocoder.setZoom(props.zoom);
            }
            if (
                geocoder.getFlyTo() !== props.flyTo &&
                props.flyTo !== undefined
            ) {
                geocoder.setFlyTo(props.flyTo);
            }
            if (
                geocoder.getPlaceholder() !== props.placeholder &&
                props.placeholder !== undefined
            ) {
                geocoder.setPlaceholder(props.placeholder);
            }
            if (
                geocoder.getCountries() !== props.countries &&
                props.countries !== undefined
            ) {
                geocoder.setCountries(props.countries);
            }
            if (
                geocoder.getTypes() !== props.types &&
                props.types !== undefined
            ) {
                geocoder.setTypes(props.types);
            }
            if (
                geocoder.getMinLength() !== props.minLength &&
                props.minLength !== undefined
            ) {
                geocoder.setMinLength(props.minLength);
            }
            if (
                geocoder.getLimit() !== props.limit &&
                props.limit !== undefined
            ) {
                geocoder.setLimit(props.limit);
            }
            if (
                geocoder.getFilter() !== props.filter &&
                props.filter !== undefined
            ) {
                geocoder.setFilter(props.filter);
            }
            if (
                geocoder.getOrigin() !== props.origin &&
                props.origin !== undefined
            ) {
                geocoder.setOrigin(props.origin);
            }
        }
    }, [
        geocoderRef.current,
        props.proximity,
        props.render,
        props.language,
        props.zoom,
        props.flyTo,
        props.placeholder,
        props.countries,
        props.types,
        props.minLength,
        props.limit,
        props.filter,
        props.origin,
        props.onSetEvent,
        geocoder,
    ]);

    return marker;
}

const noop = () => {};

GeocoderControl.defaultProps = {
    marker: true,
    onLoading: noop,
    onResults: noop,
    onResult: noop,
    onError: noop,
};

export default GeocoderControl;
