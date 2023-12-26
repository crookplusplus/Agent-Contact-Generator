import { createContext, useReducer } from "react";

export const AuthUserContext = createContext();

export const authUserReducer = (userState, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...userState, token: action.payload };
        case "LOGOUT":
            return { ...userState, token: null };
        default:
            return userState;
    }
};

export const AuthUserProvider = ({ children }) => {
    const [userState, userDispatch] = useReducer(authUserReducer, {
        user: null,
    });

    return (
        <AuthUserContext.Provider value={{ userState, userDispatch }}>
            {children}
        </AuthUserContext.Provider>
    )
};