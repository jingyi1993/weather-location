import React from 'react'


const Button = (props) => {
    return(
        <button style={{
            marginLeft:'300px',

            border: 'none',
            color: 'pink',
            outline: 'none',
            cursor: 'pointer',
            font: 'inherit',
            padding: '10px',

            fontWeight: 'bold'}} onClick={props.onClick}> submit</button>
    )}

;

export default Button;