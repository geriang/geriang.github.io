const baseApiUrl = "https://developers.onemap.sg/commonapi/search?searchVal="
const getPostalCode = 159967
const coordinate = []

const getOneMapData = `${baseApiUrl}${getPostalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`

async function loadOneMapData(){
    const response = await axios.get(getOneMapData);

    const lat = response.data.results[0].LATITUDE
    const lon = response.data.results[0].LONGITUDE
    
    coordinate = [lat, lon]
    
    console.log(coordinate)
    return coordinate

}

// async function loadData(){
//     const response = await axios.get("https://developers.onemap.sg/commonapi/search?searchVal=760755&returnGeom=Y&getAddrDetails=Y&pageNum=1")
//     console.log(response.data)

// }

loadOneMapData()
// /commonapi/search?searchVal={SearchText}&returnGeom={Y/N}&getAddrDetails={Y/N}&pageNum={PageNumber}