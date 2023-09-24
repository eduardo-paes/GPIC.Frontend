import { ICourseService } from "@/domain/usecases/course-interface";
import { CourseService } from "@/data/services/course-service";
import { ApiUrlFactory, AxiosHttpClientFactory, PrivateHeaderFactory } from "../http";

export const CourseServiceFactory = (): ICourseService =>
    new CourseService(ApiUrlFactory('course'), AxiosHttpClientFactory(), PrivateHeaderFactory());