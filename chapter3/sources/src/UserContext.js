import React from 'react'

const UserContext = React.createContext('몰라요');

export const UserContextProvider  = UserContext.Provider;
export const UserContextConsumer  = UserContext.Consumer;
