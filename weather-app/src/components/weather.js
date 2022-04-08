import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Forecast from "./Forecast";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

function Weather() {
  const [location, setLocation] = useState({ long: null, lat: null });
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      setLocation({
        long: position.coords.longitude,
        lat: position.coords.latitude,
      });
    });

    const getWeather = async () => {
      const reqForecastUrl =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        location.lat +
        "&lon=" +
        location.long +
        "&exclude=minutely,hourly,current,alerts&appid=30d9236e429da7a8561b9bfef3de719c&units=metric";
      const respForecast = await (await axios.get(reqForecastUrl)).data;

      const reqWeatherUrl =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        location.lat +
        "&lon=" +
        location.long +
        "&appid=30d9236e429da7a8561b9bfef3de719c&units=metric";

      const respWeather = await (await axios.get(reqWeatherUrl)).data;

      const geolocation = await (
        await axios.get(
          "https://nominatim.openstreetmap.org/reverse?lat=" +
            location.lat +
            "&lon=" +
            location.long
        )
      ).data;
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(geolocation, "text/xml");
      let city = xmlDoc.getElementsByTagName("city")[0].childNodes[0].nodeValue;
      let country =
        xmlDoc.getElementsByTagName("country")[0].childNodes[0].nodeValue;
      

      let date = new Date();
      let day = respWeather.dt * 1000
      date.setTime(day);
      setForecast(respForecast.daily);

      setWeather({
        time: date,
        temp: respWeather.main.temp,
        feels_like: respWeather.main.feels_like,
        min_temp: respWeather.main.temp_min,
        max_temp: respWeather.main.temp_max,
        humidity: respWeather.main.humidity,
        pressure: respWeather.main.pressure,
        wind_speed: respWeather.wind.speed,
        cloud_percentage: respWeather.clouds.all,
        city: city,
        country: country,
        icon: respWeather.weather[0].icon,
        description: respWeather.weather[0].description,
      });
    };

    getWeather();
  }, [location.lat, location.long]);

  return (
    <Container fluid="xxl">
      {weather && (
        <Row>
          <Col>
            <Card className="weather">
              <Card.Header as="h5"> Weather </Card.Header>
              <Card.Body>
                <Card.Title>
                  <i className="material-icons" style={{ "font-size": "20px" }}>
                    location_on
                  </i>
                  {weather.city}, {weather.country}
                </Card.Title>
                <Card.Text>
                  {moment(weather.time).format("ddd, MMMM DD, h:mm a")}
                </Card.Text>
                <Card.Text className="info">
                  <Card.Title>
                    <Image
                      src={
                        "http://openweathermap.org/img/w/" +
                        weather.icon +
                        ".png"
                      }
                    />
                    {weather.temp}°C <br />
                    {weather.description}
                  </Card.Title>
                  <Card.Text>
                    Feels like: {weather.feels_like}°C <br />
                    Max: {weather.max_temp}°C / Min: {weather.min_temp}°C
                  </Card.Text>
                </Card.Text>
                <Card.Text className="info">
                  <Card.Text>
                    Cloud Percentage {weather.cloud_percentage}% <br></br>
                    Humidity: {weather.humidity}%
                  </Card.Text>
                  <Card.Text>
                    Wind speed: {weather.wind_speed}m/s <br></br>
                    Atmospheric Pressure: {weather.pressure}hPa
                  </Card.Text>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      {forecast && <Forecast forecast={forecast} />}
    </Container>
  );
}

export default Weather;
