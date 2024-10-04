import { createContext, useContext, useState } from "react";
import { themeOptions } from "../utils/themeOptions";

const ThemeContext = createContext();

export const ThemeContextProvider = ({children}) => {
    const defaultValue = JSON.parse(localStorage.getItem('theme')) || {label:"Plain Dark", background:"black", title:"white", typeBoxText:"grey"};
    const [theme, setTheme] = useState(defaultValue);
    const values = {
        theme, 
        setTheme,
    }

    return (<ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>)
}

export const useTheme = () => useContext(ThemeContext);