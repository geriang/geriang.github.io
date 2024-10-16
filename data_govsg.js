const dataGovSGBaseApiUrl = "https://data.gov.sg/api/action/datastore_search?resource_id=";
const resourceID = "d_8b84c4ee58e3cfc0ece0d773c8ca6abc";

// enter year and street name to retrieve coordinates and transaction information 
async function loadTransactionInfo(year, streetName, flatType) {
    const response = await axios.get(`${dataGovSGBaseApiUrl}${resourceID}&q={"month":"${year}","street_name":"${streetName}","flat_type":"${flatType}"}&limit=1200`);
    const record = response.data.result.records;
    let array = [];
    let coordinateArray = [];
    for (eachRecord of record) {
        let object = {};
        let eachPrice = eachRecord.resale_price;
        let eachDate = eachRecord.month;
        let eachBlock = eachRecord.block;
        let eachFloor = eachRecord.storey_range;
        let eachAddress = `${eachRecord.block}+${eachRecord.street_name}`;
        let coordinate = await loadOneMapDataCoordinateUsingAddress(eachAddress);
        object = { eachPrice, eachDate, eachBlock, eachFloor, coordinate };

        coordinateArray.push(coordinate);
        array.push(object);
    };
    return [array, coordinateArray];
};

// enter year, block and street name to retrieve each transacted flat's coordinates
async function loadNearbyCoordinate(year, block, streetName, flatType) {
    let array = [];
    const response = await axios.get(`${dataGovSGBaseApiUrl}${resourceID}&q={"month":"${year}","block":"${block}","street_name":"${streetName}","flat_type":"${flatType}"}&limit=1200`);
    const record = response.data.result.records;
    for (eachRecord of record) {
        let eachAddress = `${eachRecord.block}+${eachRecord.street_name}`;
        let coordinate = await loadOneMapDataCoordinateUsingAddress(eachAddress);
        array.push(coordinate);
    };
    return array;
};

// enter year, block and street name to retrieve transaction information 
async function loadNearbyTransactionInfo(year, block, streetName, flatType) {
    const response = await axios.get(`${dataGovSGBaseApiUrl}${resourceID}&q={"month":"${year}","block":"${block}","street_name":"${streetName}","flat_type":"${flatType}"}&limit=1200`);
    const record = response.data.result.records;
    let array = [];
    for (eachRecord of record) {
        let object = {};
        let eachPrice = eachRecord.resale_price;
        let eachDate = eachRecord.month;
        let eachBlock = eachRecord.block;
        let eachFloor = eachRecord.storey_range;
        object = { eachPrice, eachDate, eachBlock, eachFloor };

        array.push(object);
    };

    return array;
};



