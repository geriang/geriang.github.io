async function main () {
 initMap();
}
main ();

document.querySelector("#button").addEventListener("click", async function(){
    getPostalCode = document.querySelector('input[type="postalCode"]').value;
    let add = await loadOneMapDataAddress(getPostalCode)
    console.log(add)
    let oldAddress = document.querySelector('input[type="address"]').value;
    oldAddress = add;

})
