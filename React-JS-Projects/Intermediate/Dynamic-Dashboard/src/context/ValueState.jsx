import { useState } from "react";
import ValueContext from "./ValueContext";

const ValueState = (props) => {
    const [globalData, setGlobalData] = useState([]);

    return (
        <ValueContext.Provider value={{globalData, setGlobalData}}>
            {props.children}
        </ValueContext.Provider>
    );
}

export default ValueState;