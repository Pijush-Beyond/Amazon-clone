import React, { createContext, useContext,/* useReducer*/ } from 'react';

// export const StateContext = createContext();
export const ClassStateContext = createContext();
export const saveForLaterContext = React.createContext();
export const whishListContext = React.createContext();

// export const StateProvider = ({ reducer, initialState, children }) => (
//     <StateContext.Provider value={useReducer(reducer,initialState)}>
//         {children}
//     </StateContext.Provider>
// )
export const ClassStateProvider = ({ initialState,context, children })=> (
    <context.Provider  value = {initialState}>
        {children}
    </context.Provider>
)
export const useClassStateValue = () => useContext(ClassStateContext);
// export const useStateValue = () => useContext(StateContext);