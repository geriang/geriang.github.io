// load map function
function loadMap() {
    const startView = [1.3521, 103.8198]
    const map = L.map('map').setView(startView, 11.5);

    // adding Tile Layer
    const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })

    tileLayer.addTo(map);

    return map

}

// load street type results on result layer that is added to map
async function loadResult(streetName, flatType, resultLayer, map) {

    // Load coordinates and find center point of searched results on map
    let coordinates = await loadCoordinate(2022, streetName, flatType);
    let midIndex = Math.round((coordinates.length) / 2)
    let startView = coordinates[midIndex]

    // adding Marker Cluster Layer
    let markerClusterLayer = L.markerClusterGroup()

    // importing flat price, block, floor information etc. from data_govsg.js via loadTransactionInfo function
    let data = await loadTransactionInfo(2022, streetName, flatType)

    coordinates.map((pos, index) => {
        L.marker(pos)
            .bindPopup(`Transacted Block: Block ${pos, data[index].eachBlock}<br>
                        Transacted Floor: Level ${pos, data[index].eachFloor}<br>
                        Transacted Price: $${pos, data[index].eachPrice}<br>
                        Transacted Month: ${pos, data[index].eachDate}
            `)

            .addTo(markerClusterLayer)
        markerClusterLayer.addTo(resultLayer)

    })
    map.flyTo(startView, 15, {
        animate: true,
        duration: 2,

    });
    // remove spinner after finish loading
    const spinnerBackground = document.querySelector("#spinner-background")
    spinnerBackground.style.display = "none";
}

// load nearest block resutl
async function loadNearestBlkResult(block, streetName, flatType, resultLayer, map) {

    let coordinates = await loadNearbyCoordinate(2022, block, streetName, flatType);

    // Extract coordinates in array
    // let coordinates = []
    // let coordinateData = await loadOneMapDataHDB(postalCode);
    // let allCoordinate = coordinateData.GeocodeInfo
    // for (eachCoordinate of allCoordinate) {
    //     let coordinate = [eachCoordinate.LATITUDE, eachCoordinate.LONGITUDE]
    //     coordinates.push(coordinate)
    // }
    // adding Marker Cluster Layer
    let markerClusterLayer = L.markerClusterGroup()

    // importing flat price, block, floor information etc. from data_govsg.js via loadTransactionInfo function
    let data = await loadNearbyTransactionInfo(2022, block, streetName, flatType)

    coordinates.map((pos, index) => {
        L.marker(pos)
            .bindPopup(`Transacted Block: Block ${pos, data[index].eachBlock}<br>
                        Transacted Floor: Level ${pos, data[index].eachFloor}<br>
                        Transacted Price: $${pos, data[index].eachPrice}<br>
                        Transacted Month: ${pos, data[index].eachDate}
            `)

            .addTo(markerClusterLayer)
        markerClusterLayer.addTo(resultLayer)

    })
    map.flyTo(startView, 15, {
        animate: true,
        duration: 2,

    });
    // remove spinner after finish loading
    const spinnerBackground = document.querySelector("#spinner-background")
    spinnerBackground.style.display = "none";
}




    // for (let i = 0; i < coordinates.length; i++){

    //     L.marker(coordinates[i])
    //     .bindPopup(`${priceInfo[i]}`)

    //     .addTo(markerClusterLayer)
    // markerClusterLayer.addTo(map)

    // }



