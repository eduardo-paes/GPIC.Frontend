import { ActivityService } from "@/data/services/activity-service";
import { IActivityService } from "@/domain/usecases/activity-interface";
import { ApiUrlFactory, AxiosHttpClientFactory, PrivateHeaderFactory } from "../http";

export const ActivityServiceFactory = (): IActivityService =>
    new ActivityService(ApiUrlFactory('activity'), AxiosHttpClientFactory(), PrivateHeaderFactory());