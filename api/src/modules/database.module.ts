import logger from "@constants/logger.constant";
import Module from "@modules/module";
import { Pool, PoolConfig } from "pg";

class Database extends Module {
    private pool: Pool;
    private config: PoolConfig;

    constructor() {
        super();
        this.config = {
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: Number(process.env.PGPORT)
        }
        this.pool = new Pool(this.config);
    }

    init(): void {
        this.pool.query('SELECT NOW()')
            .then(_ => logger.info("Conectado ao Postgres"))
            .catch((err: Error) => logger.error(err));
    }

    dispose(): void {
        this.pool.end();
    }

    getPool(): Pool {
        return this.pool;
    }
}

export default Database;