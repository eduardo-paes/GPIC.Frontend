import { ActivityTypeDTO } from '../models/activity-type-dto';
import { ActivityDTO } from '../models/activity-dto';
import { NoticeViewModel } from '@/presentation/models/notice';
import { NoticeDTO } from '../models/notice-dto';
import { Mapper } from '../interfaces/mapper';
import { Notice } from '@/domain/models/notice';

class NoticeMapper implements Mapper<NoticeViewModel, NoticeDTO> {
    mapFrom(source: NoticeViewModel): NoticeDTO {
        return {
            id: source.id,
            registrationStartDate: source.registrationStartDate!,
            registrationEndDate: source.registrationEndDate!,
            evaluationStartDate: source.evaluationStartDate!,
            evaluationEndDate: source.evaluationEndDate!,
            appealStartDate: source.appealStartDate!,
            appealEndDate: source.appealEndDate!,
            sendingDocsStartDate: source.sendingDocsStartDate!,
            sendingDocsEndDate: source.sendingDocsEndDate!,
            suspensionYears: source.suspensionYears,
            partialReportDeadline: source.partialReportDeadline,
            finalReportDeadline: source.finalReportDeadline,
            description: source.description,
            attachedFile: source.attachedFile,
            activities: source.activities!.map((activityType: ActivityTypeDTO) => ({
                id: activityType.id,
                name: activityType.name,
                unity: activityType.unity,
                activities: activityType.activities!.map((activity: ActivityDTO) => ({
                    id: activity.id,
                    name: activity.name,
                    points: activity.points,
                    limits: activity.limits
                })),
            })),
            deletedAt: source.deletedAt,
        };
    }
}

export default NoticeMapper;
