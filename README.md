# Leaflet-Challenge
Module 15 Mapping Challenge

This repository consists of a Leaflet-Part-1 folder which contains a static folder and index.html file. The static folder holds CSS and Javascript files.

## Leaflet-Part-1
### index.html
Run this file through terminal to load and display the interactive Leaflet map in your browser.

### static
#### css
The style.css file in this folder formats the Leaflet map and its legend.

#### js
The logic.js file in this folder uses D3 to connect to the geojson API and create the interactive Leaflet map. The color of the datapoint markers is determined by the location's depth, the size is determined by the magnitude of the earthquake, and clicking on a selected marker will produce a popup that displays the location, depth, magnitude, and time of that earthquake.