import { useEffect } from "react";
import L from "leaflet";

function PressureLegend({ map, isSelected }) {
  useEffect(() => {
    let legend = L.control({ position: "bottomright" });
    if (map) {
      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "legend");
        div.innerHTML = "";
        div.innerHTML +=
          "<div class='scale-details'> \
          <div class='name'>Pressure, hPa</div> \
          <div class='scale-gradient' style='width: 260px;'> \
          <div class='scale-dividers'><div>950</div><div>980</div><div>1010</div><div>1040</div><div>1070</div></div> \
          <div class='horizontal-gradient-line' style='background-image: linear-gradient(to right, rgb(0, 115, 255) 0%, rgb(0, 170, 255) 8.35059%, rgb(75, 208, 214) 24.9192%, rgb(141, 231, 199) 41.4879%, rgb(176, 247, 32) 49.7722%, rgb(240, 184, 0) 58.0565%, rgb(251, 85, 21) 74.6251%, rgb(243, 54, 59) 91.1938%, rgb(198, 0, 0) 100%);'></div></div></div>";
        return div;
      };
      
      map.on('overlayadd', function(eventLayer) {
        if(eventLayer.name === "Sea level pressure"){
          legend.addTo(this);
        }
      });

      map.on('overlayremove', function(eventLayer) {
        if(eventLayer.name === "Sea level pressure"){
          this.removeControl(legend)
        }
      });
    }
  }, [map, isSelected]);

  return null;
}

export default PressureLegend;
