// const googleSheetBaseApiUrl = "https://sheets.googleapis.com"
// https://docs.google.com/spreadsheets/d/1xQUBjJC78dJH-4IKNPmwC4oy0OGt3WMTj56TnSNVvCA/edit?usp=sharing

async function loadData(){
    const response = await axios.get("https://sheet.best/api/sheets/15a96cb5-d6da-4862-8940-df32a8ba86fc")
    console.log(response.data)

}

loadData()