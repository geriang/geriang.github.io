async function main() {

  init()


  // load modal pop up
  window.addEventListener("load", function () {
    // https://stackoverflow.com/users/171456/zim
    const myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {})
    myModal.toggle()
  })

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
        // let inputAddCap = inputAdd.toUpperCase()
        let inputAddCapNoBlk = inputAdd.slice(3)

        // converting input address to match data from data_govsg.js
        if (inputAddCapNoBlk.includes("AVENUE")) {
          let streetName = inputAddCapNoBlk.replace("AVENUE", "AVE")

          resultLayer.clearLayers()
          await loadResult(streetName, flatType, resultLayer, map);

        } else if (inputAddCapNoBlk.includes("STREET")) {
          let streetName = inputAddCapNoBlk.replace("STREET", "ST")

          resultLayer.clearLayers()
          await loadResult(streetName, flatType, resultLayer, map);

        } else if (inputAddCapNoBlk.includes("LORONG")) {

          let streetName = inputAddCapNoBlk.replace("LORONG", "LOR")

          resultLayer.clearLayers()
          await loadResult(streetName, flatType, resultLayer, map);

        } else if (inputAddCapNoBlk.includes("NORTH")) {

          let streetName = inputAddCapNoBlk.replace("NORTH", "NTH")

          resultLayer.clearLayers()
          await loadResult(streetName, flatType, resultLayer, map);

        } else if (inputAddCapNoBlk.includes("ROAD")) {

          let streetName = inputAddCapNoBlk.replace("ROAD", "RD")

          resultLayer.clearLayers()
          await loadResult(streetName, flatType, resultLayer, map);

        } else {

          let streetName = inputAddCapNoBlk

          resultLayer.clearLayers()
          await loadResult(streetName, flatType, resultLayer, map);

        }
      } else {

        // retrieve addresses from loadOneMapDataHDB
        let allStreet = []
        let allBlock = []
        let response = await loadOneMapDataHDB(getPostalCode)
        let allAddress = response.GeocodeInfo
        for (eachAddress of allAddress) {
          let street = eachAddress.ROAD
          // converting address to match data from data_govsg.js
          if (street.includes("AVENUE")) {
            let eachStreet = street.replace("AVENUE", "AVE")
            allStreet.push(eachStreet)

          } else if (street.includes("STREET")) {
            let eachStreet = street.replace("STREET", "ST")
            allStreet.push(eachStreet)

          } else if (street.includes("LORONG")) {
            let eachStreet = street.replace("LORONG", "LOR")
            allStreet.push(eachStreet)

          } else if (street.includes("NORTH")) {
            let eachStreet = street.replace("NORTH", "NTH")
            allStreet.push(eachStreet)

          } else if (street.includes("ROAD")) {
            let eachStreet = street.replace("ROAD", "RD")
            allStreet.push(eachStreet)

          } else {
            let eachStreet = street
            allStreet.push(eachStreet)

          }
          // extract out blocks 
          let eachBlock = eachAddress.BLOCK
          allBlock.push(eachBlock)
        }


        console.log(allStreet)














        // let coordinates = []
        // let data = await loadOneMapDataHDB(getPostalCode);
        // let allCoordinate = data.GeocodeInfo
        // for (eachCoordinate of allCoordinate) {
        //     let coordinate = [eachCoordinate.LATITUDE, eachCoordinate.LONGITUDE]
        //     coordinates.push(coordinate)
        // console.log(coordinates)

        // }

        // let allStreetNames = []
        // let nearestBlocks = await loadOneMapDataHDB(getPostalCode)
        // let allBlocks = nearestBlocks.GeocodeInfo
        // for (eachBlock of allBlocks){
        //   let eachStreet = eachBlock.ROAD 
        //   allStreetNames.push(eachStreet)

        //   console.log(allStreetNames)
        // }  


        console.log("submitted")
      }



    })

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


