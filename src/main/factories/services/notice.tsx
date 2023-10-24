import { INoticeService } from "@/domain/usecases/notice-interface";
import { NoticeService } from "@/data/services/notice-service";
import { ApiUrlFactory, AxiosHttpClientFactory, PrivateHeaderFactory } from "../http";

export const NoticeServiceFactory = (): INoticeService =>
    new NoticeService(ApiUrlFactory('notice/'), AxiosHttpClientFactory(), PrivateHeaderFactory());