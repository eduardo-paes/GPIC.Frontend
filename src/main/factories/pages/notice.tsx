import NoticeManagementPage from "@/presentation/pages/notice";
import React from "react";
import { NoticeServiceFactory } from "../services/notice";
import { ActivityServiceFactory } from "../services/activity";
import { NoticeMapperServiceFactory } from "../mappings/notice";

export const NoticeManagementPageFactory: React.FC = () =>
    <NoticeManagementPage
        noticeService={NoticeServiceFactory()}
        activityService={ActivityServiceFactory()}
        mapperService={NoticeMapperServiceFactory()}
    />
