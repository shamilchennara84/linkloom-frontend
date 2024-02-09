export interface IPostReq {
  userId: string;
  postURL: string;
  caption: string;
  location: string;
  createdAt: Date;
}

export interface IPostRes extends IPostReq {
  _id: string;
}

export interface IApiPostRes {
  status: number;
  message: string;
  data: IPostRes[]
}