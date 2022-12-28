let globalMarkerCount = []

async function main() {

  init()

  // load modal pop up
  window.addEventListener("load", function () {
    // https://stackoverflow.com/users/171456/zim

    const myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {});
    myModal.toggle();
  });

  function init() {
    let map = loadMap();

    // add the search results markers and marker pop-ups to a LayerGroup
    const resultLayer = L.layerGroup();
    resultLayer.addTo(map);

    // picking up postal code value from form to match One Map data then returning address and building/estate values
    document.querySelector('input[type="postalCode"]').addEventListener("keyup", async function () {
      getPostalCode = document.querySelector('input[type="postalCode"]').value;
      if (getPostalCode.length == 6) {
        let data = await loadOneMapData(getPostalCode)
        let estate = data.eachEstate
        let road = data.eachRoad
        let block = data.eachBlk

        // updating address and creating building/estate fields in form 
        // if (getPostalCode.length == 6) {
        let oldAddress = document.getElementById("address")
        oldAddress.innerHTML = `<div id="address" class="form-floating">
    <input type="address" readonly class="form-control-plaintext" id="floatingInput" name="address" placeholder="Address" value="${block} ${road}">
    <label for="floatingInput">Address</label>
  </div>
  <div id="address2" class="form-floating mb-3">
            <input type="address" readonly class="form-control-plaintext" id="floatingInput" name="address" placeholder="Address" value="${estate}">
            <label for="floatingInput">Estate/Building</label>
          </div>`

        // to enable sumbit button
        let ableToSubmit = document.querySelector("#formButton")
        ableToSubmit.removeAttribute('disabled')

      }
      else {

        let oldAddress = document.getElementById("address")
        oldAddress.innerHTML = `<div id="address"></div>`
        // // <input type="address" class="form-control" id="floatingInput" name="address" placeholder="Address">
        // // <label for="floatingInput">Address</label>
        // // </div>`
      }
    })

    // click to generate such results
    document.querySelector("#formButton").addEventListener("click", async function () {

      // load spinner
      const spinnerBackground = document.querySelector("#spinner-background")
      spinnerBackground.style.display = "flex";

      // retrieve value of flat type from form
      let flatType = document.querySelector("#flat").value

      // determine which result to load, if get results by street is checked:

      if (document.getElementById("flexRadioDefault1").checked) {

        // retrieve value of address from form
        let inputAdd = document.querySelector('input[type="address"]').value
        // https://stackoverflow.com/questions/4993764/how-to-remove-numbers-from-a-string
        let inputAddCapNoBlk = inputAdd.replace(/^\d+/,'');
        // https://stackoverflow.com/questions/15604140/replace-multiple-strings-with-multiple-other-strings

        var convertAdd = {
        "AVENUE":"AVE",
        "STREET":"ST",
        "LORONG":"LOR",
        "NORTH":"NTH",
        "ROAD":"RD",
        "PLACE":"PL",
        "JALAN":"JLN",
        "BUKIT":"BT",
        "CLOSE":"CL",
        "PARK":"PK",
        "DRIVE":"DR",
        "TANJONG":"TG",
        "UPPER":"UPP",
        "CRESCENT":"CRES",
        "CENTRAL":"CTRL",
        "COMMONWEALTH":"C'WEALTH",

        };

        streetName = inputAddCapNoBlk.replace(/AVENUE|STREET|LORONG|NORTH|ROAD|PLACE|JALAN|BUKIT|CLOSE|PARK|DRIVE|TANJONG|UPPER|CRESCENT|CENTRAL|COMMONWEALTH/gi, function(matched){
        return convertAdd[matched];
        })

        resultLayer.clearLayers()
        await loadResult(streetName, flatType, resultLayer, map);
 
      } else {
        globalMarkerCount = []

        resultLayer.clearLayers()
        // retrieve addresses from loadOneMapDataHDB
        let response = await loadOneMapDataHDB(getPostalCode)
        let allAddress = response.GeocodeInfo
        for (eachAddress of allAddress) {
          let block = eachAddress.BLOCK
          let street = eachAddress.ROAD
          // converting address to match data from data_govsg.js
          
        var convertAdd = {
          "AVENUE":"AVE",
          "STREET":"ST",
          "LORONG":"LOR",
          "NORTH":"NTH",
          "ROAD":"RD",
          "PLACE":"PL",
          "JALAN":"JLN",
          "BUKIT":"BT",
          "CLOSE":"CL",
          "PARK":"PK",
          "DRIVE":"DR",
          "TANJONG":"TG",
          "UPPER":"UPP",
          "CRESCENT":"CRES",
          "CENTRAL":"CTRL",
          "COMMONWEALTH":"C'WEALTH",
          };
  
          streetName = street.replace(/AVENUE|STREET|LORONG|NORTH|ROAD|PLACE|JALAN|BUKIT|CLOSE|PARK|DRIVE|TANJONG|UPPER|CRESCENT|CENTRAL|COMMONWEALTH/gi, function(matched){
          return convertAdd[matched];
          })
  
          await loadNearestBlkResult(block, streetName, flatType, resultLayer, map)

          }
          
          // remove spinner after finish loading
          const spinnerBackground = document.querySelector("#spinner-background")
          spinnerBackground.style.display = "none";

          // count the number of markers generated
          let count = 0
          for (let i = 0; i < globalMarkerCount.length; i++) {
            count += globalMarkerCount[i].length;
          }
          console.log(count)
          if (count == 0){

             // load no transactions found
            const noModal = new bootstrap.Modal(document.getElementById("noResultModal"), {})
            noModal.toggle()

          }else{

            let data = await loadOneMapData(getPostalCode)
            let coordinate = data.eachCoordinate
            map.flyTo(coordinate, 17, {
            animate: true,
            duration: 2,
            })

            let showResultModal = document.getElementById("resultModal")
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
          </div> `

            const resultModal = new bootstrap.Modal(document.getElementById("resultModal"), {})
            resultModal.toggle()

          }
          
      }
        globalMarkerCount = null

    });

    // Tooltips section

    // Tooltips for Postal Code
    document.querySelector("#postal").addEventListener("mouseover", function () {
      let postalToolTip = document.querySelector("#helpPostal");
      postalToolTip.style.display = "block"
    })

    document.querySelector("#postal").addEventListener("mouseout", function () {
      let postalToolTip = document.querySelector("#helpPostal");
      postalToolTip.style.display = "none"
    })

    // Tooltips for Flat Type selection
    document.querySelector("#flat").addEventListener("mouseover", function () {
      let flatToolTip = document.querySelector("#helpDropdown");
      flatToolTip.style.display = "block"
    })

    document.querySelector("#flat").addEventListener("mouseout", function () {
      let flatToolTip = document.querySelector("#helpDropdown");
      flatToolTip.style.display = "none"
    })

    //  Tooltip for Radio Button selection
    document.querySelector("#radioSelection").addEventListener("mouseover", function () {
      let radioToolTip = document.querySelector("#helpRadio");
      radioToolTip.style.display = "block"
    })

    document.querySelector("#radioSelection").addEventListener("mouseout", function () {
      let radioToolTip = document.querySelector("#helpRadio");
      radioToolTip.style.display = "none"
    })

  }
}

main();


