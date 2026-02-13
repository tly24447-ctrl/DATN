import React from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";

const DefaultCompnent = ({children}) => {
    return (
        <div>
            <HeaderComponent/>
            {children}
        </div>
    )
}

export default DefaultCompnent