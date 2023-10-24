import { ICampusService } from "@/domain/usecases/campus-interface";
import { CampusService } from "@/data/services/campus-service";
import { ApiUrlFactory, AxiosHttpClientFactory, PrivateHeaderFactory } from "../http";

export const CampusServiceFactory = (): ICampusService =>
    new CampusService(ApiUrlFactory('campus'), AxiosHttpClientFactory(), PrivateHeaderFactory());