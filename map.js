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

let changiAirport = [1.3644,103.9915];
let marker = L.marker(changiAirport).addTo(map);

// await loadOneMapData()
// L.marker(coordinate).addTo(map)

// console.log("this is the coordinate var", coordinate)


// Create cluster
// function getRandomLatLng(map) {
//     // get the boundaries of the map
//     let bounds = map.getBounds();
//     let southWest = bounds.getSouthWest();
//     let northEast = bounds.getNorthEast();
//     let lngSpan = northEast.lng - southWest.lng;
//     let latSpan = northEast.lat - southWest.lat;

//     let randomLng = Math.random() * lngSpan + southWest.lng;
//     let randomLat = Math.random() * latSpan + southWest.lat;

//     return [ randomLat, randomLng,];
// }


// // create marker cluster
// let markerClusterLayer = L.markerClusterGroup();

// for (let i = 0; i < 1000; i++) {
//     let pos = getRandomLatLng(map);
//     L.marker(pos).addTo(markerClusterLayer);
// }

// markerClusterLayer.addTo(map);

// getRandomLatLng(map)


return map;
}

