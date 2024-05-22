import * as React from 'react';
import {useCallback } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import KeyIcon from '@mui/icons-material/Key';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Stack} from "@mui/material";
import {signInWithEmailAndPassword, getAuth, signInWithPopup, signInWithRedirect, OAuthProvider} from "firebase/auth";
import {auth, googleProvider} from "./firebase";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const authProvider = new OAuthProvider('oidc.frontegg');

export default function SignIn() {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const email = data.get('email')?.toString() || '';
        const password = data.get('password')?.toString() || '';

        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (e) {
            console.error(e);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth,googleProvider);
        } catch (err){
            console.error(err);
        }
    };

    const signInWithSso = useCallback(() => {
        authProvider.addScope('openid');
        authProvider.addScope('profile');
        authProvider.addScope('email');

        authProvider.setCustomParameters({
            prompt: 'login',
            login_hint: 'roy@acme.com'
        });

        signInWithRedirect(getAuth(), authProvider).then(() => {
            console.log('navigate to frontegg login page')
        }).catch(error => {
            console.error('failed to signIn with redirect', error)
        })
    }, [])

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mb: 2 }}
                            onClick={signInWithGoogle}
                        >
                            <Stack direction={'row'}>
                                <GoogleIcon />
                                <Typography ml={1}>Login with Google</Typography>
                            </Stack>
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={signInWithSso}
                        >
                            <Stack direction={'row'}>
                                <KeyIcon />
                                <Typography ml={1}>Login with SSO</Typography>
                            </Stack>
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
