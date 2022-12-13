async function main () {
 initMap();
}
main ();

document.querySelector('input[type="postalCode"]').addEventListener("keyup", async function(){
    getPostalCode = document.querySelector('input[type="postalCode"]').value;
    let add = await loadOneMapDataAddress(getPostalCode)
    console.log(add)
    if (getPostalCode.length == 6){
    let oldAddress = document.getElementById("address")
    oldAddress.innerHTML = `<div id="address" class="form-floating">
    <input type="address" class="form-control" id="floatingInput" name="address" placeholder="Address" value="${add}">
    <label for="floatingInput">Address</label>
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

