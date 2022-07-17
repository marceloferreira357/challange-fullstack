import logger from "@constants/logger.constant";
import Address from "@models/address.model";
import ClinicModel from "@models/clinic.model";
import Router from "@routers/router";
import AddressService from "@services/address.service";
import ClinicService from "@services/clinic.service";
import { NextFunction, Request, Response } from "express";

class Clinic extends Router {
    private addressService: AddressService;
    private clinicService: ClinicService;

    constructor() {
        super("/clinics");
        this.addressService = new AddressService();
        this.clinicService = new ClinicService();
        this.router.route("/")
            .post(async (req: Request, res: Response, next: NextFunction) => {
                if (!this.validateBody(req)) {
                    res.status(400).json({
                        status: 400,
                        timestamp: new Date().toISOString(),
                        error: "JSON invalido! Todos os campos sao obrigatorios."
                    });
                } else {
                    let address: Address = this.mapBodyToAddress(req.body);
                    let addressResponse: any = await this.addressService.insert(address);
                    address.setId(addressResponse.id);
                    let clinic: ClinicModel = new ClinicModel(undefined, req.body.name, req.body.CNPJ, address);
                    let clinicResponse: any = await this.clinicService.insert(clinic);
                    clinic.setId(clinicResponse.id);
                    res.status(200).json(clinic);
                }
            })
            .get(async (req: Request, res: Response, next: NextFunction) => {
                if (!req.query.latitude || !req.query.longitude) {
                    let clinics = await this.clinicService.selectAll();
                    res.status(200).json({
                        results: clinics
                    });
                } else {
                    let addressResponse: any = await this.addressService.select(Number(req.query.latitude), Number(req.query.longitude));
                    let clinicResponse: any = await this.clinicService.select(addressResponse.id);
                    let clinic: ClinicModel = this.mapResponseToClinic(addressResponse, clinicResponse);
                    res.status(200).json(clinic);
                }
            });
    }

    mapBodyToAddress(body: any): Address {
        return new Address(
            undefined,
            body.address.line1,
            body.address.number,
            body.address.district,
            body.address.line2,
            body.address.city,
            body.address.state,
            body.address.country,
            body.address.latitude,
            body.address.longitude
        );
    }

    mapResponseToClinic(addressResponse: any, clinicResponse: any): ClinicModel {
        return new ClinicModel(
            clinicResponse.id,
            clinicResponse.name,
            clinicResponse.cnpj,
            new Address(
                addressResponse.id,
                addressResponse.line1,
                addressResponse.number,
                addressResponse.district,
                addressResponse.line2,
                addressResponse.city,
                addressResponse.state,
                addressResponse.country,
                addressResponse.latitude,
                addressResponse.longitude
            )
        );
    }

    validateBody(req: Request): boolean {
        logger.info("Validando body da requisicao");
        return !(!req.body ||
            !req.body.name ||
            !req.body.CNPJ ||
            !req.body.address ||
            !req.body.address.line1 ||
            !req.body.address.number ||
            !req.body.address.district ||
            !req.body.address.city ||
            !req.body.address.state ||
            !req.body.address.country ||
            !req.body.address.latitude ||
            !req.body.address.longitude)
    }
}

export default Clinic;