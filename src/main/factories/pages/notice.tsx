import NoticeManagementPage from "@/presentation/pages/notice";
import React from "react";
import { NoticeServiceFactory } from "../services/notice";

export const NoticeManagementPageFactory: React.FC = () =>
    <NoticeManagementPage noticeService={NoticeServiceFactory()} />
