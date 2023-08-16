import { INoticeService } from "@/domain/usecases/notice-interface";
import { NoticeService } from "@/data/services/notice-service";
import { ApiUrlFactory, AxiosHttpClientFactory } from "../http";

export const NoticeServiceFactory = (): INoticeService =>
    new NoticeService(ApiUrlFactory('notice/'), AxiosHttpClientFactory());