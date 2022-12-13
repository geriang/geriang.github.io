const baseApiUrl = "https://developers.onemap.sg/commonapi/search?searchVal=";

// const getOneMapData = `${baseApiUrl}${getPostalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;
// https://developers.onemap.sg/commonapi/search?searchVal=159967&returnGeom=Y&getAddrDetails=Y&pageNum=1`
async function loadOneMapDataCoordinate(postalCode){

    let endpoint = `${baseApiUrl}${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;
    let response = await axios.get(endpoint)
    let eachLat = response.data.results[0].LATITUDE;
    let eachLon = response.data.results[0].LONGITUDE;
    let coordinate = [eachLat, eachLon];

    return coordinate;
    
}


async function loadOneMapDataAddress(postalCode){

    let endpoint = `${baseApiUrl}${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;
    let response = await axios.get(endpoint);
    let eachAdd = response.data.results[0].ADDRESS;

    return eachAdd;
    
}