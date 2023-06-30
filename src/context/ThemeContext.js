import React, { createContext, useContext, useState } from 'react'


const ThemeSytles = {
    dark:{
        background: "#1b1b1b",
        textColor : "white"
    },
    light:{
        background: "white",
        textColor: "black" 
    }
}

const ThemeContext = createContext();


export const ThemeProvider = ({children}) =>{
    const [Theme, SetTheme] = useState('light');
    const ThemeHandler = () => (console.log("entro",ThemeSytles[Theme]),Theme === 'light' ? SetTheme('dark'): SetTheme('light'));
    
    return (
        <ThemeContext.Provider value={{Theme1: ThemeSytles[Theme],ThemeHandler,Theme}}> 
            {children}
        </ThemeContext.Provider>
    )
}
export const UseTheme = () => (useContext(ThemeContext));

