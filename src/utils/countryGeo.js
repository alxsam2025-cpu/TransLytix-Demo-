// src/utils/countryGeo.jsx

// Dummy simplified country borders for demo purposes
// (replace with real GeoJSON if needed)
export const COUNTRY_BORDERS = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Ghana" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-3.2554, 4.9945],
            [1.1995, 4.9945],
            [1.1995, 11.1667],
            [-3.2554, 11.1667],
            [-3.2554, 4.9945],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Nigeria" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [2.7, 4.2],
            [14.6, 4.2],
            [14.6, 13.9],
            [2.7, 13.9],
            [2.7, 4.2],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Kenya" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [33.9, -4.7],
            [41.9, -4.7],
            [41.9, 5.2],
            [33.9, 5.2],
            [33.9, -4.7],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Sudan" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [21.8, 8.7],
            [38.6, 8.7],
            [38.6, 22.0],
            [21.8, 22.0],
            [21.8, 8.7],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Zimbabwe" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [25.2, -22.4],
            [33.1, -22.4],
            [33.1, -15.6],
            [25.2, -15.6],
            [25.2, -22.4],
          ],
        ],
      },
    },
  ],
};

