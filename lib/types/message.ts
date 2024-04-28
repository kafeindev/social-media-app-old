export interface Message {
  id: string;
  text: string;
  user: string;
  date: string;
}

export interface DirectMessage extends Message {
  target: string;
}
