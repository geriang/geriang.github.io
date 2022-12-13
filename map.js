// let coordinate = [1.29050566271653, 103.822587341402]

async function initMap (){
// Initalizing Map
const singapore = [1.3521,103.8198];
const map = L.map('map').setView(singapore, 11.5);

// adding Tile Layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// adding Marker

// let changiAirport = [1.3644,103.9915];
// let marker = L.marker(changiAirport).addTo(map);

// postalCodes will eventually link with data_google.js
let postalCodes = ["159967", "560561", "018956", "390032", "249565", "310204", "640433", "698924", "529510", "520860"];
let markerClusterLayer = L.markerClusterGroup()

for (let i of postalCodes){
 let markers = await loadOneMapDataCoordinate(i)
//  L.marker(markers).addTo(map);
 let pos = markers
 L.marker(pos).addTo(markerClusterLayer)
 markerClusterLayer.addTo(map);
}


return map;
}

