import logger from "@constants/logger.constant";
import Model from "@models/address.model";
import Repository from "@repositories/repository";
import { QueryResult } from "pg";

class Address extends Repository {
    constructor() {
        super();
    }

    async insert(model: Model): Promise<any> {
        let queryText: string = "INSERT INTO addresses(line1, number, district, line2, city, state, country, latitude, longitude) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";
        let values: any[] = [
            model.getLine1(),
            model.getNumber(),
            model.getDistrict(),
            model.getLine2(),
            model.getCity(),
            model.getState(),
            model.getCountry(),
            model.getLatitude(),
            model.getLongitude()
        ];
        logger.info(`Inserindo novo modelo no banco de dados ${JSON.stringify(model)}`);
        const response: QueryResult<any> = await this.pool.query<any, any[]>(queryText, values);
        return response.rows[0];
    }

    async select(latitude: number, longitude: number): Promise<any> {
        let queryText: string = "SELECT * FROM addresses WHERE latitude = $1 AND longitude = $2";
        let values: any[] = [latitude, longitude];
        logger.info(`Buscando endereco no banco de dados com latitude ${latitude} e longitude ${longitude}`);
        const response: QueryResult<any> = await this.pool.query<any, any[]>(queryText, values);
        return response.rows[0];
    }
}

export default Address;