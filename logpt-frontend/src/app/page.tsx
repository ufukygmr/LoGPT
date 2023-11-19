"use client"

import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import { Message } from '../types/Message';
import { Conversation } from '../types/Conversation';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';

const Home: React.FC = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<number | null>(null);

    const addMessage = (text: string) => {
        if (selectedConversation !== null) {
            const updatedConversations: Conversation[] = conversations.map((conversation) =>
            conversation.id === selectedConversation
                ? {
                    ...conversation,
                    messages: [
                    ...conversation.messages,
                    { id: conversation.messages.length + 1, text, sender: 'user' },
                    ],
                }
                : conversation
            );
            setConversations(updatedConversations);
        } else {
            const newMessage: Message = { id: 1, text, sender: 'user' };
            const newConversation: Conversation = { id: conversations.length + 1, messages: [newMessage] };
            setConversations([newConversation, ...conversations]);
            setSelectedConversation(newConversation.id);
        }

        // Add logic to send the user's message to the backend/chatbot service
        // and receive the chatbot's response.
        // Update the conversations state with the chatbot's response.
    };

    const handleConversationClick = (id: number) => {
        setSelectedConversation(id);
    };

    const createNewConversation = () => {
        const newConversation: Conversation = { id: conversations.length + 1, messages: [] };
        setConversations([newConversation, ...conversations]);
        setSelectedConversation(newConversation.id);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container style={{height:'100%'}}>
                <Grid container spacing={3} style={{height:'100%'}}>
                    <Grid item xs={3}>
                        <Sidebar
                        conversations={conversations}
                        onConversationClick={handleConversationClick}
                        createNewConversation={createNewConversation}
                        />
                    </Grid> 
                    <Grid item xs={9}>
                        <MainContent
                        selectedConversation={selectedConversation}
                        conversations={conversations}
                        addMessage={addMessage}
                        />
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default Home;
