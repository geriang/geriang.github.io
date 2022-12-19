async function main () {
 
document.querySelector('input[type="postalCode"]').addEventListener("keyup", async function(){
    getPostalCode = document.querySelector('input[type="postalCode"]').value;
    let estate = await loadOneMapDataEstate(getPostalCode)
    let add = await loadOneMapDataAddress(getPostalCode);
    // console.log(add)
    if (getPostalCode.length == 6){
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

document.querySelector("#formButton").addEventListener("click", async function(){
  let inputAdd = document.querySelector('input[type="address"]').value
  console.log(inputAdd)
  await initMap(inputAdd);
  console.log("submitted")

})
}

main ();