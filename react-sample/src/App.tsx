import React from 'react';
import './App.css';
import SignIn from "./Signin";
import LoggedInView from './LoggedInView';
import { useAuth } from '@frontegg/react';

function App() {
    const { isAuthenticated, user } = useAuth();
    return (
        <div className="App">
            { isAuthenticated ?
                <LoggedInView loggedInUser={user} /> : <SignIn />
            }
        </div>
    );
}

export default App;
