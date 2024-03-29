import { Timestamp } from 'rxjs';

export enum ContentType {
  Post = 'post',
  Profile = 'profile',
  Comments = 'comments',
}

export interface IReportReq {
  reporterId: string;
  contentId: string;
  contentType: ContentType;
  reason: string;
}
export interface IReportRes extends IReportReq {
  _id: string;
}
export interface IReportStatusRes extends IReportRes {
  createdAt: Date;
  isResolved: boolean;
}

export interface IReportsAndCount {
  reports: IReportStatusRes[];
  reportCount: number;
}
