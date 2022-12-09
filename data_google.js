// https://sheety.co/docs/spreadsheet
// https://hevodata.com/learn/google-sheets-rest-api-integration/


// const googleSheetBaseApiUrl = "https://sheets.googleapis.com"
// https://docs.google.com/spreadsheets/d/1xQUBjJC78dJH-4IKNPmwC4oy0OGt3WMTj56TnSNVvCA/edit?usp=sharing

async function loadGoogleData(){
    const response = await axios.get("https://sheet.best/api/sheets/15a96cb5-d6da-4862-8940-df32a8ba86fc")
    console.log(response.data)

    // const getPostalCodes = () =>{
    // retrieve postal codes from googlesheet
    const postalCode = response.data[3].Postal_Code
    console.log(postalCode)

    // return getPostalCodes
    
    
    // }

   



}

loadGoogleData()