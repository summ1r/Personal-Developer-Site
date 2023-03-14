import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import timeNow from './timeCycle.js';
var SunCalc = require('suncalc');


var Time = "";
Time = timeNow(Time);
var SolarTimes;
var lat;
var long;
var timeToSunset;

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

    var msec = SolarTimes.sunset - new Date();
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    timeToSunset = (hh + ":" + mm);

}

function locationFailed(){
    alert('This page requires GeoLocation for the full experience, please enable it in your browser.');
}


function HomeContainer(){
    return (
        <Container className ="HomeContainer">
            <Row className="HeightTop">
                <Col className="Left"></Col>
                <Col xs={6} className="Mid"></Col>
                <Col className="Right"></Col> 
            </Row>
            <Row className="HeightMid">
                <Col className="Mid"> 
                    <Container id="CenterContainer">
                        <Row><h1 id="Name">Summer Marshall - Software developer</h1></Row>
                        <Row>
                            <Col><a href="https://github.com/summ1r" target="_blank" rel="noreferrer">
                        <button class="Icon"><image id="GithubIcon" class="iconImg"></image> </button></a></Col>
                            <Col><a href="https://www.linkedin.com/in/summer-marshall-852620205/" target="_blank" rel="noreferrer">
                        <button class="Icon"><image id="LinkedInIcon" class="iconImg"></image> </button></a></Col>
                            <Col> <a href="https://github.com/summ1r/Personal-Developer-Site" target="_blank" rel="noreferrer">
                        <button class="Icon"><image id="RepoIcon" class="iconImg"></image> </button></a></Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
            <Row className="HeightBot">
                <Col className="Left"></Col>
                <Col xs={6} className="Mid"></Col>
                <Col className="Right">
                    <Container id="SolarContainer" className='bubbleBox'>
                        <Row>
                            <Col><image id="SunIcon" class="iconImg"></image></Col>
                        </Row>

                        <Row>
                            <Col><h1 class="TimeText" id="time"> {Time} </h1></Col>
                        </Row>
                        <Row>
                            <Col><h4 class="TimeText">Sunset in {timeToSunset}</h4></Col>
                        </Row> 

                    </Container>

                </Col>
            </Row>

        </Container>
    ); 
}
export default HomeContainer;