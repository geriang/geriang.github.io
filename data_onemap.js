const baseApiUrl = "https://developers.onemap.sg/commonapi/search?searchVal=";
// getPostalcode will eventually link with data_google.js
const getPostalCode = ["159967", "560561", "018956", "390032", "249565"];
const getOneMapData = `${baseApiUrl}${getPostalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;

async function loadOneMapData(){

    for (i of getPostalCode){
    let eachPostalCode = `${baseApiUrl}${i}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;
    // console.log(eachPostalCode);
           
    // for (let index = 0; index < eachPostalCode.length; index++)
            let eachResponse = await axios.get(eachPostalCode);
            // console.log(eachResponse);
            let eachLat = eachResponse.data.results[0].LATITUDE;
            let eachLon = eachResponse.data.results[0].LONGITUDE;
            let coordinate = [eachLat, eachLon];
            console.log(coordinate);
            // let marker = L.marker(coordinate); 
            // marker.addTo(map);
            // const allCoordinates = []
            // allCoordinates.push(coordinate)
            
        

            // console.log(allCoordinates)
    }
}


// async function loadOneMapData(){

//     const response = await axios.get(getOneMapData);
//     const lat = response.data.results[0].LATITUDE
//     const lon = response.data.results[0].LONGITUDE
    
//     coordinate = [lat, lon]

// }


// async function loadData(){
//     const response = await axios.get("https://developers.onemap.sg/commonapi/search?searchVal=760755&returnGeom=Y&getAddrDetails=Y&pageNum=1")
//     console.log(response.data)

// }
// loadOneMapData()

// /commonapi/search?searchVal={SearchText}&returnGeom={Y/N}&getAddrDetails={Y/N}&pageNum={PageNumber}