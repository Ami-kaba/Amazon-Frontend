import React,{createContext, useReducer} from "react";


export const DataContext = createContext()

export const DataProvider = ({children, reducer, initailState})=>{
    return(
        <DataContext.Provider value={useReducer(reducer, initailState)}>
            {children}
        </DataContext.Provider>
    )
}