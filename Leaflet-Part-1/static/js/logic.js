// Creating the map object
let myMap = L.map("map", {
    center: [40.7587, -111.8761],
    zoom: 5
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// Link to GeoJSON data
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// Get the data 
d3.json(link).then(function(data) {

    // Function to determine marker size based on magnitude
    function markerSize(magnitude) {
        return magnitude * 4;
    };

    // Function to determine marker color based on depth
    function chooseColor(depth) {
        if (depth >= 90) return "#d41538"; // 90+
        else if (depth >= 70) return "#f77c4f"; // 70-90
        else if (depth >= 50) return "#fa9f02"; // 50-70
        else if (depth >= 30) return "#faeb16"; // 30-50
        else if (depth >= 10) return "#aafa16"; // 10-30
        else return "#07f51f"; // < 10
    };

    // Function to use for circle markers
    function markerStyle(feature) {
        return {
            color: "#0a0a0a",
            fillColor: chooseColor(feature.geometry.coordinates[2]),
            fillOpacity: 0.9,
            weight: 0.5,
            radius: markerSize(feature.properties.mag)
        }
    };
    
    // Function for marker popups
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h2>${feature.properties.place}</h2><hr><p>Magnitude: ${feature.properties.mag}<br> Depth: ${feature.geometry.coordinates[2]}<br>${new Date(feature.properties.time)}</p>`);
    };

    // Create a GeoJSON layer
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: markerStyle,
        onEachFeature: onEachFeature
    }).addTo(myMap);

    // Set up the legend
    let legend = L.control({position: "bottomright"});
    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");
        let depthLevels = [-10, 10, 30, 50, 70, 90];
        let labels = []

        div.innerHTML += "<h2> Depth (Location) </h2>";

        for (var i = 0; i < depthLevels.length; i++) {
            labels.push(
                "<li style=\"background-color: " + chooseColor(depthLevels[i]) + 
                "\"></li> " + depthLevels[i] + (depthLevels[i+1] ? "&ndash;" + depthLevels[i+1] + "<br>" : "+")
            );
        };

        div.innerHTML += "<ul>" + labels.join("") + "</ul>";

        return div;
    };

    // Add legend to the map
    legend.addTo(myMap);
});
