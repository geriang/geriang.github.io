// creating a global variable to record the no. of transactions found
let globalMarkerCount = [];

async function main() {

  init();

  // load modal pop up
  window.addEventListener("load", function () {

    const myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {});
    myModal.toggle();
  });

  // loading the map
  function init() {
    let map = loadMap();

    // add the search results markers and marker pop-ups to a LayerGroup
    const resultLayer = L.layerGroup();
    resultLayer.addTo(map);

    // picking up postal code value from form to match One Map data then returning address and building/estate values
    document.querySelector('input[type="postalCode"]').addEventListener("keyup", async function () {
      getPostalCode = document.querySelector('input[type="postalCode"]').value;
      if (getPostalCode.length == 6) {
        let data = await loadOneMapData(getPostalCode);
        let estate = data.eachEstate;
        let road = data.eachRoad;
        let block = data.eachBlk;

        // updating address and creating building/estate fields in form 
        let oldAddress = document.getElementById("address");
        oldAddress.innerHTML = `<div id="address" class="form-floating">
    <input type="address" readonly class="form-control-plaintext" id="floatingInput" name="address" placeholder="Address" value="${block} ${road}">
    <label for="floatingInput">Address</label>
  </div>
  <div id="address2" class="form-floating mb-3">
            <input type="address" readonly class="form-control-plaintext" id="floatingInput" name="address" placeholder="Address" value="${estate}">
            <label for="floatingInput">Estate/Building</label>
          </div>`;

        // to enable sumbit button
        let ableToSubmit = document.querySelector("#formButton");
        ableToSubmit.removeAttribute('disabled');

      }
      else {

        //to disable back the submit button and remove the address field 
        let oldAddress = document.getElementById("address");
        oldAddress.innerHTML = `<div id="address"></div>`;

        let ableToSubmit = document.querySelector("#formButton");
        ableToSubmit.setAttribute('disabled', '');

      };
    });

    // click to generate such results
    document.querySelector("#formButton").addEventListener("click", async function () {

      // load spinner
      const spinnerBackground = document.querySelector("#spinner-background");
      spinnerBackground.style.display = "flex";

      // retrieve value of flat type from form
      let flatType = document.querySelector("#flat").value;

      // retrieve value of year from form
      let year = document.querySelector('input[type="year"]').value;

      // determine which result to load, if get results by street is checked:
      if (document.getElementById("flexRadioDefault1").checked) {

        // retrieve value of address from form
        let inputAdd = document.querySelector('input[type="address"]').value;
        let inputAddCapNoBlk = inputAdd.replace(/^\d+/, '');

        // transform the addresses so that it can be passed through as the correct parameter when making a query on Data.gov.sg
        var convertAdd = {
          "AVENUE": "AVE",
          "STREET": "ST",
          "LORONG": "LOR",
          "NORTH": "NTH",
          "ROAD": "RD",
          "PLACE": "PL",
          "JALAN": "JLN",
          "BUKIT": "BT",
          "CLOSE": "CL",
          "PARK": "PK",
          "DRIVE": "DR",
          "TANJONG": "TG",
          "UPPER": "UPP",
          "CRESCENT": "CRES",
          "CENTRAL": "CTRL",
          "COMMONWEALTH": "C'WEALTH",
        };

        streetName = inputAddCapNoBlk.replace(/AVENUE|STREET|LORONG|NORTH|ROAD|PLACE|JALAN|BUKIT|CLOSE|PARK|DRIVE|TANJONG|UPPER|CRESCENT|CENTRAL|COMMONWEALTH/gi, function (matched) {
          return convertAdd[matched];
        });

        // clearing the markers
        resultLayer.clearLayers();

        // loading the results on the map
        await loadResult(year, streetName, flatType, resultLayer, map);

      } else {

        // reset globaMarkerArray
        globalMarkerCount = [];

        // clearing the markers 
        resultLayer.clearLayers();
        // retrieve addresses from loadOneMapDataHDB
        let response = await loadOneMapDataHDB(getPostalCode);
        let allAddress = response.GeocodeInfo;
        for (eachAddress of allAddress) {
          let block = eachAddress.BLOCK;
          let street = eachAddress.ROAD;

          // transform the addresses so that it can be passed through as the correct parameter when making a query on Data.gov.sg 
          var convertAdd = {
            "AVENUE": "AVE",
            "STREET": "ST",
            "LORONG": "LOR",
            "NORTH": "NTH",
            "ROAD": "RD",
            "PLACE": "PL",
            "JALAN": "JLN",
            "BUKIT": "BT",
            "CLOSE": "CL",
            "PARK": "PK",
            "DRIVE": "DR",
            "TANJONG": "TG",
            "UPPER": "UPP",
            "CRESCENT": "CRES",
            "CENTRAL": "CTRL",
            "COMMONWEALTH": "C'WEALTH",
          };

          streetName = street.replace(/AVENUE|STREET|LORONG|NORTH|ROAD|PLACE|JALAN|BUKIT|CLOSE|PARK|DRIVE|TANJONG|UPPER|CRESCENT|CENTRAL|COMMONWEALTH/gi, function (matched) {
            return convertAdd[matched];
          });

          // calling the function to load the results on the map
          await loadNearestBlkResult(year, block, streetName, flatType, resultLayer, map);
        };

        // remove spinner after finish loading
        const spinnerBackground = document.querySelector("#spinner-background");
        spinnerBackground.style.display = "none";

        // count the number of markers generated
        let count = 0;
        for (let i = 0; i < globalMarkerCount.length; i++) {
          count += globalMarkerCount[i].length;
        };

        if (count == 0) {

          // load no transactions found on modal pop-up
          const noModal = new bootstrap.Modal(document.getElementById("noResultModal"), {});
          noModal.toggle();

        } else {

          // zoom into the search location on the map
          let data = await loadOneMapData(getPostalCode);
          let coordinate = data.eachCoordinate;
          map.flyTo(coordinate, 17, {
            animate: true,
            duration: 2,
          });

          // load transaction counts found on modal pop-up
          let showResultModal = document.getElementById("resultModal");
          showResultModal.innerHTML = `
            <div class="modal-dialog modal-sm modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title text-center">${count} HDB Resale Transactions Found</h5>
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
        };
      };
    });

    // Tooltips section

    // Search icon tooltip
    document.querySelector("#exampleModal").addEventListener("hidden.bs.modal", function () {
      let searchToolTip = document.querySelector("#tooltip");
      searchToolTip.style.display = "block";
      function fadeOut() {
        setTimeout(function () {
          searchToolTip.style.opacity = 0;
        }, 2500);
        setTimeout(function () {
          searchToolTip.style.display = "none";
        }, 3000);
      };
      fadeOut();
    });

    // Tooltips for Year
    document.querySelector("#questionMarkYear").addEventListener("mouseover", function () {
      let yearToolTip = document.querySelector("#helpYear");
      yearToolTip.style.display = "block";
    });

    // remove tooltips
    document.querySelector("#questionMarkYear").addEventListener("mouseout", function () {
      let yearToolTip = document.querySelector("#helpYear");
      yearToolTip.style.display = "none";
    });

    // Tooltips for Postal Code
    document.querySelector("#questionMarkPostalCode").addEventListener("mouseover", function () {
      let postalToolTip = document.querySelector("#helpPostal");
      postalToolTip.style.display = "block";
    });

    // remove tooltips
    document.querySelector("#questionMarkPostalCode").addEventListener("mouseout", function () {
      let postalToolTip = document.querySelector("#helpPostal");
      postalToolTip.style.display = "none";
    });

    // Tooltips for Flat Type selection
    document.querySelector("#questionMarkRoomType").addEventListener("mouseover", function () {
      let flatToolTip = document.querySelector("#helpDropdown");
      flatToolTip.style.display = "block";
    });

    // remove tooltips
    document.querySelector("#questionMarkRoomType").addEventListener("mouseout", function () {
      let flatToolTip = document.querySelector("#helpDropdown");
      flatToolTip.style.display = "none";
    });

    //  Tooltip for Radio Button selection
    document.querySelector("#questionMarkSearchType").addEventListener("mouseover", function () {
      let radioToolTip = document.querySelector("#helpRadio");
      radioToolTip.style.display = "block";
    });

    // remove tooltips
    document.querySelector("#questionMarkSearchType").addEventListener("mouseout", function () {
      let radioToolTip = document.querySelector("#helpRadio");
      radioToolTip.style.display = "none";
    });
  };
};

main();


