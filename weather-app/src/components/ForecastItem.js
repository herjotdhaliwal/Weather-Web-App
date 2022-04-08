import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Image } from "react-bootstrap";
import moment from "moment";

function ForecastItem({temp, date, icon, description}) {

    let itemDate = new Date();
    let day = date * 1000;
    itemDate.setTime(day);

    return (
        <Col>
            <Card className="forecastItem weather"> 
                <Card.Title> {moment(itemDate).format('dddd')} </Card.Title>
                <Image
                  fluid="true"
                  src={
                    "http://openweathermap.org/img/w/" + icon + ".png"
                  }
                />
                <Card.Text> {temp}°C </Card.Text>
                <Card.Body> {description} </Card.Body>
            </Card>
        </Col>
    );
}

export default ForecastItem;