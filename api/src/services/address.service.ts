import { default as AddressRepository, default as Repository } from "@repositories/address.repository";
import Service from "@services/service";

class Address extends Service {
    constructor() {
        super();
        this.repository = new Repository();
    }

    async select(latitude: number, longitude: number): Promise<any | undefined> {
        return await (this.repository as AddressRepository).select(latitude, longitude);
    }
}

export default Address;