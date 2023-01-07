<h2>DWAD19 Project One</h2><br>
<h2><b>Project Name : SGxProperty</h2></b>

SGxProperty is a map-based application that checks for residential property transactions in Singapore. As more than 80% of the residential property in Singapore are flats built by the Housing & Development Board, the first released version is designed specially for home owners and buyers to check for Resale (Secondary Market) HDBs flats that were transacted in 2022. 

With the ever climbing property prices and the burst in property transactions during recent years, it has become important for home sellers to know how much their flat could fetch based on the recent transactions in their neighbourhood. 

Similarly for home buyers, it will be beneficial to study the transacted prices of flats in their favoured estate first before committing to any purchase.

At the moment, there is a lack of map-based web applications in the market for home sellers and buyers to intuitively check for past transactions of HDB Flats. 

To find out past HDB transaction prices, they either have to search it directly on HDB's website (https://services2.hdb.gov.sg/webapp/BB33RTIS/), which could be difficult to manoeuvre as there are too many irrelevant information, or enquire directly from their real estate agents. Alternatively, commercial portal portals such as PropertyGuru only displays partial information based only on a selected block of flat. 

The objective of SGxProperty is to provide an intuitive, no fuss and no frills way for home sellers and home buyers or anyone curious enough to look up for information of transacted flats in their estate.

<h3>UX/UI</h3>

- Full Map Display
- Clean UI, only two interactive buttons
- Mobile Responsive, e.g. scrollable content, such as scrollable search form when display height is reduced to below 600px

Wireframe:
https://balsamiq.cloud/schn6ez/pfp0937/r69E6


<h3>FEATURES</h3>

Major features of the application includes:

- Introductory Modal Pop-up, explaining the application upon loading the webpage. (using Javascript DOM - addEventListener)

- Toggle on-off feature for the Introductory Modal (using Bootstrap Modal & Javascript DOM)

- Toggle on-off feature for the search form, and auto collapse when search is triggered (Bootstrap inbuilt form features)

- Postal Code field that generates an address automatically (Javascript DOM - addEventListener(keyup) & axios.get)

- A lock feature that disables the submit button when the postal code field is not filled up to 6 digits. The lock feature however can be removed by   entering 6 non-digit characters or symbols in the field and this issue needs to be rectified. (Javascript DOM and Bootstrap inbuilt button disabler)

- Tool tips for all the fields in the search form (Javascript DOM - addEventListener(mouseover))

- A loading spinner when the search is running to show that the search function is operating correctly (Bootstrap Load Spinner feature & Javascipt DOM)

- A modal pop-up appears when the search is completed, showing the search result which either reflects the number of transactions found or no transaction was found (Bootstrap inbuilt Modal feature & Javascript DOM - getElementById & InnerHTML)

- Mobile Responsive (Bootstrap)


<h3>TECHNOLOGIES USED</h3>

The project is written in HTML, CSS, and Javascript languages. 
The following libraries were used:
Bootstrap - https://getbootstrap.com/ for pre-built HTML, CSS & Javascript web features such as forms, modal, loading spinner and buttons
used in https://github.com/geriang/geriang.github.io/blob/main/index.html

Leaflet - https://leafletjs.com/ for pre-built Map features
used in https://github.com/geriang/geriang.github.io/blob/main/map.js

Axios - https://axios-http.com/docs/intro for making async API calls and requests.
mainly used in [data_govsg.js & data_onemap.js](https://github.com/geriang/geriang.github.io/blob/main/data_govsg.js) (https://github.com/geriang/geriang.github.io/blob/main/data_onemap.js)

Data Sources consumed:

Data.gov.sg
https://data.gov.sg/dataset/resale-flat-prices?view_id=093ff0f0-783f-4f6a-be52-7e506a8c58ca&resource_id=f1765b54-a209-4718-8d38-a39237f502b3

One Map
https://www.onemap.gov.sg/docs/#onemap-rest-apis
***Note***
Access token is required when using private api call to generate search result of nearby HDBs when given a postal code. 
The access token is only valid for 3 days and requires constant renewal


<h3>TESTING</h3>

Loading the main page 

User Story : US
Testing instructions : TS
1.US: I want to have an overview of what the web-app is for and how to use it 
  TS: Modal with description shows up after the main page finished loading

2.US: I accidentally closed the pop up modal. I want to see the modal with description again
  TS: Click on the information icon (depicted by "i") to open the modal again and click anywhere outside the modal or "X" to close

3.US: I want to start searching for transacted HDB Flats near my home
  TS: Click on the search icon (depicted by a magnifying glass)
  
4.US: I am not sure what are the displayed fields are for
  TS: Mouseover (desktop) or tap (mobile) the fields to display the purpose of the fields
  
5.US: I want to key in my address conveniently using my postal code
  TS: Type in the full 6 digit postal code in the Postal Code field
  
6.US: I want to find the transacted flats that are similar to my current flat type
  TS: Click on the drop down field to select the desired flat-type
  
7.US: I want to search HDB resale transactions along the road where my flat is at 
  TS: Click on Entire Street radio button and click Submit Button
  
8.US: I wamt to search HDB resale transactions that are nearby and surrounding my flat
  TS: Click on the Nearest Block radio button and click Submit Button

9.US: I want to have a full map display when the transaction result is generated
  TS: Once the submit button is clicked, the form will auto collapse 

10.US: I want to see how many transactions were found
   TS: A modal pop-up shows up with either the transaction count or a display that says no transactions were found

11.US: I want to see how many transactions were found on each block
   TS: A cluster marker will display the count number on each respective block

12.US: I want to see the transaction details, such as the transacted price and month
   TS: Click on the individual markers to view the transaction information

13.US: I want to search for HDB Resale transactions in another location again
   TS: Click on the search button again fill up the postal code

<h3>DEPLOYMENT</h3>

The web application is hosted on Github

Describe the process that you used to host your website on a hosting platform (such as Github pages or Heroku). Provide the following details: 
1. What is your hosting platform? 
2. How is the database hosted? 
3. What are the environment variables and what are they responsible for? 4. What are the dependencies that your project used? 
5. What are the deployment steps for the project? 
You can provide deployment details in a separate document (PDF or another markdown file). There is no need to be original for this section; if another website or document have the steps, just link there and acknowledge the author in your credits, 

<h3>LIVE LINK</h3>

The application can be access here: https://geriang.github.io/

<h3>LIMITATIONS & IMPROVEMENTS</h3>

1. Reconfiguring address to match other api

<h3>CREDITS AND ACKNOWLEDGMENT</h3>

Reference codes:

https://stackoverflow.com/users/171456/zim
solution to trigger the modal via Javascript DOM

https://stackoverflow.com/questions/4993764/how-to-remove-numbers-from-a-string
using regex to remove only numbers in the beginning part of a string. This helped me to shorten my code so that I could remove only the blk no. on each address.

https://stackoverflow.com/questions/15604140/replace-multiple-strings-with-multiple-other-strings
solution to replace multiple words in a string and it helped me to shorten my codes.

Special thanks to Yong Sheng my codes and Ace for teaching me how to use the mapping function vs. for loop 
=>  let data1 = [1,2,3]
    let data2 = ["a","b","c"]
For Loop:
    for (let i=0; i<data1.length; i++){
        console.log(data[i],data2[i])
    };
Map:
    data1.map( (item,index) => {
        console.log(item, data2[index])
    })

Special thanks to JJ for testing my application and giving me some valuable suggestions such as creating a "loading" feature