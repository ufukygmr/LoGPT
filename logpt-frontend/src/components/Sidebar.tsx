import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { Conversation } from '../types/Conversation';

interface SidebarProps {
    conversations: Conversation[];
    onConversationClick: (id: number) => void;
    createNewConversation: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ conversations, onConversationClick, createNewConversation }) => {
    return (
        <Paper elevation={3} style={{ padding: '16px', height: '100vh', overflowY: 'auto', position: 'fixed', left: 0, top: 0, width: '15%', backgroundColor: 'black', color: 'white' }}>
            <Button variant="outlined" onClick={createNewConversation} style={{ marginBottom: '16px', width: '100%' }}>
            Start New Chat
            </Button>
            <Typography variant="h6" style={{color: '#F4EBD9'}} gutterBottom>
            Conversations
            </Typography>
            {conversations.map((conversation) => (
            <div key={conversation.id} style={{ marginBottom: '8px', cursor: 'pointer' }} onClick={() => onConversationClick(conversation.id)}>
                <Typography variant="body1" style={{color: '#F4EBD9'}}>ID: {conversation.id}</Typography>
            </div>
            ))}
        </Paper>
    );
};

export default Sidebar;
