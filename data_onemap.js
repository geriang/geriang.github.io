const baseApiUrl = "https://developers.onemap.sg/commonapi/search?searchVal=";

// const getOneMapData = `${baseApiUrl}${getPostalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;

async function loadOneMapData(postalCode){

    let endpoint = `${baseApiUrl}${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;
    let response = await axios.get(endpoint)
    let eachLat = response.data.results[0].LATITUDE;
    let eachLon = response.data.results[0].LONGITUDE;
    let coordinate = [eachLat, eachLon]

    return coordinate
    
}