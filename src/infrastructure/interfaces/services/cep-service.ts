import { Address } from "@/domain/models/address";

export interface ICEPService {
	consult(params: ICEPService.ConsultParams): Promise<Address>;
}

export namespace ICEPService {
	export type ConsultParams = {
		CEP: string;
		CPF: string;
	};
}
