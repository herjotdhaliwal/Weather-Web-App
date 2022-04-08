import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navigation from "./components/Nav";
import Weather from "./components/weather.js";
import WeatherMap from "./components/Map.js";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Helmet from "react-helmet";

function App() {
  return (
    <div className="App">
      <Helmet>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossorigin=""
        />

        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />

        <script
          src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
          integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
          crossorigin=""
        ></script>
      </Helmet>
      <Navigation />
      <Router>
        <Routes>
          <Route path="/" element={<Weather />} />
          <Route path="/map" element={<WeatherMap />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
