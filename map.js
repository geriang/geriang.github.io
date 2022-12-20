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

// load results on result layer that is added to map
async function loadResult(streetName, flatType, resultLayer, map) {


    // Find center point of searched results on map
    let mapStartLocation = await loadCoordinate(2022, streetName, flatType);
    let midIndex = Math.round((mapStartLocation.length) / 2)
    let startView = mapStartLocation[midIndex]
    console.log(midIndex)


    // adding Marker Cluster Layer
    let markerClusterLayer = L.markerClusterGroup()

    // importing coordinates from data_govsg.js via loadCoordinate function
    let coordinates = await loadCoordinate(2022, streetName, flatType)
    console.log(coordinates)

    // importing flat price information from data_govsg.js via loadResalePrice function
    let priceInfo = await loadResalePrice(2022, streetName, flatType)
    console.log(priceInfo)

    // importing transacted date information from data_govsg.js via loadResalePrice function
    let transactedDate = await loadTransactedDate(2022, streetName, flatType)
    console.log(transactedDate)


    // for (let i = 0; i < coordinates.length; i++){

    //     L.marker(coordinates[i])
    //     .bindPopup(`${priceInfo[i]}`)

    //     .addTo(markerClusterLayer)
    // markerClusterLayer.addTo(map)

    // }

    coordinates.map((pos, index) => {
        L.marker(pos)
            .bindPopup(`Transacted Price: $${pos, priceInfo[index]}<br>
                        Transacted Month: ${pos, transactedDate[index]}
            `)


            .addTo(markerClusterLayer)
        markerClusterLayer.addTo(resultLayer)

    })
    map.flyTo(startView, 15, {
        animate: true,
        duration: 2 
    });


}














// let postalCodes = ["159967", "560561", "018956", "390032", "249565", "310204", "640433", "698924", "529510", "520860"];

// let markerClusterLayer = L.markerClusterGroup()

// for (let i of postalCodes){
//     let markers = await loadOneMapDataCoordinate(i)
//    //  L.marker(markers).addTo(map);
//     let pos = markers
//     L.marker(pos).addTo(markerClusterLayer)
//     markerClusterLayer.addTo(map);
//    }