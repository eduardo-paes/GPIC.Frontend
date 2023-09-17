import { IProgramTypeService } from "@/domain/usecases/program-type-interface";
import { ProgramTypeService } from "@/data/services/program-type-service";
import { ApiUrlFactory, AxiosHttpClientFactory, PrivateHeaderFactory } from "../http";

export const ProgramTypeServiceFactory = (): IProgramTypeService =>
    new ProgramTypeService(ApiUrlFactory('programtype'), AxiosHttpClientFactory(), PrivateHeaderFactory());