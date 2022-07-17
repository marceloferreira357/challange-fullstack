import Address from "@models/address.model";
import Model from "@models/model.interface";

class Clinic implements Model {
    private id: number | undefined;
    private name: string;
    private CNPJ: number;
    private address: Address;

    constructor(
        id: number | undefined,
        name: string,
        CNPJ: number,
        address: Address
    ) {
        this.id = id;
        this.name = name;
        this.CNPJ = CNPJ;
        this.address = address;
    }

    setId(id: number) {
        this.id = id;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getCNPJ(): number {
        return this.CNPJ;
    }

    getAddress(): Address {
        return this.address;
    }
}

export default Clinic;