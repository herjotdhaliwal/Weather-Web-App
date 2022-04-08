import React from "react";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import TempLegend from "./Legends/TempLegend";
import CloudLegend from "./Legends/CloudLegend";
import PreLegend from "./Legends/PreLegend";
import PressureLegend from "./Legends/PressureLegend";
import WindLegend from "./Legends/WindLegend";
import { useState } from "react";

const center = [43.6532, -79.3832];

function WeatherMap() {
  const [map, setMap] = useState(null);

  return (
    <MapContainer center={center} zoom={7} whenCreated={setMap}>
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="BaseMap">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay name="Clouds">
          <TileLayer url="https://tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png?appid=30d9236e429da7a8561b9bfef3de719c" />
          <CloudLegend map={map}/>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Precipitation">
          <TileLayer url="https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=30d9236e429da7a8561b9bfef3de719c" />
          <PreLegend map={map} />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Sea level pressure">
          <TileLayer url="https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=30d9236e429da7a8561b9bfef3de719c" />
          <PressureLegend map={map}/>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Wind speed">
          <TileLayer url="https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=30d9236e429da7a8561b9bfef3de719c" />
          <WindLegend map={map} />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Temperature">
          <TileLayer
            url="https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=30d9236e429da7a8561b9bfef3de719c"
            eventHandlers={{
              add: (e) => {
                // setTempLayer(true);
              },
              remove: (e) => {
                // setTempLayer(false);
              },
            }}
          />
          <TempLegend map={map} />
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
}

export default WeatherMap;
