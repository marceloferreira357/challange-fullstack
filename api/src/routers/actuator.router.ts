import Router from "@routers/router";
import Service from "@services/actuator.service";

class Actuator extends Router {
    private service: Service;

    constructor() {
        super("/actuator");
        this.service = new Service();
        this.router.get("/health", this.service.getHealth);
    }
}

export default Actuator;