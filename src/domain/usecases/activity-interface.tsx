import { ActivityType } from "../models/activity-type";

export interface IActivityService {
    getOfLastNotice(): Promise<Array<ActivityType>>;
    getByNoticeId(params: IActivityService.GetParams): Promise<Array<ActivityType>>;
}

export namespace IActivityService {
    export type GetParams = {
        id: string
    }
}
