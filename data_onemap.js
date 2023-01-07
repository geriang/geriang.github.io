const baseApiUrl = "https://developers.onemap.sg/commonapi/search?searchVal=";
const oneMapToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjk2MTYsInVzZXJfaWQiOjk2MTYsImVtYWlsIjoic2hvcHBpbmdhY2M4NEBnbWFpbC5jb20iLCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiaHR0cDpcL1wvb20yLmRmZS5vbmVtYXAuc2dcL2FwaVwvdjJcL3VzZXJcL3Nlc3Npb24iLCJpYXQiOjE2NzMwODE1NTYsImV4cCI6MTY3MzUxMzU1NiwibmJmIjoxNjczMDgxNTU2LCJqdGkiOiI2NzA5OTEyZmI2OTVjYzkxMzMyMzUyMTE4MzI4MDA4ZiJ9.AVgFI2WLPYtRe-hpsl9Zq5S6VuPKURH6YHdAKut30W4";
const basePrivateApiUrl = "https://developers.onemap.sg/privateapi/commonsvc/revgeocode?";

// function that requires a postal code as input to generate address amd estate
async function loadOneMapData(postalCode) {
    let object = {};
    let endpoint = `${baseApiUrl}${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;
    let response = await axios.get(endpoint);
    let eachBlk = response.data.results[0].BLK_NO;
    let eachRoad = response.data.results[0].ROAD_NAME;
    let eachEstate = response.data.results[0].BUILDING;
    let eachLat = response.data.results[0].LATITUDE;
    let eachLon = response.data.results[0].LONGITUDE;
    let eachCoordinate = [eachLat, eachLon];
    object = { eachBlk, eachRoad, eachEstate, eachCoordinate };
    
    return object;
}

// function that requires an address as input to generate coordinates
async function loadOneMapDataCoordinateUsingAddress(eachAddress) {

    let endpoint = `${baseApiUrl}${eachAddress}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;
    let response = await axios.get(endpoint);
    let eachLat = response.data.results[0].LATITUDE;
    let eachLon = response.data.results[0].LONGITUDE;
    let coordinate = [eachLat, eachLon];

    return coordinate;
};

// function that requires postal code as input to generate surrounding HDBs
async function loadOneMapDataHDB(postalCode) {
    let data = await loadOneMapData(postalCode);
    let coordinate = data.eachCoordinate;
    let endpoint = `${basePrivateApiUrl}location=${coordinate}&token=${oneMapToken}&buffer=500&addressType=HDB`;
    let response = await axios.get(endpoint);

    return response.data;
};

