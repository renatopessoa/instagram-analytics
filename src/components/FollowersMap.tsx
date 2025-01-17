import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'YOUR_MAPBOX_TOKEN'; // Replace with your token

export function FollowersMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [0, 20],
      zoom: 1.5
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Mock data points for followers locations
    const points = [
      { lng: -74.006, lat: 40.7128, type: 'follower' }, // New York
      { lng: -0.1276, lat: 51.5074, type: 'like' }, // London
      { lng: 139.6917, lat: 35.6895, type: 'comment' }, // Tokyo
    ];

    points.forEach(point => {
      const el = document.createElement('div');
      el.className = 'w-4 h-4 rounded-full bg-primary';
      
      new mapboxgl.Marker(el)
        .setLngLat([point.lng, point.lat])
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="chart-container mt-6">
      <h3 className="text-lg font-semibold mb-4">Followers Location</h3>
      <div ref={mapContainer} className="h-[400px] rounded-lg" />
    </div>
  );
}