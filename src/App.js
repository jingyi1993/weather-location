import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Icon from './Icon/Icon';
import Input from './addressInput/addressInput';
import Button from './UI/Button';
import Weather from './weatherShow/weatherShow';


class App extends Component {

    state = {
        input: '',
        lat: '',
        lng: '',
        temperature:'',
        summary:'',
        loading: true,
        forecast: '',


    };

    valueChangeHandler = (event) => {


        this.setState({input: event.target.value})};

    submitLocationHandler =() =>{
        const location = this.state.input;
        console.log(location);
        const encodeAddress = encodeURIComponent(location);
        console.log(encodeAddress);
        let geocodeURL = `https://www.mapquestapi.com/geocoding/v1/address?key=moCEAVVYlYwrXPnwpARArHVTtZgkqaoy&location=${encodeAddress}`;

        axios.get(geocodeURL)
            .then((res)=>{
                if(res.data.status==='ZERO_RESULTS'){
                    throw new Error('Unable to find that address!!!')
                }
                console.log('~~~~',res.data.result);

                var lat = res.data.results[0].locations[0].latLng.lat;
                // this.setState({lat: lat});

                var lng = res.data.results[0].locations[0].latLng.lng;
                // this.setState({lng: lng});
                var address = res.data.results[0].formatted_address;
                var weatherUrl = `https://api.darksky.net/forecast/2baefed1fc393dd8598e0f8c2db15317/${lat},${lng}`;
                console.log(JSON.stringify(address));
                return axios.get(weatherUrl)
            })
            .then((res)=>{
                this.setState({loading : false});
                var summary = res.data.currently.summary;
                this.setState({summary: summary});
                var temperature = res.data.currently.temperature;
                this.setState({temperature: temperature});
                var apparentTemperature = res.data.currently.apparentTemperature;
                this.setState({apparentTemperature: apparentTemperature});
                console.log(`it is currently ${temperature}, it feels like ${apparentTemperature}`);
                let daily = res.data.daily.data;
                this.setState({forecast : daily});
            })
            .catch((e)=>{
                    if(e.code ==='ENOTFOUND'){
                        console.log("unable to connect to API servers!!!");
                    }else{
                        console.log(e.message)
                    }
                }

            );


    };




        render(){
            let imgUrl = 'images/berlin.jpg';
            // let imgUrl = 'images/berlin.jpg'
            // let styles = {
            //     root: {
            //         backgroundImage: 'url(' + imgUrl + ')',
            //         backgroundSize: 'cover',
            //         overflow: 'hidden',
            //     },
            console.log(this.state.forecast);

            let temperature = this.state.temperature;
            let apparentTemperature = this.state.apparentTemperature;
            let summary = this.state.summary;
            console.log(this.state.temperature);

            let weather = null;
            let dailyWeather;
            if(!this.state.loading){
                weather=<Weather temperature={temperature}
                                 apparentTemperature={apparentTemperature}
                                 summary ={summary}/>





            }

            if(this.state.forecast){


                 dailyWeather = this.state.forecast.slice(0,7).map(key=>{
                        return (
                            <div style={{padding: '30px'}} key={key.time}>
                                {/*<p>{}</p>*/}
                                <p>{key.humidity}</p>
                                <p>{key.icon}</p>
                            </div>
                        )
                    }

                 );
            }












            return (

                <div
                     style = {{ backgroundImage: 'url(' + imgUrl + ')',
                         backgroundSize: 'cover',
                         backgroundPosition: 'center center',
                         backgroundRepeat: 'no-repeat',
                     }}>


                    <Input onChange={this.valueChangeHandler} value={this.state.input}/>
                    <Button onClick ={this.submitLocationHandler}/>
                    {weather}
                    {/*<div style={{display: 'flex', flexDirection:'row', justifyContent:'center',}}>*/}
                    {/*<div>MON</div>*/}
                    {/*<div>MON</div>*/}
                    {/*<div>MON</div>*/}
                    {/*<div>MON</div>*/}
                    {/*<div>MON</div>*/}
                    {/*<div>MON</div>*/}
                    {/*<div>MON</div>*/}
                    {/*<div>MON</div>*/}
                    {/*</div>*/}
                    <div style={{display: 'flex', flexDirection:'row', justifyContent:'center'}}>
                    {dailyWeather}
                    </div>





                    <div>
                        <Icon/>
                    </div>
                </div>




            )
        }

}

export default App;
