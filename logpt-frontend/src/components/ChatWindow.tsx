import React from 'react';
import { Paper } from '@mui/material';
import MessageBox from './MessageBox';
import { Message } from '../types/Message';

interface ChatWindowProps {
    messages: Message[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
    return (
        <Paper elevation={0} style={{ padding: '16px', margin: '16px', height: '75vh', overflowY: 'scroll', backgroundColor: '#2e4057' }}>
            {messages.map((message, index) => (
            <MessageBox key={index} text={message.text} sender={message.sender} />
            ))}
        </Paper>
    );
};

export default ChatWindow;
