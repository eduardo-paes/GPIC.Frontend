import { IMainAreaService } from "@/domain/usecases/main-area-interface";
import { MainAreaService } from "@/data/services/main-area-service";
import { ApiUrlFactory, AxiosHttpClientFactory, PrivateHeaderFactory } from "../http";

export const MainAreaServiceFactory = (): IMainAreaService =>
    new MainAreaService(ApiUrlFactory('mainarea/'), AxiosHttpClientFactory(), PrivateHeaderFactory());