const baseApiUrl = "https://developers.onemap.sg/commonapi/search?searchVal=";

// const getOneMapData = `${baseApiUrl}${getPostalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;
// https://developers.onemap.sg/commonapi/search?searchVal=159967&returnGeom=Y&getAddrDetails=Y&pageNum=1`


// https://developers.onemap.sg/privateapi/commonsvc/revgeocode?location=1.3,103.8&token=0v9hsciobp1ifa5bgpkin21cs3&buffer=100&addressType=all
// /privateapi/commonsvc/revgeocode?location={latitude,longitude}&token={token}&buffer={buffer}&addressType={addressType}
const basePrivateApiUrl = "https://developers.onemap.sg/privateapi/commonsvc/revgeocode?"

// function that requires a postal code as input to generate address amd estate

async function loadOneMapData(postalCode) {
    let object = {}
    let endpoint = `${baseApiUrl}${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;
    let response = await axios.get(endpoint);

    let eachBlk = response.data.results[0].BLK_NO;
    let eachRoad = response.data.results[0].ROAD_NAME;
    // let eachAdd = `${eachBlk} ${eachRoad}`

    let eachEstate = response.data.results[0].BUILDING;

    let eachLat = response.data.results[0].LATITUDE;
    let eachLon = response.data.results[0].LONGITUDE;
    let eachCoordinate = [eachLat, eachLon]

    object = { eachBlk, eachRoad, eachEstate, eachCoordinate }
    // console.log(object)

    return object

}

// async function loadOneMapDataCoordinate(postalCode) {

//     let endpoint = `${baseApiUrl}${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;
//     let response = await axios.get(endpoint);
//     let eachLat = response.data.results[0].LATITUDE;
//     let eachLon = response.data.results[0].LONGITUDE;
//     let coordinate = [eachLat, eachLon];

//     return coordinate;
// }

// function that requires an address as input to generate coordinates
async function loadOneMapDataCoordinateUsingAddress(eachAddress) {

    let endpoint = `${baseApiUrl}${eachAddress}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;
    let response = await axios.get(endpoint);
    let eachLat = response.data.results[0].LATITUDE;
    let eachLon = response.data.results[0].LONGITUDE;
    let coordinate = [eachLat, eachLon];

    return coordinate;
}
// function that requires postal code as input to generate surrounding HDBs
async function loadOneMapDataHDB(postalCode) {
    let data = await loadOneMapData(postalCode)
    let coordinate = data.eachCoordinate
    let endpoint = `${basePrivateApiUrl}location=${coordinate}&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjk2MTYsInVzZXJfaWQiOjk2MTYsImVtYWlsIjoic2hvcHBpbmdhY2M4NEBnbWFpbC5jb20iLCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiaHR0cDpcL1wvb20yLmRmZS5vbmVtYXAuc2dcL2FwaVwvdjJcL3VzZXJcL3Nlc3Npb24iLCJpYXQiOjE2NzE2MzU2NzAsImV4cCI6MTY3MjA2NzY3MCwibmJmIjoxNjcxNjM1NjcwLCJqdGkiOiI0ZmY3YzlkNzg3ZjgzYzY0MDVjNmU0Njk3NDUxN2ZiNSJ9.UaadQPnBdms1Q8oEpSl97rRk-4KKIca_K1jWG1RmAao&buffer=500&addressType=HDB`
    let response = await axios.get(endpoint);

    return response.data
}

// `https://developers.onemap.sg/privateapi/commonsvc/revgeocode?location=[1.42707820696356","103.832706088136]&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjk2MTYsInVzZXJfaWQiOjk2MTYsImVtYWlsIjoic2hvcHBpbmdhY2M4NEBnbWFpbC5jb20iLCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiaHR0cDpcL1wvb20yLmRmZS5vbmVtYXAuc2dcL2FwaVwvdjJcL3VzZXJcL3Nlc3Npb24iLCJpYXQiOjE2NzE2MzU2NzAsImV4cCI6MTY3MjA2NzY3MCwibmJmIjoxNjcxNjM1NjcwLCJqdGkiOiI0ZmY3YzlkNzg3ZjgzYzY0MDVjNmU0Njk3NDUxN2ZiNSJ9.UaadQPnBdms1Q8oEpSl97rRk-4KKIca_K1jWG1RmAao&buffer=300&addressType=HDB