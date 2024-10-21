// import React, { useEffect, useState } from 'react';
// import { getLocation } from '@/lib/IPGetter';


// interface LocationData {
//   latitude: string;
//   longitude: string;
//   city: string;
//   region: string;
//   country: string;
// }


// const useLocation = (): LocationData | null => {
//   const [location, setLocation] = useState<LocationData | null>(null);


//   useEffect(() => {
//     const fetchLocation = async () => {
//       const data = await getLocation();
//       setLocation(data);
//       console.log("Localização obtida:", data); // Log das informações da localização
//     };


//     fetchLocation();
//   }, []);


//   return location;
// };


// export default useLocation;




const useLocation = () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const { latitude, longitude, accuracy } = position.coords;
                fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                    .then(response => response.json())
                    .then(data => {
                        const address = data.address;
                        const city = address.city || address.town || address.village;
                        const state = address.state;
                        const accuracy = address.accuracy
                        console.log(`Cidade: ${city}, Estado: ${state}, Precisão: ${position.coords.accuracy}`);
                    })
                    .catch(error => {
                        console.error('Erro ao obter a localização:', error);
                    });
            },
            function(error) {
                console.log(error);
            },
            {
                enableHighAccuracy: true
            }
        );
    } else {
        console.log(`Não foi possível obter a localização`);
    }
}


export default useLocation;


