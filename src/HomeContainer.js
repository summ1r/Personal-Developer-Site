import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function HomeContainer(){
    return (
        <Container className ="HomeContainer">
            <Row className="HeightTop">
                <Col className="Left">          1</Col>
                <Col xs={6} className="Mid">   2</Col>
                <Col className="Right">         3</Col> 
            </Row>
            <Row className="HeightMid">
                <Col className="Left">  4</Col>
                <Col xs={6} className="Mid">   5</Col>
                <Col className="Right"> 6</Col>
            </Row>
            <Row className="HeightBot">
                <Col className="Left">  7</Col>
                <Col xs={6} className="Mid">   8</Col>
                <Col className="Right"> 9</Col>
            </Row>

        </Container>
    ); 
}
export default HomeContainer;