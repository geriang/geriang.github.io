// load map function
function loadMap() {
  const startView = [1.3521, 103.8198];
  const map = L.map('map', { zoomControl: false }).setView(startView, 11.5);

  // adding Tile Layer
  const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  tileLayer.addTo(map);

  return map;
};

// customize marker
const houseIcon = L.icon({
  iconUrl: 'icons/HomeMarker.png',
  iconSize: [40, 40], // size of the icon
  iconAnchor: [20, 40], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -30] // point from which the popup should open relative to the iconAnchor
});

// load street type results on result layer that is added to map
async function loadResult(year, streetName, flatType, resultLayer, map) {

  // reset globaMarkerArray
  globalMarkerCount = [];

  // adding Marker Cluster Layer
  let markerClusterLayer = L.markerClusterGroup();

  // importing flat price, block, floor information etc. from data_govsg.js via loadTransactionInfo function
  let data = await loadTransactionInfo(year, streetName, flatType);

  // Load coordinates and find center point of searched results on map
  let coordinates = data[1];

  // count the number of coordinates via globalMarkerArray
  globalMarkerCount.push(coordinates);
  if (coordinates.length == 0) {

    // remove spinner after finish loading
    const spinnerBackground = document.querySelector("#spinner-background");
    spinnerBackground.style.display = "none";

    // load no transactions found
    const noModal = new bootstrap.Modal(document.getElementById("noResultModal"), {});
    noModal.toggle();

  } else {
    // push corrdinates into global array
    globalMarkerCount.push(coordinates);

    // count the number of markers generated
    let count = 0;
    for (let i = 0; i < globalMarkerCount.length; i++) {
      count += globalMarkerCount[i].length;
    };

    let midIndex = Math.round((coordinates.length) / 2);
    let startView = coordinates[midIndex];

    // Map coordinates and transaction infomation
    coordinates.map((pos, index) => {
      L.marker((pos), { icon: houseIcon })
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

    // Load modal that displays the number of transaction found  
    let showResultModal = document.getElementById("resultModal");
    showResultModal.innerHTML = `
            <div class="modal-dialog modal-sm modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title text-center">${count / 2} HDB Resale Transactions Found</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <p class="center">Each house icon represents a transaction. Click on it to see the transaction details.</p>
                </div>
              </div>
            </div>
          </div> `;

    const resultModal = new bootstrap.Modal(document.getElementById("resultModal"), {});
    resultModal.toggle();

    // remove spinner after finish loading
    const spinnerBackground = document.querySelector("#spinner-background");
    spinnerBackground.style.display = "none";
  };
};

// load nearest block result
async function loadNearestBlkResult(year, block, streetName, flatType, resultLayer) {

  // load coordinates for search result according to 500m radius
  let coordinates = await loadNearbyCoordinate(year, block, streetName, flatType);
  globalMarkerCount.push(coordinates);

  // adding Marker Cluster Layer
  let markerClusterLayer = L.markerClusterGroup();

  // importing flat price, block, floor information etc. from data_govsg.js via loadNearbyTransactionInfo function
  
  let data = await loadNearbyTransactionInfo(year, block, streetName, flatType);

  // Map coordinates and transaction infomation
  coordinates.map((pos, index) => {
    L.marker((pos), { icon: houseIcon })
      .bindPopup(`Transacted Block: Block ${pos, data[index].eachBlock}<br>
                            Transacted Floor: Level ${pos, data[index].eachFloor}<br>
                            Transacted Price: $${pos, data[index].eachPrice}<br>
                            Transacted Month: ${pos, data[index].eachDate}
                `)
      .addTo(markerClusterLayer);
    markerClusterLayer.addTo(resultLayer);
  });

};





