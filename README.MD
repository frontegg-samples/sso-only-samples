# Developer Guide: Adding SSO to Your Existing Authentication Solution

In this guide, we will walk you through adding Single Sign-On (SSO) to your existing authentication solution using Front egg. We will assume that you have a React application with an existing authentication setup.

White this guide is specific to React, you can use the same steps to add SSO to your Angular, Vue, or any other front-end application.

## Step 1: Open an Account in Frontegg

1. **Sign Up**: Visit [Frontegg](https://portal.frontegg.com) and sign up for an account.
2. **Create a Workspace**: After signing up, create a workspace for your application.

## Step 2: Configure the SSO Builder in Frontegg
Log in to the Frontegg management portal and navigate to the login builder. Turn on SAML and OIDC and turn off all other authentication methods

## Step 3: Add Frontegg React SDK to Your Application
Install the Frontegg React SDK in your React application.
```bash
npm install @frontegg/react
```

## Step 3: Integrate Frontegg React SDK with Your Application
Integrate the Frontegg React SDK with your application. You can find the detailed steps in the [Frontegg React SDK documentation](https://docs.frontegg.com/docs/react/introduction).

```javascript
import { FronteggProvider } from '@frontegg/react';

const contextOptions = {
    baseUrl: 'https://[YOUR_SUBDOMAIN].frontegg.com',
    clientId: '[YOUR_CLIENT_ID]',
};

const authOptions = {
    // keepSessionAlive: true // Uncomment this in order to maintain the session alive
};

function App() {
  return (
    <FronteggProvider contextOptions={contextOptions} authOptions={authOptions} hostedLoginBox>
      {/* Your app components */}
    </FronteggProvider>
  );
}

export default App;

```

## Step 4: Add SSO Button to Your Application
On the relevant page in your application, add a button that will trigger the SSO login flow.

```javascript
import { useAuth, useLoginWithRedirect, ContextHolder } from "@frontegg/react";

function LoginButton() {
  const loginWithRedirect = useLoginWithRedirect();

  const handleLogin = () => {
    loginWithRedirect();
  };

  return <button onClick={handleLogin}>Login with SSO</button>;
}

export default LoginButton;
```

## Step 5: Getting the logged-in user from frontegg
In order to get the logged-in user from frontegg you can use the `useAuth` hook.

```javascript
import { useAuth } from "@frontegg/react";

function LoggedInUser() {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Not logged in</div>;
  }

  return <div>{user?.email}</div>;
}
```

## Step 6: Test the SSO Flow
Run your application and test the SSO flow by clicking the SSO button you added in Step 4.
The user should be redirected to the Frontegg login page, where they can log in using SSO.

Any questions? Feel free to reach out to us at [Frontegg Community](https://join.slack.com/t/frontegg-community/shared_invite/zt-e1oxi1vn-SZErBZcwHcbgj4vrwRIp5A).
