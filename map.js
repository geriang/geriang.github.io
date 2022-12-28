// load map function
function loadMap() {
    const startView = [1.3521, 103.8198];
    const map = L.map('map').setView(startView, 11.5);

    // adding Tile Layer
    const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tileLayer.addTo(map);

    return map;

}

// customize marker
const houseIcon = L.icon({
iconUrl: 'icons/HomeMarker.png',
// shadowUrl: 'icons/HomeMarkerSmall.png',
iconSize:     [40, 40], // size of the icon
// shadowSize:   [50, 64], // size of the shadow
iconAnchor:   [20, 40], // point of the icon which will correspond to marker's location
// shadowAnchor: [4, 62],  // the same for the shadow
popupAnchor:  [0, -30] // point from which the popup should open relative to the iconAnchor
        });

// load street type results on result layer that is added to map
async function loadResult(streetName, flatType, resultLayer, map) {

    // adding Marker Cluster Layer
    let markerClusterLayer = L.markerClusterGroup();

    // importing flat price, block, floor information etc. from data_govsg.js via loadTransactionInfo function
    let data = await loadTransactionInfo(2022, streetName, flatType);

    // Load coordinates and find center point of searched results on map
    let coordinates = data[1];
    if (coordinates.length  == 0){


        // remove spinner after finish loading
        const spinnerBackground = document.querySelector("#spinner-background");
        spinnerBackground.style.display = "none";
        // load no transactions found
        const noModal = new bootstrap.Modal(document.getElementById("noResultModal"), {})
        noModal.toggle()

    }else{
    let midIndex = Math.round((coordinates.length) / 2);
    let startView = coordinates[midIndex];
    

    // Map coordinates and transaction infomation
    coordinates.map((pos, index) => {
        L.marker((pos),{icon: houseIcon})
            .bindPopup(`Transacted Block: Block ${pos, data[0][index].eachBlock}<br>
                        Transacted Floor: Level ${pos, data[0][index].eachFloor}<br>
                        Transacted Price: $${pos, data[0][index].eachPrice}<br>
                        Transacted Month: ${pos, data[0][index].eachDate}
            `)

            .addTo(markerClusterLayer);
        markerClusterLayer.addTo(resultLayer);
    });

    // Fly to/zoom in to the result
    map.flyTo(startView, 15, {
        animate: true,
        duration: 2,
    });

    // remove spinner after finish loading
    const spinnerBackground = document.querySelector("#spinner-background");
    spinnerBackground.style.display = "none";
}
};

// load nearest block result
    async function loadNearestBlkResult(block, streetName, flatType, resultLayer) {

        // load coordinates for search result according to 500m radius
        let coordinates = await loadNearbyCoordinate(2022, block, streetName, flatType);
        globalMarkerCount.push(coordinates)
    
            // adding Marker Cluster Layer
            let markerClusterLayer = L.markerClusterGroup();
    
            // importing flat price, block, floor information etc. from data_govsg.js via loadNearbyTransactionInfo function
            let data = await loadNearbyTransactionInfo(2022, block, streetName, flatType);
        
            // Map coordinates and transaction infomation
            coordinates.map((pos, index) => {
            L.marker((pos),{icon: houseIcon})
                .bindPopup(`Transacted Block: Block ${pos, data[index].eachBlock}<br>
                            Transacted Floor: Level ${pos, data[index].eachFloor}<br>
                            Transacted Price: $${pos, data[index].eachPrice}<br>
                            Transacted Month: ${pos, data[index].eachDate}
                `)
                .addTo(markerClusterLayer);
            markerClusterLayer.addTo(resultLayer);
            });

    };





    