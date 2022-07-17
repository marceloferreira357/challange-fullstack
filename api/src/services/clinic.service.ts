import { default as ClinicRepository, default as Repository } from "@repositories/clinic.repository";
import Service from "@services/service";

class Clinic extends Service {
    constructor() {
        super();
        this.repository = new Repository();
    }

    async select(addressId: number): Promise<any | undefined> {
        return await (this.repository as ClinicRepository).select(addressId);
    }

    async selectAll(): Promise<any> {
        return await (this.repository as ClinicRepository).selectAll();
    }
}

export default Clinic;