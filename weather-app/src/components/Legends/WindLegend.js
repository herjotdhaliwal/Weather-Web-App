import { useEffect } from "react";
import L from "leaflet";

function WindLegend({ map, isSelected }) {
  useEffect(() => {
    let legend = L.control({ position: "bottomright" });
    if (map) {
      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "legend");
        div.innerHTML = "";
        div.innerHTML +=
          "<div class='scale-details'> \
          <div class='name'>Wind speed, m/s</div> \
          <div class='gradient-container'> \
          <div style='width: 260px;' class='scale-dividers'><div>0</div><div>2</div><div>3</div><div>6</div><div>12</div><div>25</div><div>50</div><div>100</div></div> \
          <div style='width: 260px; background: rgba(0, 0, 0, 0) linear-gradient(to left, rgb(158, 128, 177), rgba(116, 76, 172, 0.9), rgb(164, 123, 170), rgba(170, 128, 177, 0.84), rgba(176, 128, 177, 0.71), rgba(170, 128, 177, 0.54), rgba(170, 128, 177, 0.44), rgba(255, 255, 0, 0)) repeat scroll 0% 0%;' class='horizontal-gradient-line'></div></div></div>";
        return div;
      };
      
      map.on('overlayadd', function(eventLayer) {
        if(eventLayer.name === "Wind speed"){
          legend.addTo(this);
        }
      });

      map.on('overlayremove', function(eventLayer) {
        if(eventLayer.name === "Wind speed"){
          this.removeControl(legend)
        }
      });
    }
  }, [map, isSelected]);

  return null;
}

export default WindLegend;
