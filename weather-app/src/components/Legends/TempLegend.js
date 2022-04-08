import { useEffect } from "react";
import L from "leaflet";

function TempLegend({ map, isSelected }) {
  useEffect(() => {
    let legend = L.control({ position: "bottomright" });
    if (map) {
      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "legend");
        div.innerHTML = "";
        div.innerHTML +=
          "<div class='scale-details'> \
          <div class='name'>Temperature, °C</div> \
          <div class='scale-gradient' style='width: 260px'> \
          <div class='scale-dividers'><div>-40</div><div>-20</div><div>0</div><div>20</div><div>40</div></div> \
          <div class='horizontal-gradient-line' style='background-image: linear-gradient(to right, rgb(159, 85, 181) 0%, rgb(44, 106, 187) 8.75%, rgb(82, 139, 213) 12.5%, rgb(103, 163, 222) 18.75%, rgb(142, 202, 240) 25%, rgb(155, 213, 244) 31.25%, rgb(172, 225, 253) 37.5%, rgb(194, 234, 255) 43.75%, rgb(255, 255, 208) 50%, rgb(254, 248, 174) 56.25%, rgb(254, 232, 146) 62.5%, rgb(254, 226, 112) 68.75%, rgb(253, 212, 97) 75%, rgb(244, 168, 94) 82.5%, rgb(244, 129, 89) 87.5%, rgb(244, 104, 89) 93.75%, rgb(244, 76, 73) 100%);'></div> \
          </div> \
        </div>";
        return div;
      };
      
      map.on('overlayadd', function(eventLayer) {
        if(eventLayer.name === "Temperature"){
          legend.addTo(this);
        }
      });

      map.on('overlayremove', function(eventLayer) {
        if(eventLayer.name === "Temperature"){
          this.removeControl(legend)
        }
      });
    }
  }, [map, isSelected]);

  return null;
}

export default TempLegend;
