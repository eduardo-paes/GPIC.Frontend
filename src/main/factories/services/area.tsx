import { IAreaService } from "@/domain/usecases/area-interface";
import { AreaService } from "@/data/services/area-service";
import { ApiUrlFactory, AxiosHttpClientFactory, PrivateHeaderFactory } from "../http";

export const AreaServiceFactory = (): IAreaService =>
    new AreaService(ApiUrlFactory('area/'), AxiosHttpClientFactory(), PrivateHeaderFactory());