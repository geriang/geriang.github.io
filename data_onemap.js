const baseApiUrl = "https://developers.onemap.sg/commonapi/search?searchVal=";

// const getOneMapData = `${baseApiUrl}${getPostalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;
// https://developers.onemap.sg/commonapi/search?searchVal=159967&returnGeom=Y&getAddrDetails=Y&pageNum=1`

// function that requires a postal code as input to generate coordinates
async function loadOneMapDataCoordinate(postalCode) {

    let endpoint = `${baseApiUrl}${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;
    let response = await axios.get(endpoint);
    let eachLat = response.data.results[0].LATITUDE;
    let eachLon = response.data.results[0].LONGITUDE;
    let coordinate = [eachLat, eachLon];

    return coordinate;
}
// function that requires an address as input to generate coordinates
async function loadOneMapDataCoordinateUsingAddress(eachAddress) {

    let endpoint = `${baseApiUrl}${eachAddress}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;
    let response = await axios.get(endpoint);
    let eachLat = response.data.results[0].LATITUDE;
    let eachLon = response.data.results[0].LONGITUDE;
    let coordinate = [eachLat, eachLon];

    return coordinate;
}

// function that requires a postal code as input to generate address
async function loadOneMapDataAddress(postalCode) {

    let endpoint = `${baseApiUrl}${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;
    let response = await axios.get(endpoint);
    let eachBlk = response.data.results[0].BLK_NO;
    let eachRoad = response.data.results[0].ROAD_NAME;
    let eachAdd = `${eachBlk} ${eachRoad}`

    return eachAdd;
}

// function that requires a postal code as input to generate estate
async function loadOneMapDataEstate(postalCode) {

    let endpoint = `${baseApiUrl}${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;
    let response = await axios.get(endpoint);
    let eachEstate = response.data.results[0].BUILDING;
    console.log(eachEstate)
    return eachEstate;
}
