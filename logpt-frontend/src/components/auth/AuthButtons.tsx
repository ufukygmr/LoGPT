import React, { useState } from 'react';
import RegisterButton from './RegisterButton';
import SignInButton from './SignInButton';
import { Stack, Typography } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from '../../firebase/firebase';


const AuthButtons: React.FC = () => {
    const [name, setName] = useState<string | null>("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setIsLoggedIn(true);
            // setName(user.providerData[0].displayName);
        } else {
            setIsLoggedIn(false);
        }
    });

    return (
        <>
            <Stack direction="row" spacing={2} style={{margin: '16px'}}>
                {isLoggedIn ? (
                    <>
                        <Typography variant="body1" style={{color: '#F4EBD9'}}>Welcome {name}!</Typography>
                    </>
                ) : (
                    <>
                        <SignInButton/>
                        <RegisterButton/>
                    </>
                )}
            </Stack>
        </>
    )
}

export default AuthButtons;
