import logger from "@constants/logger.constant";
import Module from "@modules/module";
import Router from "@routers/router";
import cors from "cors";
import express, { Express, NextFunction, Request, Response } from "express";

class Server extends Module {
    private app: Express;
    private port: number;

    constructor(port: number, root: Router) {
        super();
        this.port = port;
        this.app = express();
        this.app.use(cors({ origin: "*" }));
        this.app.use(express.json());
        this.app.all("*", (req: Request, res: Response, next: NextFunction): void => {
            logger.info(`Requisicao ${req.method} em ${req.url} de ${req.socket.remoteAddress}`);
            next();
        });
        this.app.use(root.getPath(), root.getRouter());
    }

    init(): void {
        this.app.listen(this.port);
        logger.info(`Servidor iniciado na porta ${this.port}`);
    }

    dispose(): void {

    }
}

export default Server;