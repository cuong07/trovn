export const clusterLayer = {
    id: "clusters",
    type: "circle",
    source: "earthquakes",
    filter: ["has", "point_count"],
    paint: {
        "circle-color": [
            "step",
            ["get", "point_count"],
            "#50C878",
            100,
            "#f1f075",
            750,
            "#50C878",
        ],
        "circle-radius": [
            "step",
            ["get", "point_count"],
            24,
            100,
            30,
            7900,
            40,
        ],
    },
};

export const clusterCountLayer = {
    id: "cluster-count",
    type: "symbol",
    source: "earthquakes",
    filter: ["has", "point_count"],
    layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12,
    },
};

export const unclusteredPointLayer = {
    id: "unclustered-point",
    type: "circle",
    source: "earthquakes",
    filter: ["!", ["has", "point_count"]],
    paint: {
        "circle-color": "#50C878",
        "circle-radius": 6,
        "circle-stroke-width": 3,
        "circle-stroke-color": "#fff",
    },
};
