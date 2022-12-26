const dataGovSGBaseApiUrl = "https://data.gov.sg/api/action/datastore_search"
const resourceID = "?resource_id=f1765b54-a209-4718-8d38-a39237f502b3"
const filterMonth = "&filters={'month':'2022-12'}"

// https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3&q={"month":"2022","street_name":"YISHUN ST 72","flat_type":"5 ROOM"}&limit=1200

// enter year and street name to retrieve each transacted flat's coordinates
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

// enter year and street name to retrieve transaction information 
async function loadTransactionInfo(year, streetName, flatType) {
    const response = await axios.get(`${dataGovSGBaseApiUrl}${resourceID}&q={"month":"${year}","street_name":"${streetName}","flat_type":"${flatType}"}&limit=1200`)
    const record = response.data.result.records
    let array = []
    for (eachRecord of record) {
        let object = {}
        let eachPrice = eachRecord.resale_price
        let eachDate = eachRecord.month
        let eachBlock = eachRecord.block
        let eachFloor = eachRecord.storey_range
        object = { eachPrice, eachDate, eachBlock, eachFloor }

        array.push(object)

    }

    return array

}

// enter year, block and street name to retrieve each transacted flat's coordinates
async function loadNearbyCoordinate(year, block, streetName, flatType) {
    let array = []
    const response = await axios.get(`${dataGovSGBaseApiUrl}${resourceID}&q={"month":"${year}","block":"${block}","street_name":"${streetName}","flat_type":"${flatType}"}&limit=1200`)
    const record = response.data.result.records
    for (eachRecord of record) {
        let eachAddress = `${eachRecord.block}+${eachRecord.street_name}`
        let coordinate = await loadOneMapDataCoordinateUsingAddress(eachAddress)
        array.push(coordinate)

    }

    return array

}

// enter year, block and street name to retrieve transaction information 
async function loadNearbyTransactionInfo(year, block, streetName, flatType) {
    const response = await axios.get(`${dataGovSGBaseApiUrl}${resourceID}&q={"month":"${year}","block":"${block}","street_name":"${streetName}","flat_type":"${flatType}"}&limit=1200`)
    const record = response.data.result.records
    let array = []
    for (eachRecord of record) {
        let object = {}
        let eachPrice = eachRecord.resale_price
        let eachDate = eachRecord.month
        let eachBlock = eachRecord.block
        let eachFloor = eachRecord.storey_range
        object = { eachPrice, eachDate, eachBlock, eachFloor }

        array.push(object)

    }

    return array

}



