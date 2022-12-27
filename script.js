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

        // console.log(streetName)
        resultLayer.clearLayers()
        await loadResult(streetName, flatType, resultLayer, map);
 
      } else {

        resultLayer.clearLayers()
        // retrieve addresses from loadOneMapDataHDB
        let response = await loadOneMapDataHDB(getPostalCode)
        let allAddress = response.GeocodeInfo
        for (eachAddress of allAddress) {
          let block = eachAddress.BLOCK
          // console.log(block)
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
  
            // console.log(streetName)
            loadNearestBlkResult(block, streetName, flatType, resultLayer, map)

          }

        let data = await loadOneMapData(getPostalCode)
        let coordinate = data.eachCoordinate
        map.flyTo(coordinate, 17, {
          animate: true,
          duration: 2,
        })

        // remove spinner after finish loading
        const spinnerBackground = document.querySelector("#spinner-background")
        spinnerBackground.style.display = "none";
        // console.log("submitted")
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


// // retrieve addresses from loadOneMapDataHDB
// let object = {}
// let array = []
// let response = await loadOneMapDataHDB(getPostalCode)
// let allAddress = response.GeocodeInfo
// for (eachAddress of allAddress) {
//   let block = eachAddress.BLOCK
//   let street = eachAddress.ROAD
//   // converting address to match data from data_govsg.js
//   if (street.includes("AVENUE")) {
//     let eachStreet = street.replace("AVENUE", "AVE")
//     object = { block, eachStreet, flatType }
//     array.push(object)

//   } else if (street.includes("STREET")) {
//     let eachStreet = street.replace("STREET", "ST")
//     object = { block, eachStreet, flatType }
//     array.push(object)

//   } else if (street.includes("LORONG")) {
//     let eachStreet = street.replace("LORONG", "LOR")
//     object = { block, eachStreet, flatType }
//     array.push(object)

//   } else if (street.includes("NORTH")) {
//     let eachStreet = street.replace("NORTH", "NTH")
//     object = { block, eachStreet, flatType }
//     array.push(object)

//   } else if (street.includes("ROAD")) {
//     let eachStreet = street.replace("ROAD", "RD")
//     object = { block, eachStreet, flatType }
//     array.push(object)

//   } else {
//     let eachStreet = street
//     object = { block, eachStreet, flatType }
//     array.push(object)

//   }
// }
// console.log(array)
// await loadNearestBlkResult(755, "YISHUN ST 72", "5 ROOM", resultLayer, map)

// console.log("submitted")
// }



// resultLayer.clearLayers()
//         // retrieve addresses from loadOneMapDataHDB
//         let response = await loadOneMapDataHDB(getPostalCode)
//         let allAddress = response.GeocodeInfo
//         for (eachAddress of allAddress) {
//           let block = eachAddress.BLOCK
//           let street = eachAddress.ROAD
//           // converting address to match data from data_govsg.js
//           if (street.includes("AVENUE")) {
//             let streetName = street.replace("AVENUE", "AVE")
//             loadNearestBlkResult(block, streetName, flatType, resultLayer, map)

//           } else if (street.includes("STREET")) {
//             let streetName = street.replace("STREET", "ST")
//             loadNearestBlkResult(block, streetName, flatType, resultLayer, map)

//           } else if (street.includes("LORONG")) {
//             let streetName = street.replace("LORONG", "LOR")
//             loadNearestBlkResult(block, streetName, flatType, resultLayer, map)

//           } else if (street.includes("NORTH")) {
//             let streetName = street.replace("NORTH", "NTH")
//             loadNearestBlkResult(block, streetName, flatType, resultLayer, map)

//           } else if (street.includes("ROAD")) {
//             let streetName = street.replace("ROAD", "RD")
//             loadNearestBlkResult(block, streetName, flatType, resultLayer, map)

//           } else {
//             let streetName = street
//             loadNearestBlkResult(block, streetName, flatType, resultLayer, map)

//           }
//         }


//         // remove spinner after finish loading
//         const spinnerBackground = document.querySelector("#spinner-background")
//         spinnerBackground.style.display = "none";
//         console.log("submitted")
//       }

// const conditions = ["AVENUE", "STREET", "LORONG", "NORTH", "ROAD"];
// if (conditions.some(el => inputAddCapNoBlk.includes(el))){

//   var mapObj = {
//     "AVENUE":"AVE",
//     "STREET":"ST",
//     "LORONG":"LOR",
//     "NORTH":"NTH",
//     'R0AD':'RD',
//   };

//     streetName = inputAddCapNoBlk.replace(/"AVENUE|STREET|LORONG|NORTH|ROAD/gi, function(matched){
//       return mapObj[matched];
//     })

//     console.log(inputAddCapNoBlk)
//       resultLayer.clearLayers()
//   await loadResult(streetName, flatType, resultLayer, map);
 
//  };


//  if (inputAddCapNoBlk.includes("AVENUE")) {
//   let streetName = inputAddCapNoBlk.replace("AVENUE", "AVE")

//   resultLayer.clearLayers()
//   await loadResult(streetName, flatType, resultLayer, map);

// } else if (inputAddCapNoBlk.includes("STREET")) {
//   let streetName = inputAddCapNoBlk.replace("STREET", "ST")

//   resultLayer.clearLayers()
//   await loadResult(streetName, flatType, resultLayer, map);

// } else if (inputAddCapNoBlk.includes("LORONG")) {

//   let streetName = inputAddCapNoBlk.replace("LORONG", "LOR")

//   resultLayer.clearLayers()
//   await loadResult(streetName, flatType, resultLayer, map);

// } else if (inputAddCapNoBlk.includes("NORTH")) {

//   let streetName = inputAddCapNoBlk.replace("NORTH", "NTH")

//   resultLayer.clearLayers()
//   await loadResult(streetName, flatType, resultLayer, map);

// } else if (inputAddCapNoBlk.includes("ROAD")) {

//   let streetName = inputAddCapNoBlk.replace("ROAD", "RD")

//   resultLayer.clearLayers()
//   await loadResult(streetName, flatType, resultLayer, map);