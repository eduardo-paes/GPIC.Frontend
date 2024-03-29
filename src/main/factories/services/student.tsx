import { IStudentService } from "@/domain/usecases/student-interface";
import { StudentService } from "@/data/services/student-service";
import { ApiUrlFactory, AxiosHttpClientFactory, PrivateHeaderFactory, PublicHeaderFactory } from "../http";

export const StudentServiceFactory = (): IStudentService =>
    new StudentService(ApiUrlFactory('student/'), AxiosHttpClientFactory(), PublicHeaderFactory(), PrivateHeaderFactory());