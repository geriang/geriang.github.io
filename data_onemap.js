const baseApiUrl = "https://developers.onemap.sg/commonapi/search?searchVal="

async function loadData(){
    const response = await axios.get("https://developers.onemap.sg/commonapi/search?searchVal=760755&returnGeom=Y&getAddrDetails=Y&pageNum=1")
    console.log(response.data)

}

loadData()
// /commonapi/search?searchVal={SearchText}&returnGeom={Y/N}&getAddrDetails={Y/N}&pageNum={PageNumber}