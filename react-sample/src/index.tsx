import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {FronteggProvider} from "@frontegg/react";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const contextOptions = {
    baseUrl: 'https://app-xb660ittykkq.frontegg.com',
    clientId: '65cbf6cc-2f51-4f3a-b67b-597b926752c7'
}

root.render(
  <React.StrictMode>
      <FronteggProvider hostedLoginBox contextOptions={contextOptions} customLoginBox={true}>
          <App />
      </FronteggProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
