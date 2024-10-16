const baseApiUrl = "https://www.onemap.gov.sg/api/common/elastic/search?searchVal=";
const basePrivateApiUrl = "https://www.onemap.gov.sg/api/public/revgeocode?";
const tokenUrl= "https://www.onemap.gov.sg/api/auth/post/getToken";


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

    const email = process.env.NETLIFY_EMAIL;
    const password = process.env.NETLIFY_PASSWORD;

    let tokenData = await axios.post(tokenUrl, {"email": email, "password": password})
    oneMapToken = tokenData.data.access_token

    let data = await loadOneMapData(postalCode);
    let coordinate = data.eachCoordinate;
    let endpoint = `${basePrivateApiUrl}location=${coordinate}&buffer=500&addressType=HDB`;
    let response = await axios.get(endpoint, 
                                { headers: {"Authorization" : `Bearer ${oneMapToken}`} 
                            });
    console.log(response.data) 
    return response.data;
};

