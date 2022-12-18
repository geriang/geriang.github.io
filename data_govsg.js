const dataGovSGBaseApiUrl = "https://data.gov.sg/api/action/datastore_search"
const resourceID = "?resource_id=f1765b54-a209-4718-8d38-a39237f502b3"
const filterMonth = "&filters={'month':'2022-12'}"

async function loadGovSgData(){
    const response = await axios.get(`${dataGovSGBaseApiUrl}${resourceID}&filters={"month":"2022-12"}&limit=1105`)
    const allRecords = response.data.result.records
    for (let i of allRecords){
        let address = i.block +" "+ i.street_name
        console.log(address)
    }


}

// x.result.records[1].block
loadGovSgData()
// const googleSheetBaseApiUrl = "https://sheets.googleapis.com"
// https://docs.google.com/spreadsheets/d/1xQUBjJC78dJH-4IKNPmwC4oy0OGt3WMTj56TnSNVvCA/edit?usp=sharing

// async function loadGoogleData(){
//     const response = await axios.get("https://sheet.best/api/sheets/15a96cb5-d6da-4862-8940-df32a8ba86fc")
//     console.log(response.data)

//     // const getPostalCodes = () =>{
//     // retrieve postal codes from googlesheet
//     const postalCode = response.data[3].Postal_Code
//     console.log(postalCode)

//     // return getPostalCodes
    
    
//     // }



// }

// loadGoogleData()


// GET https://sheets.googleapis.com/v4/spreadsheets/18pyXzFiO8yDZq0WkaW-SWD4dAnMYWhV_ybdgCorq7Fc/values/Sheet1?dateTimeRenderOption=FORMATTED_STRING&majorDimension=ROWS&valueRenderOption=FORMATTED_VALUE&key=AIzaSyDi6sxlrmrdrnZhv_JX69tvO6MUl8GHLYo

// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json





// async function loadGoogleData(){
//     const response = await axios.get("https://sheets.googleapis.com/v4/spreadsheets/18pyXzFiO8yDZq0WkaW-SWD4dAnMYWhV_ybdgCorq7Fc/values/Sheet1?dateTimeRenderOption=FORMATTED_STRING&majorDimension=ROWS&valueRenderOption=FORMATTED_VALUE&key=AIzaSyDi6sxlrmrdrnZhv_JX69tvO6MUl8GHLYo", {
//      headers:{

//       Authorization: 'Bearer ya29.a0AX9GBdX3XxFtJjof_PWprol8_QVPR08UXvwKzMlu9DtptzBzi7-NDvCqZNkmASJshCbyg9jNGxvMa_i8cds7BkdmWOceNnuwpKdEpb0IPK54S8BA-hUQ87nmuoqfXJsAE9lcZs9V-MwBhH6wd7LHgki2haA7aCgYKAaMSARISFQHUCsbCV9aDUBBS-vKmZJzQvH7pRQ0163',
//       Accept: 'application/json'
//      } 

// })
//   console.log(response.data)
// }

//     console.log(response.data)
//   }
//   gapi.load("client:auth2", function() {
//     gapi.auth2.init({client_id: "907453537207-cq0fr7i9q7f36ssr25gme7mcp1v5o3m7.apps.googleusercontent.com"});
//   });

// loadGoogleData()


// GET https://sheets.googleapis.com/v4/spreadsheets/18pyXzFiO8yDZq0WkaW-SWD4dAnMYWhV_ybdgCorq7Fc/values/Sheet1?dateTimeRenderOption=FORMATTED_STRING&majorDimension=ROWS&valueRenderOption=FORMATTED_VALUE&key=[YOUR_API_KEY] HTTP/1.1

// https://sheets.googleapis.com/v4/spreadsheets/18pyXzFiO8yDZq0WkaW-SWD4dAnMYWhV_ybdgCorq7Fc/values/Sheet1?dateTimeRenderOption=FORMATTED_STRING&majorDimension=ROWS&valueRenderOption=FORMATTED_VALUE&key=AIzaSyDi6sxlrmrdrnZhv_JX69tvO6MUl8GHLYo

