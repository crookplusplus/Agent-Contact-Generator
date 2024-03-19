import { createContext, useReducer } from "react";

export const AuthUserContext = createContext();

export const authUserReducer = (userState, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...userState, token: action.payload.token, username: action.payload.username, credits: null };
        case "LOGOUT":
            return { ...userState, token: null, username: null, credits: null};
        case "CREDITS":
            return { ...userState, credits: action.payload.credits };
        default:
            return userState;
    }
};

export const AuthUserProvider = ({ children }) => {
    const [userState, userDispatch] = useReducer(authUserReducer, {
        token: null,
        username: null,
        credits: null,
    });

    return (
        <AuthUserContext.Provider value={{ userState, userDispatch }}>
            {children}
        </AuthUserContext.Provider>
    )
};