import axios from 'axios';

export const getLocation = async () => {
    try {
        const response = await axios.get(`http://api.ipstack.com/check?access_key=${process.env.NEXT_PUBLIC_IPSTACK_ACCESS_KEY}`);
        const { latitude, longitude, city, region_name: region, country_name: country } = response.data;
        return { latitude, longitude, city, region, country };
    } catch (error) {
        console.error('Erro ao buscar localização:', error);
        return null;
    }
};
