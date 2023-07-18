// Creating the map object
let myMap = L.map("map", {
  center: [42.3534671, -83.2031706],
  zoom: 11
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get the GeoJSON data.
let link = "https://data.ferndalemi.gov/datasets/D3::healthinsurancecoverage-1.geojson?outSR=%7B%22latestWkid%22%3A2898%2C%22wkid%22%3A2898%7D";

// Getting our GeoJSON data
d3.json(link).then(function(data) {
  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data).addTo(myMap);
});
