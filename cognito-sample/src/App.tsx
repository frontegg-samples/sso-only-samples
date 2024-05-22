import './App.css';
import React from  'react';
import '@aws-amplify/ui-react/styles.css';
import { useAuth, useLoginWithRedirect } from "@frontegg/react";
import { Authenticator, View, Button, useAuthenticator } from '@aws-amplify/ui-react';


const components = {
    SignIn: {
        Footer() {
            const { toForgotPassword } = useAuthenticator();
            const loginWithRedirect = useLoginWithRedirect();

            const loginWithSso = async () => {
                console.log('loginWithSso');
                loginWithRedirect( {
                    login_hint: 'user@acme.com',
                    prompt: 'login'
                });
            }

            return (
                <div>
                <View textAlign="center">
                    <Button fontWeight="normal" onClick={toForgotPassword} size="small" variation="link">
                        Reset Password
                    </Button>
                </View>
                 <View textAlign="center">
                     <Button fontWeight="normal" onClick={() => loginWithSso()} size="small" variation="link">
                        Login with SSO
                     </Button>
                </View>
                </div>
            );
        },
    }
};
function App() {
    const { isAuthenticated, user } = useAuth();
    console.log('isAuthenticated', isAuthenticated);
    console.log('user', user);

    if (isAuthenticated) {
        return (
            <div>
                <h1>Welcome SSO user {user?.email}</h1>
            </div>
        );
    }

  return (
      <Authenticator hideSignUp socialProviders={["google"]} components={components}>
        {({ signOut, user }) => (
            <div>
              <p>Welcome {user?.username}</p>
              <button onClick={signOut}>Sign out</button>
            </div>
        )}
      </Authenticator>
  );
}

export default App;
