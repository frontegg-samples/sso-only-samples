import React, {useEffect, useState} from 'react';
import './App.css';
import SignIn from "./Signin";
import {auth} from "./firebase";
import {User} from "firebase/auth";
import LoggedInView from './LoggedInView';

function App() {
    const [ isAuthReady, setAuthReady ] = useState<boolean>(false);
    const [ currentUser, setCurrentUser ] = useState<User | null>(null);

    useEffect(() => {
        // wait for firebase initialization to complete
        auth?.authStateReady().then(() => {
            setAuthReady(true)
        })
    }, [ setAuthReady ])

    useEffect(() => {
        if (!isAuthReady) {
            return
        }

        // subscribe to auth state changes
        auth?.onAuthStateChanged((user) => {
            setCurrentUser(user)
            console.log('onAuthStateChanged', user);
        });
    }, [isAuthReady, setCurrentUser]);

    if (!isAuthReady) {
        return <div>loading...</div>
    }

    return (
        <div className="App">
            { currentUser ?
                <LoggedInView loggedInUser={currentUser} /> : <SignIn />
            }
        </div>
    );
}

export default App;
