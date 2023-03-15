import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useState, useEffect } from 'react';
import {msecToTime} from './timeCycle.js';

var SunCalc = require('suncalc');
var SolarTimes;
var TomorrowSolarTimes;
var lat;
var long;


function SolarClock(){
    const [time, setTime] = useState("00:00");
    const [timeToSolarEvent, setTimeToSolarEvent] = useState("00:00");
    const [solarEvent, setSolarEvent] = useState("Sunset");

    function refreshClock(){
        var timeStr = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        setTime(timeStr);

        var msecToSunset = SolarTimes.sunset - new Date();
        if(msecToSunset < 0) {
            setSolarEvent("Sunrise");
            var msecToSunrise = TomorrowSolarTimes.sunrise - new Date();
            setTimeToSolarEvent(msecToTime(msecToSunrise));
        }
        else{
            setSolarEvent("Sunset");
            setTimeToSolarEvent(msecToTime(msecToSunset));
        }
    }

    

    /* Will Prompt user to enable location services */
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationSuccess, locationFailed);
    } else {
        alert('This page requires GeoLocation, please enable it in your browser.');
    }


        /* If accepted */
    function locationSuccess(pos){
        lat = pos.coords.latitude;
        long = pos.coords.longitude;
        SolarTimes = SunCalc.getTimes(new Date(), lat, long);
        TomorrowSolarTimes = SunCalc.getTimes(new Date((new Date()).valueOf() + 1000*3600*24), lat, long)
    }

    function locationFailed(){
        alert('This page requires GeoLocation for the full experience, please enable it in your browser.');
    }


    useEffect(() => {
        const timerId = setInterval(refreshClock, 1000);
        return function cleanup() {
          clearInterval(timerId);
        };
      }, []);

    return (
        <Container id="SolarContainer" className='bubbleBox'>
            <Row>
                <Col><image id="SunIcon" class="iconImg"></image></Col>
            </Row>

            <Row>
                <Col><h1 class="TimeText" id="time"> {time} </h1></Col>
            </Row>
            <Row>
                <Col><h4 class="TimeText">{solarEvent} in {timeToSolarEvent}</h4></Col>
            </Row>
        </Container>
    );

}

export default SolarClock;