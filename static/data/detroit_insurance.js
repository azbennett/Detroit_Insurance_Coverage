// Creating the map object centered around Detroit, MI
let myMap = L.map("map", {
  center: [42.4974671, -83.2031706],
  zoom: 10
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//grab the CSV to import the City and County names to use for our GeoID10 vs Zip values later
d3.csv("https://azbennett.github.io/Detroit_Insurance_Coverage/live/static/data/usa_zipcode_of_mi-1539j.csv").then(function(csvData) {
  //store the csv
  let zipcodeData = csvData;
  
  //console.log("zip code data import:");
  //console.log(zipcodeData);
  
  fetchDataAndProcess(zipcodeData);
});

//inserts our legend with opacity scale + text
function createLegend() {
  const legend = L.control({ position: 'bottomright' });

  legend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info legend');
    const opacityValues = [0.9, 0.75, 0.6, 0.45, 0.30, 0.01];
    const opacityNames = ['95% or greater', '94-90%', '89-85%', '84-80%', '79-75%', '70% or below'];
    const labels = [];

    labels.push('<b> % of insured:</b>' );

    for (let i = 0; i < opacityValues.length; i++) {
      const opacity = opacityValues[i];
      const opacityName = opacityNames[i];
      const nextOpacity = opacityValues[i];
      const label = `${(opacityName)}`;
      labels.push(
        `<i style="background-color: blue; opacity: ${opacity + 0.2};"></i> ${label}`
      );
    }

    div.innerHTML = labels.join('<br>');
    return div;
  };

  legend.addTo(myMap);
}

//grabs our data from our MongoDB Web Flask with d3.json and processes it
function fetchDataAndProcess(zipcodeData) {
  d3.json('/api/data').then(function(geojsonData) {
    
    //console.log("Geojson import: ");
    //console.log(geojsonData);
    
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

          //boolean check if the geoid10 'zipcode' is matching something in our CSV  zipcodeData
          if (matchingZip) {
            let popupContent = `<b>
              City: ${matchingZip["City"]}<br>
              County: ${matchingZip["County Name"]}<br>
              Total Civilian Population: ${feature.properties.TotalCivilianPop}<br>
              With Health Insurance: ${feature.properties.WithHealthInsurance}<br>
              No Health Insurance: ${feature.properties.NoHealthInsurance}<br>
              Percentage Insured: ${feature.properties.Pct_Insured}<br></b>
            `;
            layer.bindPopup(popupContent);
            
          }
        }
      }).addTo(myMap);
    });
  }

  createLegend();

  /* City: ${matchingZip["City"]}<br>
  County: ${matchingZip["County Name"]}<br>
  Total Civilian Population: ${feature.properties.TotalCivilianPop}<br>
  With Health Insurance: ${feature.properties.WithHealthInsurance}<br>
  No Health Insurance: ${feature.properties.NoHealthInsurance}<br>
  Percentage Insured: ${feature.properties.Pct_Insured}<br>
  With Insurance Under 18: ${feature.properties.WithInsurance_U18}<br>
  No Insurance Under 18: ${feature.properties.NoInsurance_U18}<br>
  Percentage Insured Under 18: ${feature.properties.Pct_Insured_U18} */