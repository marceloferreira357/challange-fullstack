import core from "@constants/core.constant";
import Database from "@modules/database.module";
import Server from "@modules/server.module";
import Actuator from "@routers/actuator.router";
import Clinic from "@routers/clinic.router";
import Root from "@routers/root.router";
import dotenv from "dotenv";

const main = (): void => {
    dotenv.config();

    // instantiate the const variables
    const root: Root = new Root();

    // init core
    core.addModule("Database", new Database());
    core.addModule("Server", new Server(Number(process.env.SERVER_PORT), root));

    // init routers
    root.addRouter(new Actuator());
    root.addRouter(new Clinic());

    // init the modules
    core.initModules();
}
main();