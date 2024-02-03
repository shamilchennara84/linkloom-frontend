import { IUserRes, IUsersAndCount } from './users';

export interface ICoords {
  type?: string;
  coordinates: [number, number];
}

export interface IUserAddress {
  country: string;
  state: string;
  district: string;
  city: string;
  zip: number;
}

export type AllResTypes = IUserRes | IUserRes[] | IUsersAndCount |null;

export interface IApiRes<T extends AllResTypes> {
  status: number;
  message: string;
  data: T;
}
