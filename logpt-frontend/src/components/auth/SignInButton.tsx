import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../../firebase/firebase';

const SignInButton: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSignIn = () => {
        const auth = getAuth(firebaseApp);
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                handleCloseDialog()
            })
            .catch(() => {}
        );
    }

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleOpenDialog}>Sign In</Button>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>Sign In</DialogTitle>
            <DialogContent>
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={handleSignIn}>Sign In</Button>
            </DialogActions>
            </Dialog>
        </>
    );
};

export default SignInButton;
