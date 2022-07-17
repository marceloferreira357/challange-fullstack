import express from "express";

abstract class Router {
    protected path: string;
    protected router: express.Router;

    constructor(path: string) {
        this.path = path;
        this.router = express.Router();
    }

    addRouter(router: Router) {
        this.router.use(router.getPath(), router.getRouter());
    }

    getPath(): string {
        return this.path;
    }

    getRouter(): express.Router {
        return this.router;
    }
}

export default Router;