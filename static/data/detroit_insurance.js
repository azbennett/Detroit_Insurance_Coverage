// Creating the map object
let myMap = L.map("map", {
  center: [42.4974671, -83.2031706],
  zoom: 10
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//location of our geojson
let url = "https://data.ferndalemi.gov/datasets/D3::healthinsurancecoverage-1.geojson?outSR=%7B%22latestWkid%22%3A2898%2C%22wkid%22%3A2898%7D";

//grab the CSV
d3.csv("https://azbennett.github.io/group_project_3/static/data/usa_zipcode_of_mi-1539j.csv").then(function(csvData) {
  //store the csv
  let zipcodeData = csvData;
  
  console.log("zip code data import:");
  console.log(zipcodeData);
  
  fetchDataAndProcess(zipcodeData);
});


function createLegend() {
  const legend = L.control({ position: 'bottomright' });

  legend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info legend');
    const opacityValues = [0.01, 0.9];
    const labels = [];

    const lowestOpacity = opacityValues[0];
    const highestOpacity = opacityValues[opacityValues.length];

    const lowestLabel = 'Least Insured';
    const highestLabel = 'Highest Insured Rate';

    labels.push(`<i style="background-color: blue; opacity: ${highestOpacity + 0.2};"></i> ${highestLabel}`);
    labels.push(`<i style="background-color: blue; opacity: ${lowestOpacity + 0.2};"></i> ${lowestLabel}`);

    div.innerHTML = labels.join('<br>');
    return div;
  };

  legend.addTo(myMap);
}

function fetchDataAndProcess(zipcodeData) {
  d3.json(url).then(function(geojsonData) {
    
    console.log("Geojson import: ");
    console.log(geojsonData);
    
    function opacitypct(data){ 
     if (data > .95)
        return .9
      else if (data > .90)
        return .75
      else if (data > .85)
        return .6
      else if (data > .80)
        return .45
      else if (data > .75)
        return .3
      else if (data > .70)
        return .15
        else return .01
    }

    L.geoJson(geojsonData, {
        style: function(feature) {
          return {
            color: "white",
            fillColor: "blue",
            fillOpacity: opacitypct(feature.properties.Pct_Insured),
            weight: 1.5
          };
        },
        onEachFeature: function(feature, layer) {
          let geoid10 = feature.properties.GEOID10;
          //console.log("Grabbing geoid10: ", geoid10);
          
          let zipCode = geoid10.substring(2); // Extract the last 5 digits
          //console.log("Grabbing zipcode last 5 from geoid10: ", zipCode);
          
          let matchingZip = zipcodeData.find(function(zip) {
            return zip.zip === zipCode;
          });
          
          //console.log("What did the zip find?: ", matchingZip);
  
          if (matchingZip) {
            let popupContent = `
              City: ${matchingZip["City"]}<br>
              County: ${matchingZip["County Name"]}<br>
              Total Civilian Population: ${feature.properties.TotalCivilianPop}<br>
              With Health Insurance: ${feature.properties.WithHealthInsurance}<br>
              No Health Insurance: ${feature.properties.NoHealthInsurance}<br>
              Percentage Insured: ${feature.properties.Pct_Insured}<br>
              With Insurance Under 18: ${feature.properties.WithInsurance_U18}<br>
              No Insurance Under 18: ${feature.properties.NoInsurance_U18}<br>
              Percentage Insured Under 18: ${feature.properties.Pct_Insured_U18}
            `;
            layer.bindPopup(popupContent);
            
          }
        }
      }).addTo(myMap);
    });
  }

  createLegend();