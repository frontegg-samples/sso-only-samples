import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import {FronteggProvider} from "@frontegg/react";

Amplify.configure({
    Auth: {
        // oauth: {
        //     domain: 'sso-sample-pool.auth.us-east-1.amazoncognito.com',
        //     scopes: ['openid', 'email', 'profile'],
        //     redirectSignIn: ['http://localhost:3000'],
        //     redirectSignOut: ['http://localhost:3000'],
        //     responseType: 'code',
        // },
        Cognito: {
            userPoolId: awsExports.USER_POOL_ID,
            userPoolClientId: awsExports.USER_POOL_APP_CLIENT_ID,
            // loginWith: {
            //     oauth: {
            //         domain: 'sso-sample-pool.auth.us-east-1.amazoncognito.com',
            //         scopes: ['openid', 'email', 'profile'],
            //         redirectSignIn: ['http://localhost:3000'],
            //         redirectSignOut: ['http://localhost:3000'],
            //         responseType: 'code',
            //     },
            // }
        },
    }
})

const contextOptions = {
    baseUrl: 'https://app-xb660ittykkq.frontegg.com',
    clientId: '65cbf6cc-2f51-4f3a-b67b-597b926752c7'
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <FronteggProvider contextOptions={contextOptions} hostedLoginBox={true}>
      <App />
  </FronteggProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
