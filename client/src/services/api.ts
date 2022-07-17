import axios, { AxiosResponse } from "axios";

export const insert = async (name: string | undefined, CNPJ: string | undefined, address: {} | undefined): Promise<string | undefined> => {
    try {
        let response: AxiosResponse<any, any> = await axios.post(`http://${process.env.REACT_APP_API_ADDRESS}:${process.env.REACT_APP_API_PORT}/clinics`, {
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
        let response: AxiosResponse<any, any> = await axios.get(`http://${process.env.REACT_APP_API_ADDRESS}:${process.env.REACT_APP_API_PORT}/clinics`);
        return response.data.results;
    } catch (error: any) {
        return error.message;
    }
}