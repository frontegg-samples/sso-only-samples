import {LinearProgress, Stack} from "@mui/material";
import KeyIcon from "@mui/icons-material/Key";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import * as React from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import {AdminPortal, HostedLogin, useTenantsActions} from "@frontegg/react";
import { api } from '@frontegg/rest-api';

const LoggedInView = ({ loggedInUser }: { loggedInUser: any }) => {
    const { setTenantsState } = useTenantsActions();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const configureSso = async () => {
        setIsLoading(true);
        let userDetails = { auth: { accessToken: '' }, user: {}};
        try {
            const res = await axios.post('https://demo-generate-user-session.frontegg.workers.dev/', {
                email: loggedInUser.email,
            }, {
                withCredentials: false,
            });

            userDetails = res.data;
        } catch (e) {
            console.error('failed to get user details from frontegg - ', e);
            return;
        }

        const {
            user,
            tenants,
            activeTenant
        } = await api.auth.generateLoginResponseV3({ accessToken: userDetails.auth.accessToken } as never)

        HostedLogin.setAuthentication(true, userDetails.auth.accessToken, user);
        setTenantsState({ tenants, activeTenant, loading: false, error: null })
        AdminPortal.show();
        setIsLoading(false);
    }

    if (isLoading) {
        return <LinearProgress />
    }

    return (
        <Stack>
            <h1>Logged In</h1>
            <h4>{loggedInUser?.email}</h4>
            <h4>{loggedInUser?.displayName}</h4>
            <Box>
                <Button
                    type="submit"
                    variant="contained"
                    onClick={configureSso}
                >
                    <Stack direction={'row'}>
                        <KeyIcon />
                        <Typography ml={1}>Configure SSO</Typography>
                    </Stack>
                </Button>
            </Box>
        </Stack>
    )
}

export default LoggedInView;
