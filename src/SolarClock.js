import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useState, useEffect } from 'react';
import {msecToTime} from './timeCycle.js';

var SunCalc = require('suncalc');
var SolarTimes;
var lat;
var long;


function SolarClock(){
    const [time, setTime] = useState("00:00");
    const [timeToSunset, setTimeToSunset] = useState("00:00");

    function refreshClock(){
        var timeStr = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        setTime(timeStr);
        setTimeToSunset(msecToTime(SolarTimes.sunset - new Date()));
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
                <Col><h4 class="TimeText">Sunset in {timeToSunset}</h4></Col>
            </Row>
        </Container>
    );

}

export default SolarClock;