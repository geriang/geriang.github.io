async function main() {

  init()

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
        let add = data.eachAdd

        // updating address and creating building/estate fields in form 
        // if (getPostalCode.length == 6) {
        let oldAddress = document.getElementById("address")
        oldAddress.innerHTML = `<div id="address" class="form-floating">
    <input type="address" readonly class="form-control-plaintext" id="floatingInput" name="address" placeholder="Address" value="${add}">
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

      // retrieve value of address from form
      let inputAdd = document.querySelector('input[type="address"]').value
      let inputAddCap = inputAdd.toUpperCase()
      let inputAddCapNoBlk = inputAddCap.slice(3)

      // retrieve value of flat type from form
      let flatType = document.querySelector("#flat").value

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

      console.log("submitted")

    })

    // document.querySelector("#formButton").addEventListener("mouseover", function

  }
}

main();


