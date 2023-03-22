
import React from "react";

export default function UseRef( Component ){
    return React.forwardRef(function( props , ref ){
        return <Component forwardRef={ref} {...props}/>
    });
};