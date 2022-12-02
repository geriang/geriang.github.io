function initMap (){
// Initalizing Map
const singapore = [1.3521,103.8198];
const map = L.map('map').setView(singapore, 11.5);

// adding Tile Layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

return map;
}