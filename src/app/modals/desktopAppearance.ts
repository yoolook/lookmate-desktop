export interface IDesktopAppearanceResponse {
  code: number;
  pictureDetails: IPictureDetails;
}

export interface IUser{
  nick_name:string;
  lastProfilePicId:string;
}

export interface IPictureDetails{
  picture:string;
  location:string;
  createdAt:string;
  caption:string;
  user:IUser;
}

export interface IsubmittedCommentResponse {
  code: number;
  message: string;
  isCommentLimitOver?: boolean;
  createdAt?: string;
}




