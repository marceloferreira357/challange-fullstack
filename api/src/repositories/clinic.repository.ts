import logger from "@constants/logger.constant";
import Model from "@models/clinic.model";
import Repository from "@repositories/repository";
import { QueryResult } from "pg";

class Clinic extends Repository {
    constructor() {
        super();
    }

    async insert(model: Model): Promise<any> {
        let queryText: string = "INSERT INTO clinics(address_id, name, cnpj) VALUES($1, $2, $3) RETURNING *";
        let values: any[] = [model.getAddress().getId(), model.getName(), model.getCNPJ()];
        logger.info(`Inserindo novo modelo no banco de dados ${JSON.stringify(model)}`);
        const response: QueryResult<any> = await this.pool.query<any, any[]>(queryText, values);
        return response.rows[0];
    }

    async select(addressId: number): Promise<any> {
        let queryText: string = "SELECT * FROM clinics WHERE address_id = $1";
        let values: any[] = [addressId];
        logger.info(`Buscando clinica no banco de dados com address_id ${addressId}`);
        const response: QueryResult<any> = await this.pool.query<any, any[]>(queryText, values);
        return response.rows[0];
    }

    async selectAll(): Promise<any> {
        let queryText: string = "SELECT clinics.id, name, line1, number, district, city, state, country, latitude, longitude FROM clinics JOIN addresses ON clinics.address_id = addresses.id";
        let values: any[] = [];
        logger.info("Buscando todas as clinicas no banco de dados");
        const response: QueryResult<any> = await this.pool.query<any, any[]>(queryText, values);
        return response.rows;
    }
}

export default Clinic;