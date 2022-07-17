import logger from "@constants/logger.constant";
import Service from "@services/service";
import { NextFunction, Request, Response } from "express";

class Actuator extends Service {
    constructor() {
        super();
    }

    getHealth(req: Request, res: Response, next: NextFunction): void {
        let response: {} = { health: "up" };
        logger.info(`Retornando estado da api para cliente ${JSON.stringify(response)}`);
        res.status(200).json(response);
    }
}

export default Actuator;