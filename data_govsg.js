const dataGovSGBaseApiUrl = "https://data.gov.sg/api/action/datastore_search"
const resourceID = "?resource_id=f1765b54-a209-4718-8d38-a39237f502b3"
const filterMonth = "&filters={'month':'2022-12'}"

// https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&q={"month":"2022","street_name":"YISHUN ST 72","flat_type":"5 ROOM"}&limit=1200
// async function loadGovSgData(month,year){
//     const response = await axios.get(`${dataGovSGBaseApiUrl}${resourceID}&filters={"month":"${year}-${month}"}&limit=1105`)
//     const eachRecord = response.data.result.records[0]
//     let eachAddress = `${eachRecord.block}+${eachRecord.street_name}`

//     return eachAddress
// }

// enter month, year and street name to retrieve coordinates
async function loadCoordinate(year, streetName, flatType) {
    let array = []
    const response = await axios.get(`${dataGovSGBaseApiUrl}${resourceID}&q={"month":"${year}","street_name":"${streetName}","flat_type":"${flatType}"}&limit=1200`)
    const record = response.data.result.records
    for (eachRecord of record) {
        let eachAddress = `${eachRecord.block}+${eachRecord.street_name}`
        let coordinate = await loadOneMapDataCoordinateUsingAddress(eachAddress)
        array.push(coordinate)

    }

    return array

}

// enter month, year and street name to retrieve transacted price 
async function loadResalePrice(year, streetName, flatType) {
    let array = []
    const response = await axios.get(`${dataGovSGBaseApiUrl}${resourceID}&q={"month":"${year}","street_name":"${streetName}","flat_type":"${flatType}"}&limit=1200`)
    const record = response.data.result.records
    for (eachRecord of record) {
        let eachPrice = eachRecord.resale_price
        array.push(eachPrice)

    }

    return array

}

// enter month, year and street name to retrieve transacted date 
async function loadTransactedDate(year, streetName, flatType) {
    let array = []
    const response = await axios.get(`${dataGovSGBaseApiUrl}${resourceID}&q={"month":"${year}","street_name":"${streetName}","flat_type":"${flatType}"}&limit=1200`)
    const record = response.data.result.records
    for (eachRecord of record) {
        let eachDate = eachRecord.month
        array.push(eachDate)

    }

    return array

}