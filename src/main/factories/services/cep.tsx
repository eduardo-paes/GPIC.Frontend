import { CEPApiService } from "@/infrastructure/data/services/cep-service";
import { ICEPService } from "@/infrastructure/interfaces/services/cep-service";
import { AxiosHttpClientFactory } from "../http";

export const CEPApiServiceFactory = (): ICEPService =>
    new CEPApiService(AxiosHttpClientFactory());