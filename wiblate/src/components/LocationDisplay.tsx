import React, { useEffect, useState } from 'react';
import { getLocation } from '@/lib/IPGetter';

interface LocationData {
    latitude: string;
    longitude: string;
    city: string;
    region: string;
    country: string;
}

const LocationDisplay: React.FC = () => {
    const [location, setLocation] = useState<LocationData | null>(null);

    useEffect(() => {
        const fetchLocation = async () => {
            const data = await getLocation();
            setLocation(data);
            console.log("Localização obtida:", data); // Log das informações da localização
        };

        fetchLocation();
    }, []);

    if (!location) return <p>Carregando localização...</p>;

    return (
        <div>
            <h2>Sua Localização</h2>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
            <p>Cidade: {location.city}</p>
            <p>Região: {location.region}</p>
            <p>País: {location.country}</p>
        </div>
    );
};

export default LocationDisplay;
