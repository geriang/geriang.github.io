async function main() {

  init()

  function init() {
    let map = loadMap();

    // add the search results maker to a LayerGroup
    // for easier management, and so that we can toggle it on/off
    const resultLayer = L.layerGroup();
    resultLayer.addTo(map);

    document.querySelector('input[type="postalCode"]').addEventListener("keyup", async function () {
      getPostalCode = document.querySelector('input[type="postalCode"]').value;
      let estate = await loadOneMapDataEstate(getPostalCode)
      let add = await loadOneMapDataAddress(getPostalCode);
      // console.log(add)
      if (getPostalCode.length == 6) {
        let oldAddress = document.getElementById("address")
        oldAddress.innerHTML = `<div id="address" class="form-floating">
    <input type="address" class="form-control" id="floatingInput" name="address" placeholder="Address" value="${add}">
    <label for="floatingInput">Address</label>
  </div>
  <div id="address2" class="form-floating mb-3">
            <input type="address" readonly class="form-control-plaintext" id="floatingInput" name="address" placeholder="Address" value="${estate}">
            <label for="floatingInput">Estate/Building</label>
          </div>`

      }
      else {
        let oldAddress = document.getElementById("address")
        oldAddress.innerHTML = `<div id="address" class="form-floating">
        <input type="address" class="form-control" id="floatingInput" name="address" placeholder="Address">
        <label for="floatingInput">Address</label>
        </div>`
      }
    })

    document.querySelector("#formButton").addEventListener("click", async function () {
      // retrieve value of address from form
      let inputAdd = document.querySelector('input[type="address"]').value
      let inputAddCap = inputAdd.toUpperCase()
      let inputAddCapNoBlk = inputAddCap.slice(3)
      // retrieve value of flat type from form
      let flatType = document.querySelector("#flat").value
      // converting address to match data from data_govsg.js
      if (inputAddCapNoBlk.includes("AVENUE")) {
        let streetName = inputAddCapNoBlk.replace("AVENUE", "AVE")
        console.log(streetName)
        console.log(flatType)
        await loadResult(streetName, flatType, resultLayer, map);

      } else if (inputAddCapNoBlk.includes("STREET")) {
        let streetName = inputAddCapNoBlk.replace("STREET", "ST")
        console.log(streetName)
        console.log(flatType)
        await loadResult(streetName, flatType, resultLayer, map);

      } else {

        let streetName = inputAddCapNoBlk
        console.log(streetName)
        console.log(flatType)
        await loadResult(streetName, flatType, resultLayer, map);

      }

      console.log("submitted")

    })
  }
}

main();