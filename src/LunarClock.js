import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useState, useEffect } from 'react';
import {msecToTime} from './timeCycle.js';

var SunCalc = require('suncalc');
var LunarIllumination;
var LunarPosition;
var LunarTimes;
var tomorrowLunarTimes;

var lat;
var long;


function LunarClock(){
    const [phase, setPhase] = useState("");
    const [fraction, setFraction] = useState(0);
    const [timeToLunarEvent, setTimeToLunarEvent] = useState("00:00");
    const [lunarEvent, setLunarEvent] = useState("");
    const [lunarDirection, setLunarDirection] = useState("");
    const [lunarAltitude, setLunarAltitude] = useState(0);

    function refreshClock(){
        LunarIllumination = SunCalc.getMoonIllumination(new Date());
        LunarTimes = SunCalc.getMoonTimes(new Date(), lat, long);
        
        LunarPosition = SunCalc.getMoonPosition(new Date(), lat, long);
        setLunarAltitude( ((LunarPosition.altitude * 180) / Math.PI).toPrecision(4));

        var degrees = (((LunarPosition.azimuth * 180) / Math.PI)+180).toPrecision(4);
        var cardinal;
        const azimuths = new Map([
            ["N", 0],
            ["NbE", 11.25],
            ["NNE", 22.50],
            ["NEbN", 33.75],
            ["NE", 45.00],
            ["NEbE", 56.25],
            ["ENE", 67.50],
            ["EbN", 78.75],
            ["E", 90.00],
            ["EbS", 101.25],
            ["ESE", 112.50],
            ["SEbE", 123.75],
            ["SE", 135.00],
            ["SEbS", 146.25],
            ["SSE", 157.50],
            ["SbE", 168.75],
            ["S", 180.00],
            ["SbW", 191.25],
            ["SSW", 202.50],
            ["SWbS", 213.75],
            ["SW", 225.00],
            ["SWbW", 236.25],
            ["WSW", 247.50],
            ["WbS", 258.75],
            ["W", 270.00],
            ["WbN", 281.25],
            ["WNW", 292.50],
            ["NWbW", 303.75],
            ["NW", 315.00],
            ["NWbN", 326.25],
            ["NNW", 337.50],
            ["NbW", 348.75],
        ]);
        if (degrees>=azimuths.get("NbW")+5){ //catching edge case
            cardinal = "N";
        }
        else{
        for (const key of azimuths.keys()) {
            if(key==="SSW"){console.log(degrees);}
            const value = azimuths.get(key);
            const upper = value + 5;
            const lower = value - 5;
            if(degrees >= lower && degrees <= upper){
                cardinal = key;
            }
          }
        }
        setLunarDirection(cardinal+"("+degrees+"°)");
    
        var phaseNum = LunarIllumination.phase;
        if(phaseNum < 0.05) { setPhase("New Moon")}

        if(phaseNum > 0.05 & phaseNum < 0.20) { setPhase("Waxing Crescent")}
        if(phaseNum > 0.20 & phaseNum < 0.30) { setPhase("First Quarter")}
        if(phaseNum > 0.30 & phaseNum < 0.45) { setPhase("Waxing Gibbous")}
        if(phaseNum > 0.45 & phaseNum < 0.55) { setPhase("Full Moon")}
        if(phaseNum > 0.55 & phaseNum < 0.70) { setPhase("Waning Gibbous")}
        if(phaseNum > 0.70 & phaseNum < 0.80) { setPhase("Last Quarter")}

        if(phaseNum > 0.80) { setPhase("Waning Crescent")}

        setFraction(LunarIllumination.fraction.toPrecision(2));

        var msecToMoonset = LunarTimes.set - new Date();
        var msecToMoonrise = LunarTimes.rise - new Date();
        if(msecToMoonrise < 0){
            msecToMoonrise = tomorrowLunarTimes.rise - new Date();
        }

        if(msecToMoonset < 0) {
            msecToMoonset = tomorrowLunarTimes.set - new Date();
        }

        if(msecToMoonrise <= msecToMoonset){
            setLunarEvent("Moonrise");
            setTimeToLunarEvent(msecToTime(msecToMoonrise));
        }
        else{
            setLunarEvent("Moonset");
            setTimeToLunarEvent(msecToTime(msecToMoonset));
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
        LunarTimes = SunCalc.getMoonTimes(new Date(), lat, long);
        tomorrowLunarTimes = SunCalc.getMoonTimes(new Date((new Date()).valueOf() + 1000*3600*24), lat, long);
        
    }

    function locationFailed(){
        alert('This page requires GeoLocation for the full experience, please enable it in your browser.');
    }


    useEffect(() => {
        const timerId = setInterval(refreshClock, 2000);
        return function cleanup() {
          clearInterval(timerId);
        };
      }, []);

    return (
        <Container id="LunarContainer" className='bubbleBox'>
            <Row>
                <Col><image id="MoonIcon" class="iconImg"></image></Col>
            </Row>

            <Row>
                <Col>
                    <h4>{phase}({fraction})</h4>
                    <h4>Altitude: {lunarAltitude}°, Direction: {lunarDirection}</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>{lunarEvent} in {timeToLunarEvent}</h4>
                </Col>
            </Row>
        </Container>
    );

}

export default LunarClock;