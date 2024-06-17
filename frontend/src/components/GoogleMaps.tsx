import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useEffect, useRef, useState } from "react";




export default function MapComponent(){
  const [map, setMap] = useState<google.maps.Map>()
  const ref = useRef<HTMLDivElement>(null);
  const [markerCluster, setMarkerClusters] = useState<MarkerClusterer>();
  const [marker, setMarker] = useState<{lat: number, lng: number} | undefined>();

  const organizationLocation = { lat: 59.3327419, lng: 17.9798944};

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        center: organizationLocation,
        zoom: 10,
      });

      setMap(newMap);

     
      new window.google.maps.Marker({
        position: organizationLocation,
        map: newMap,
        title: "Our organization is here!",
      });
    }

    if (map && !markerCluster) {
      map.addListener('click', (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          const { lat, lng } = e.latLng;
          setMarker({ lat: lat(), lng: lng() });
        }
      });
      setMarkerClusters(new MarkerClusterer({ map, markers: [] }));
    }
  }, [map, markerCluster]);

  useEffect(() => {
    if (marker && markerCluster) {
      markerCluster.clearMarkers();
      markerCluster.addMarker(
        new window.google.maps.marker.AdvancedMarkerElement({
          position: { lat: marker.lat, lng: marker.lng },
        })
      );
    }
  }, [marker, markerCluster]);

  return (
    <>
      <div ref={ref as any} style={{height: "20%", width: "100%", minHeight:"700px"}} ></div>
    </>
  )
}

