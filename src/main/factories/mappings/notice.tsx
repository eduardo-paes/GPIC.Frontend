import { Mapper } from "@/data/interfaces/mapper";
import { NoticeViewModel } from "@/presentation/models/notice";
import { NoticeDTO } from "@/data/models/notice-dto";
import NoticeMapper from "@/data/mappings/notice";

export const NoticeMapperServiceFactory = (): Mapper<NoticeViewModel, NoticeDTO> =>
    new NoticeMapper();