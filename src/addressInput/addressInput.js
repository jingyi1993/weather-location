import React from 'react'


const Input = (props) => {
    return (
        <input style={{
            margin: '100px',

            width: '500px',
            height: '50px',
            border: 'pink 5px solid'}}
               type="text" name='name'
               placeholder='please type in a location' value={props.value}
               onChange={props.onChange}/>
    )

};

export default Input;