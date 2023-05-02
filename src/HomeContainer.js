import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SolarClock from './SolarClock.js';
import LunarClock from './LunarClock.js';


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
                <Col className="Left">

                    <LunarClock />

                </Col>
                <Col xs={6} className="Mid"></Col>
                <Col className="Right">

                    <SolarClock />

                </Col>
            </Row>

        </Container>
    ); 
}
export default HomeContainer;