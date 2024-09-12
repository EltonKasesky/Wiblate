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