import { Message } from './Message';

export interface Conversation {
  id: number;
  messages: Message[];
}
