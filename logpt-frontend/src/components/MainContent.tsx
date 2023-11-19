import React from 'react';
import { Container, Typography } from '@mui/material';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';
import { Conversation } from '../types/Conversation';
import AuthButtons from './auth/AuthButtons';
import Stack from '@mui/material/Stack';

interface MainContentProps {
    selectedConversation: number | null;
    conversations: Conversation[];
    addMessage: (text: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({ selectedConversation, conversations, addMessage }) => {
    return (
        <Container style={{height:'100%'}}>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Typography variant="h4" component="h1" style={{ margin: '16px 0', color: '#F4EBD9'}}>
                    LoGPT
                </Typography>
                <AuthButtons/>
            </Stack>
            {selectedConversation !== null ? (
                <>
                    <ChatWindow
                    messages={
                        conversations.find((c) => c.id === selectedConversation)?.messages || []
                    }
                    />
                    <MessageInput onSendMessage={addMessage} />
                </>
            ) : (
                <Typography variant="body1" style={{color: '#F4EBD9'}}>Select a conversation or create a new one.</Typography>
            )}
        </Container>
    );
};

export default MainContent;
