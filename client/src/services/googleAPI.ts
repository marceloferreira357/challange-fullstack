import axios, { AxiosResponse } from "axios";

const findGeoLocation = async (address: string | undefined) => {
    if (address) {
        try {
            let response: AxiosResponse<any, any> = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_API_KEY}`);
            let results: {}[] = response.data.results.map((result: any) => {
                let line1: any | undefined = undefined;
                let number: any | undefined = undefined;
                let line2: any | undefined = undefined;
                let district: any | undefined = undefined;
                let city: any | undefined = undefined;
                let state: any | undefined = undefined;
                let country: any | undefined = undefined;
                for (let i = 0; i < result.address_components.length; ++i) {
                    line1 = result.address_components[i].types.includes("route") ? result.address_components[i].long_name : line1;
                    number = result.address_components[i].types.includes("street_number") ? result.address_components[i].long_name : number;
                    line2 = result.address_components[i].types.includes("subpremise") ? result.address_components[i].long_name : line2;
                    district = result.address_components[i].types.includes("sublocality_level_1") ? result.address_components[i].long_name : district;
                    city = result.address_components[i].types.includes("administrative_area_level_2") ? result.address_components[i].long_name : city;
                    state = result.address_components[i].types.includes("administrative_area_level_1") ? result.address_components[i].long_name : state;
                    country = result.address_components[i].types.includes("country") ? result.address_components[i].long_name : country;
                }
                return {
                    line1: line1,
                    number: number,
                    district: district,
                    line2: line2,
                    city: city,
                    state: state,
                    country: country,
                    latitude: result.geometry.location.lat,
                    longitude: result.geometry.location.lng,
                }
            });
            return results;
        } catch (error) {
            return undefined;
        }
    }
}

export default findGeoLocation;