"use client";
import { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icons broken by webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function DashboardMap() {
    const mapRef = useRef(null);

    // Clean up the Leaflet map instance on unmount so React Strict Mode's
    // double-mount doesn't trigger "Map container is already initialized"
    useEffect(() => {
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    return (
        <MapContainer
            ref={mapRef}
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[51.505, -0.09]}>
                <Popup>Care Hospital</Popup>
            </Marker>
            <Marker position={[51.51, -0.1]}>
                <Popup>City Hospital</Popup>
            </Marker>
            <Marker position={[51.515, -0.1]}>
                <Popup>Max Hospital</Popup>
            </Marker>
            <Marker position={[51.52, -0.09]}>
                <Popup>New City Hospital</Popup>
            </Marker>
        </MapContainer>
    );
}
