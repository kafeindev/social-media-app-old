export interface User {
  userId: string;
  email: string;
  userName: string;
  displayName?: string;
  aboutMe?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  status?: UserStatus;
}

export enum UserStatus {
  Online = <any>"online",
  Offline = <any>"offline",
  Invisible = <any>"invisible",
  Away = <any>"away",
  Busy = <any>"busy",
}
