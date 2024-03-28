import { type ICoords, IUserAddress } from './common';

// auth credentials
export interface IUserAuth {
  fullname: string;
  username: string;
  email: string;
  mobile: string;
  password: string;
}
//Interface for userSchema
export interface IUser {
  _id: string;
  username: string;
  fullname: string;
  email: string;
  bio?: string;
  password?: string;
  mobile: string;
  dob?: Date; // need to check
  isGoogleAuth: boolean;
  profilePic: string;
  isBlocked: boolean;
  isPremier: boolean;
  premiumExpiry?: Date;
  wallet?: number | null;
  visibility: 'public' | 'private';
  coords?: ICoords;
  address?: IUserAddress;
}
export interface IUserRes extends IUser {}

export interface IUserProfileData extends IUserRes {
  postsCount: number;
  followersCount: number;
  followingCount: number;
}

// api response for single user as data
export interface IApiUserRes {
  status: number;
  message: string;
  data: IUserProfileData;
}

export interface IUserChatSearch
  extends Omit<
    IUserRes,
    | 'email'
    | 'password'
    | 'isBlocked'
    | 'isGoogleAuth'
    | 'isPremier'
    | 'dob'
    | 'mobile'
    | 'premiumExpiry'
    | 'wallet'
    | 'visibility'
    | 'coords'
    | 'address'
  > {}
export interface IApiProfileRes {
  status: number;
  message: string;
  data: {
    "postsCount":number,
    "followersCount":number,
    "followingCount":number
  };
}

export interface IUserUpdate
  extends Omit<IUserRes, '_id' | 'email' | 'password' | 'isBlocked' > {}

export interface IApiUserAuthRes extends IApiUserRes {
  accessToken: string;
  refreshToken: string;
}

// api response for multiple users as data
export interface IApiUsersRes {
  status: number;
  message: string;
  data: IUserRes[] | null;
}

export interface IUsersAndCount {
  users: IUserRes[];
  userCount: number;
}
export interface IApiTokenRes {
  status: number;
  message: string;
  accessToken: string;
}

export interface IUserPerMonth{
  month:string;
  count:number
}
export interface IUserPerYear {
  year: string;
  count: number;
}


