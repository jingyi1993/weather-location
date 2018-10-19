import React from 'react'


const Weather = (props) => {
    return(
        <div>
        <p style={{
            marginLeft: '200px',
            fontFamily: 'monospace',
            fontSize: 'x-large',
            color: 'wheat'}}>
            it is currently {props.temperature} 。F
        </p>
        <p style={{
        marginLeft: '200px',
            fontFamily: 'monospace',
            fontSize: 'x-large',
            color: 'wheat'}}>
    it feels like {props.apparentTemperature} 。F
    </p>
        </div>



)
};

export default Weather;