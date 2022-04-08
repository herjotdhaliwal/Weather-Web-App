import { useEffect } from "react";
import L from "leaflet";

function PreLegend({ map, isSelected }) {
  useEffect(() => {
    let legend = L.control({ position: "bottomright" });
    if (map) {
      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "legend");
        div.innerHTML = "";
        div.innerHTML +=
          "<div class='scale-details'> \
          <div class='name'>Precipitation, mm/h</div> \
          <div class='gradient-container'> \
          <div style='width: 260px;' class='scale-dividers'><div>0</div><div>0.5</div><div>1</div><div>2</div><div>4</div><div>6</div><div>7</div><div>10</div><div>12</div><div>14</div><div>16</div><div>24</div><div>32</div><div>60</div></div>\
          <div style='width: 260px; background: rgba(0, 0, 0, 0) linear-gradient(to left, rgb(170, 43, 195), rgb(255, 0, 146), rgb(255, 0, 100), rgb(255, 0, 0), rgb(255, 91, 0), rgb(255, 150, 0), rgb(255, 205, 0), rgb(239, 248, 0), rgb(0, 70, 0), rgb(0, 90, 0), rgb(0, 160, 0), rgb(0, 211, 0), rgb(0, 250, 100), rgba(0, 0, 0, 0)) repeat scroll 0% 0%;' class='horizontal-gradient-line'></div></div></div>";
        return div;
      };
      
      map.on('overlayadd', function(eventLayer) {
        if(eventLayer.name === "Precipitation"){
          legend.addTo(this);
        }
      });

      map.on('overlayremove', function(eventLayer) {
        if(eventLayer.name === "Precipitation"){
          this.removeControl(legend)
        }
      });
    }
  }, [map, isSelected]);

  return null;
}

export default PreLegend;
