import React, { useState } from 'react';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';

interface MessageInputProps {
    onSendMessage: (text: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        if (message.trim() !== '') {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <div style={{ marginTop: '16px' }}>
            <TextField
                label="Type a message"
                variant="outlined"
                fullWidth
                value={message}
                sx={{fieldset: { borderColor: '#F4EBD9 !important' }, input: {color: '#F4EBD9'}}}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                        <IconButton color="primary" onClick={sendMessage}>
                            <SendIcon />
                        </IconButton>
                        </InputAdornment>
                    ),
                    onKeyPress: (event) => {
                        if (event.key === "Enter") {
                            sendMessage()
                            event.preventDefault();
                        }
                    },  
                }}
                InputLabelProps={{style: {color: '#F4EBD9'}}}
                onChange={(e) => setMessage(e.target.value)}
                color='primary'
            />
        </div>
    );
};

export default MessageInput;
