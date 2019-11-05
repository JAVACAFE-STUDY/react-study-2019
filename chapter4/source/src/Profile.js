import React from 'react';
import Greeting from './Greeting';
import { UserContextProvider } from './UserContext'

export default function Profile() {
    return (
        <div>
            <UserContextProvider value="wdwdwd">
                <Greeting />
            </UserContextProvider>
        </div>
    )
}