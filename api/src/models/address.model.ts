import Model from "@models/model.interface";

class Address implements Model {
    private id: number | undefined;
    private line1: string;
    private number: number;
    private district: string;
    private line2: string;
    private city: string;
    private state: string;
    private country: string;
    private latitude: number;
    private longitude: number;

    constructor(
        id: number | undefined,
        line1: string,
        number: number,
        district: string,
        line2: string,
        city: string,
        state: string,
        country: string,
        latitude: number,
        longitude: number
    ) {
        this.id = id;
        this.line1 = line1;
        this.number = number;
        this.district = district;
        this.line2 = line2;
        this.city = city;
        this.state = state;
        this.country = country;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    setId(id: number): void {
        this.id = id;
    }

    getId(): number | undefined {
        return this.id;
    }

    getLine1(): string {
        return this.line1;
    }

    getNumber(): number {
        return this.number;
    }

    getDistrict(): string {
        return this.district;
    }

    getLine2(): string {
        return this.line2;
    }

    getCity(): string {
        return this.city;
    }

    getState(): string {
        return this.state;
    }

    getCountry(): string {
        return this.country;
    }

    getLatitude(): number {
        return this.latitude;
    }

    getLongitude(): number {
        return this.longitude;
    }
}

export default Address;