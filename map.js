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
    let coordinates = await loadCoordinate(2022, streetName, flatType);
    let midIndex = Math.round((coordinates.length) / 2)
    let startView = coordinates[midIndex]
    // // console.log(midIndex)


    // adding Marker Cluster Layer
    let markerClusterLayer = L.markerClusterGroup()

    // importing coordinates from data_govsg.js via loadCoordinate function
    // replace coordinates with mapstartlocation var
    // let coordinates = await loadCoordinate(2022, streetName, flatType)
    // console.log(coordinates.length)

    // importing flat price information from data_govsg.js via loadResalePrice function
    let data = await loadTransactionInfo(2022, streetName, flatType)
    console.log(data)
    let transactedBlock = data[0].eachBlock
    console.log(transactedBlock)
    // console.log(priceInfo.length)

    // // importing transacted date information from data_govsg.js via loadTransactedDate function
    // let transactedDate = await loadTransactedDate(2022, streetName, flatType)
    // // console.log(transactedDate.length)

    // // importing transacted block information from data_govsg.js via loadTransactedBlock function
    // let transactedBlock = await loadTransactedBlock(2022, streetName, flatType)
    // console.log(transactedBlock.length)

    // // importing transacted floor information from data_govsg.js via loadTransactedFloor function
    // let transactedFloor = await loadTransactedFloor(2022, streetName, flatType)
    // console.log(transactedFloor.length)

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
        duration: 2
    });


}
// add more info such as blk, floor onto pop up


    // for (let i = 0; i < coordinates.length; i++){

    //     L.marker(coordinates[i])
    //     .bindPopup(`${priceInfo[i]}`)

    //     .addTo(markerClusterLayer)
    // markerClusterLayer.addTo(map)

    // }



