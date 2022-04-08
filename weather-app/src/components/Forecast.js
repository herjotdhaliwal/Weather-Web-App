import Row from "react-bootstrap/Row";
import ForecastItem from "./ForecastItem";


function Forecast({ forecast }) {

    return (
        <Row className="forecast">
            {forecast.map((weather, i) => <ForecastItem temp={weather.temp.day} date={weather.dt} icon={weather.weather[0].icon} description={weather.weather[0].description}  key={i}/>)}
        </Row>
    );
}

export default Forecast;