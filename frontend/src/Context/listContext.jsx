import { createContext, useReducer } from "react";

export const ListContext = createContext();

export const listReducer = (listState, action) => {
    switch (action.type) {
        case "updateLists":
            return { ...listState, lists: action.payload };
        case "updateContacts":
            return { ...listState, contacts: action.payload };
        case "appendLists":
            return { ...listState, lists: [...listState.lists, ...action.payload] };
        case "appendContacts":
            return { ...listState, contacts: [...listState.contacts, ...action.payload] };
        case "updateFocus":
            return { ...listState, focus: action.payload };
        case "clearFocus":
            return { ...listState, focus: null };
        case "updateTotalContacts":
            return { ...listState, totalContacts: action.payload };
        case "clearAll":
            return { focus: null, lists: [], contacts: {}, totalContacts: 0 };
        case "updateTotalAgentsContacted":
            return { ...listState, totalAgentsContacted: action.payload };
        default:
            return listState;
    }
};

export const ListProvider = ({ children }) => {
    const [listState, listDispatch] = useReducer(listReducer, {
        focus: null,
        lists: [],
        contacts: {},
        totalContacts: 0,
        totalAgentsContacted: 0,
    });

    return (
        <ListContext.Provider value={{ listState, listDispatch }}>
            {children}
        </ListContext.Provider>
    )
};