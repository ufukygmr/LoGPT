export interface Message {
  id: string;
  content: string;
  author: string;
  time: string;
  answerId?: string;
  sessionID: string;
}
