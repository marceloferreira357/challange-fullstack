import axios, { AxiosResponse } from "axios";

export const insert = async (name: string | undefined, CNPJ: string | undefined, address: {} | undefined): Promise<string | undefined> => {
    try {
        let response: AxiosResponse<any, any> = await axios.post(`http://192.168.1.2:3001/clinics`, {
            name: name,
            CNPJ: CNPJ,
            address: address
        });
    } catch (error: any) {
        return error.message;
    }
}

export const selectAll = async (): Promise<any> => {
    try {
        let response: AxiosResponse<any, any> = await axios.get(`http://192.168.1.2:3001/clinics`);
        return response.data.results;
    } catch (error: any) {
        return error.message;
    }
}