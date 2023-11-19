import React from 'react';
import { Typography } from '@mui/material';

interface MessageProps {
  text: string;
  sender: string;
}

const MessageBox: React.FC<MessageProps> = ({ text, sender }) => {
  return (
    <div
      style={{
        marginBottom: '8px',
        textAlign: sender === 'user' ? 'right' : 'left',
      }}
    >
      <Typography
        variant="body1"
        style={{
          background: sender === 'user' ? '#f1ecce' : '#38aecc',
          color: sender === 'user' ? '#3a506b' : '#f4ebd9',
          padding: '10px',
          borderRadius: '10px',
          display: 'inline-block',
        }}
      >
        {text}
      </Typography>
    </div>
  );
};

export default MessageBox;
