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