import { FollowingStatus } from '../enums/follow';

export interface IFollowCountRes {
  count: number;
  status: FollowingStatus;
}

export interface IFollowStatus {
  status: FollowingStatus;
}
