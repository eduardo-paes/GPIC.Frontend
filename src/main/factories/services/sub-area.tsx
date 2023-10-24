import { ISubAreaService } from "@/domain/usecases/sub-area-interface";
import { SubAreaService } from "@/data/services/sub-area-service";
import { ApiUrlFactory, AxiosHttpClientFactory, PrivateHeaderFactory } from "../http";

export const SubAreaServiceFactory = (): ISubAreaService =>
    new SubAreaService(ApiUrlFactory('subarea/'), AxiosHttpClientFactory(), PrivateHeaderFactory());