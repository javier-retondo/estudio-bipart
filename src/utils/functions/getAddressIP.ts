import axios from 'axios';
interface GeoLocationResponse {
   status: 'success' | 'fail';
   country: string;
   countryCode: string;
   region: string;
   regionName: string;
   city: string;
   zip: string;
   lat: number;
   lon: number;
   timezone: string;
   isp: string;
   org: string;
   as: string;
   query: string;
}
export async function getLocationFromIP(ip: string): Promise<GeoLocationResponse | null> {
   try {
      const response = await axios.get(`http://ip-api.com/json/${ip}`);
      return response.data;
   } catch (error: any) {
      console.error('Error obteniendo ubicación:', error.message);
      return null;
   }
}
