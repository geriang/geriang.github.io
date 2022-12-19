const dataGovSGBaseApiUrl = "https://data.gov.sg/api/action/datastore_search"
const resourceID = "?resource_id=f1765b54-a209-4718-8d38-a39237f502b3"
const filterMonth = "&filters={'month':'2022-12'}"

// https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&filters={"month":"2022-10","street_name":"TOA PAYOH NORTH"}&limit=1200
// async function loadGovSgData(month,year){
//     const response = await axios.get(`${dataGovSGBaseApiUrl}${resourceID}&filters={"month":"${year}-${month}"}&limit=1105`)
//     const eachRecord = response.data.result.records[0]
//     let eachAddress = `${eachRecord.block}+${eachRecord.street_name}`

//     return eachAddress
// }

// enter month, year and street name to retrieve coordinates
async function loadCoordinate(year, streetName) {
    let array = []
    const response = await axios.get(`${dataGovSGBaseApiUrl}${resourceID}&q={"month":"${year}","street_name":"${streetName}"}&limit=1200`)
    const record = response.data.result.records
    for (eachRecord of record) {
        let eachAddress = `${eachRecord.block}+${eachRecord.street_name}`
        let coordinate = await loadOneMapDataCoordinateUsingAddress(eachAddress)
        array.push(coordinate)

    }

    return array

}

// enter month, year and street name to retrieve transacted price 
async function loadResalePrice(year, streetName) {
    let array = []
    const response = await axios.get(`${dataGovSGBaseApiUrl}${resourceID}&q={"month":"${year}","street_name":"${streetName}"}&limit=1200`)
    const record = response.data.result.records
    for (eachRecord of record) {
        let eachPrice = eachRecord.resale_price
        array.push(eachPrice)

    }

    return array

}
