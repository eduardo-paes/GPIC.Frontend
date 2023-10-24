import { IProfessorService } from "@/domain/usecases/professor-interface";
import { ProfessorService } from "@/data/services/professor-service";
import { ApiUrlFactory, AxiosHttpClientFactory, PrivateHeaderFactory, PublicHeaderFactory } from "../http";

export const ProfessorServiceFactory = (): IProfessorService =>
    new ProfessorService(ApiUrlFactory('professor/'), AxiosHttpClientFactory(), PublicHeaderFactory(), PrivateHeaderFactory());