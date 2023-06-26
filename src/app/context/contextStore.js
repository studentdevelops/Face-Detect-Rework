'use client';

import { createContext, useContext, useState } from "react";

const UserContext = createContext({})

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [userId, setUserId] = useState();
    const [count, setCount] = useState(0);
    return (
        <UserContext.Provider value={{ user, setUser, userId, setUserId, count, setCount }}>
            {children}
        </UserContext.Provider>
    )
};

export const useUserContext = () => useContext(UserContext);