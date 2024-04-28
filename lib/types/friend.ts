import { User } from "./user";

export interface Friend {
  id: string;
  user: User;
  requesterId: string;
  receiverId: string;
  timestamp: string;
  accepted: boolean;
}
