import core from "@constants/core.constant";
import Model from "@models/model.interface";
import Database from "@modules/database.module";
import { Pool } from "pg";

abstract class Repository {
    protected pool: Pool;

    constructor() {
        let database: Database = core.getModule("Database") as Database;
        this.pool = database.getPool();
    }

    abstract insert(model: Model): Promise<any>;
}

export default Repository;