export interface Message {
  id: string;
  content: string;
  author: string;
  time: Date;
  answerId?: string;
  sessionID: string;
}
