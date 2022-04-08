import { useEffect } from "react";
import L from "leaflet";

function CloudLegend({ map, isSelected }) {
  useEffect(() => {
    let legend = L.control({ position: "bottomright" });
    if (map) {
      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "legend");
        div.innerHTML = "";
        div.innerHTML +=
          "<div class='scale-details'> \
          <div class='name'>Clouds, %</div> \
          <div class='scale-gradient' style='width: 260px;'> \
          <div class='scale-dividers'><div>0</div><div>25</div><div>50</div><div>75</div><div>100</div></div> \
          <div class='horizontal-gradient-line' style='background-image: linear-gradient(to right, rgba(247, 247, 255, 0) 0%, rgba(251, 247, 255, 0) 10%, rgba(244, 248, 255, 0.1) 20%, rgba(240, 249, 255, 0.2) 30%, rgba(221, 250, 255, 0.4) 40%, rgba(224, 224, 224, 0.9) 50%, rgba(224, 224, 224, 0.76) 60%, rgba(228, 228, 228, 0.9) 70%, rgba(232, 232, 232, 0.9) 80%, rgb(214, 213, 213) 90%, rgb(210, 210, 210) 95%, rgb(183, 183, 183) 100%);'></div></div></div>";
        return div;
      };
      
      map.on('overlayadd', function(eventLayer) {
        if(eventLayer.name === "Clouds"){
          legend.addTo(this);
        }
      });

      map.on('overlayremove', function(eventLayer) {
        if(eventLayer.name === "Clouds"){
          this.removeControl(legend)
        }
      });
    }
  }, [map, isSelected]);

  return null;
}

export default CloudLegend;
