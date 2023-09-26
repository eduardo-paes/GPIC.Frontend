import { IAssistanceTypeService } from "@/domain/usecases/assistance-type-interface";
import { AssistanceTypeService } from "@/data/services/assistance-type-service";
import { ApiUrlFactory, AxiosHttpClientFactory, PrivateHeaderFactory } from "../http";

export const AssistanceTypeServiceFactory = (): IAssistanceTypeService =>
    new AssistanceTypeService(ApiUrlFactory('assistancetype'), AxiosHttpClientFactory(), PrivateHeaderFactory());