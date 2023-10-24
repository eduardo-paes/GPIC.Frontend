import { IProjectService } from "@/domain/usecases/project-interface";
import { ProjectService } from "@/data/services/project-service";
import { ApiUrlFactory, AxiosHttpClientFactory, PrivateHeaderFactory } from "../http";

export const ProjectServiceFactory = (): IProjectService =>
    new ProjectService(ApiUrlFactory('project'), AxiosHttpClientFactory(), PrivateHeaderFactory());