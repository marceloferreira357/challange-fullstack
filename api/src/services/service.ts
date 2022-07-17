import Model from "@models/model.interface";
import Repository from "@repositories/repository";

abstract class Service {
    protected repository?: Repository;

    async insert(model: Model): Promise<any | undefined> {
        return await this.repository?.insert(model);
    }
}

export default Service;