
var apiKey = "pk.eyJ1IjoicGFibG92YWxlbmNpYSIsImEiOiJjazkzaDJkYTUwMW1kM2VxZWFtbGJxN3FwIn0.30VK38Gd_MXrbp4HjeBRgg";

var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: apiKey
});

// We create the map object with options.
var map = L.map("mapid", {
  center: [41.2524, -95.9980],
  zoom: 5
});

// Then we add our 'graymap' tile layer to the map.
graymap.addTo(map);


// Here we make an AJAX call that retrieves our earthquake geoJSON data.
var eart_data = d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson", function(data) {

 // Function to determine marker size based on population
function markerSize(magnitud) {
  return magnitud;
}

  L.geoJson(data, {
  
   pointToLayer: function(feature, latlng) {
                 return new L.CircleMarker(
                   latlng, 
                   {opacity: 1},
                   {radius: markerSize(feature.properties.mag)},
                   
                 )},
               
                
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place+ "<br>Title: " + feature.properties.title);
    }
  }).addTo(map);

});
  
  
  
