import MapHouseSvg from "@Assets/images/icons/map-house.svg";
import "./index.less";
import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  useLoadScript,
} from "@react-google-maps/api";
import { useCallback, useEffect, useReducer, useRef } from "react";
import Loading from "@Components/UI/molecules/Loading";
import Alert from "@Components/UI/atoms/Alert";
import Empty from "@Components/UI/molecules/Empty";

export interface MapProps {
  loading: boolean;
  error: any;
  locations: { lat: number; lng: number }[];
}

interface MapState {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

const Map = ({ loading, error, locations }: MapProps) => {
  const [state, setState] = useReducer(
    (oldState: MapState, newState: Partial<MapState>) => ({
      ...oldState,
      ...newState,
    }),
    {
      center: {
        lat: null,
        lng: null,
      },
      zoom: 11,
    }
  );

  const mapRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.MAP_GOOGLE_EMBED_KEY,
  });

  const onMapLoad = useCallback(
    (map) => {
      mapRef.current = map;
    },
    [locations]
  );

  const onUnmount = useCallback((map) => {
    mapRef.current = null;
  }, []);

  useEffect(() => {
    if (locations?.length > 0) {
      setState({
        center: {
          lat: locations?.[0]?.lat,
          lng: locations?.[0]?.lng,
        },
      });
    }
  }, [locations]);

  const createMarkerKey = (location) => {
    return location?.lat + location?.lng;
  };

  return (
    <>
      {loading || !isLoaded ? (
        <Loading size={32} className="w-100" />
      ) : !error ? (
        locations?.length > 0 ? (
          <GoogleMap
            id="investment-locations-map"
            onLoad={onMapLoad}
            onUnmount={onUnmount}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            zoom={state.zoom}
            center={state.center}
          >
            <MarkerClusterer averageCenter>
              {(clusterer) =>
                locations.map((location) => (
                  <Marker
                    key={createMarkerKey(location)}
                    position={location}
                    clusterer={clusterer}
                    icon={MapHouseSvg}
                  />
                ))
              }
            </MarkerClusterer>
          </GoogleMap>
        ) : (
          <Empty className="w-100" />
        )
      ) : (
        <Alert
          type="error"
          showIcon
          message={error?.message}
          className="w-100"
        />
      )}
    </>
  );
};

export default Map;
